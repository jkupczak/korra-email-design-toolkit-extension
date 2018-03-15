'use strict';
var https = require('https');
var crypto = require('crypto');
var queryString = require('querystring');
var FormData = require('./lib/formdata.js');

/**
 * mailgun-es6 module
 * @class mailgun-es6
 * @constructor
 */
class MailGun {
  /**
  * Constructor for Mailgun class.
  * @method constructor
  * @param {Object} options Used to set publicApi, privateApi, and domainName
  */
  constructor(options) {
    if ((typeof options == 'undefined') ||
    (typeof options.privateApi == 'undefined' &&
     typeof options.publicApi == 'undefined')) {
      throw new Error('Some options are required in order to use this program.' +
      'Please see the documentation for more information.');
    }
      //Assign the Public and Private API and domain to the object
      //Users are expected to know what key they need for what functions.
      this.privateApi = options.privateApi || null;
      this.publicApi = options.publicApi || null;
      this.domainName = options.domainName || null;
  }

  /**
  * Determines the domain name for the current request
  * @method _determineDomain
  * @param {String} [domain] Domain name passed from current request
  * @return {String} The domain name to use for current request
  * @private
  */
  _determineDomain(domain) {
    if (typeof domain != 'undefined') {
      return domain;
    } else if ((this.domainName !== null) && (typeof this.domainName != 'undefined')){
      //Why do I use null? Because on the constructor function, something
      //will get assigned to this.DomainName.  Therefore, undefined
      //won't catch it as it has a null value.
      return this.domainName;
    } else {
      throw new Error('There is no domain set. Either set one in the function ' +
          'call or in the Mailgun object creation.');
    }
  }

  /**
  * Determines the domain name for the current request
  * @method _genHttpsOptions
  * @param {String} path Location of Mailgun resource
  * @param {String} method HTTP method used to retrieve resource
  * @param {Boolean} publicApi Should use Public API key as opposed to Private API key
  * @return {Object} Contains the HTTPS options to pass to https.request()
  * @private
  */
  _genHttpsOptions(path, method, publicApi) {
    return {
      hostname: 'api.mailgun.net',
      port: 443,
      path: `/v3${path}`,
      method: `${method}`,
      auth: publicApi === true ? `api:${this.publicApi}` : `api:${this.privateApi}`
    };
  }

  /**
  * Builds a query string to append to end of URL from string or object
  * @method _buildQueryString
  * @param {Object|String} query Parameter to build query string from
  * @return {String} Contains the query string to append to end of path
  * @private
  */
  _buildQueryString(query) {
    if (typeof query == 'undefined') {
      return '';
    } else if (typeof query == 'string') {
      if (query.charAt(0) == '?') {
        return query;
      } else {
        return '?' + query;
      }
    } else if (typeof query == 'object') {
      return '?' + queryString.stringify(query);
    } else {
      throw new Error('Query not a valid variable type.');
    }
  }

  /**
  * Builds a form object and retuns that object with correct form data.
  * @method _buildFormData
  * @param {Object} formData Form Data
  * @return {Object} A formData object with passed form data.
  * @private
  */
  _buildFormData(formData) {
    var form = new FormData();
    for (var key in formData) {
      //If we have an array, add a value fo the same field
      if (Array.isArray(formData[key]) === true) {
        formData[key].map(function(cV) { // jshint ignore:line
          //If there is an object with file type, we need to open a file
          if (cV.hasOwnProperty('fType') === true) {
            form.addData(key, cV.fLoc, cV.fType);
          } else {
            form.addData(key, cV);
          }
        });
      } else {
        if (formData[key].hasOwnProperty('fType') === true) {
          form.addData(key, formData[key].fLoc, formData[key].fType);
        } else {
          form.addData(key, formData[key]);
        }
      }
    }
    return form;
  }

  /**
  * Does the actual request and response handling
  * @method _sendRequest
  * @param {String} path The resource to access on Mailgun's API
  * @param {String} method The HTTP method being used
  * @param {Object} options Object containing other information needed for the request
  * @return {Promise} The promise with request results.
  * @private
  */
  _sendRequest(path, method, options) {
    var form;

    //Make sure we can make a valid request.
    if (typeof path == 'undefined' || typeof method == 'undefined') {
      throw new Error('You need to specify both the path and method.');
    }

    //Grumble grumble grumble
    if (typeof options == 'undefined') {
      options = {};
    } else if (typeof options != 'object') {
      throw new Error('options needs to be an object, Kyle. Stop passing a string.\n' +
      'If you get this error, please notify me on github immediately.');
    }

    //Check to see if we were passed an alternative domain name
    options.domain = this._determineDomain(options.domain);
    path = path.replace('<>', options.domain);

    //Add querystring to path if we requested one
    if (options.hasOwnProperty('queryData') === true) {
      path = path + this._buildQueryString(options.queryData);
    }

    //Create HTTPS options
    var httpsOptions = this._genHttpsOptions(path, method, options.publicApi);

    //Check to see if this is a request that needs a form.
    if (options.hasOwnProperty('formData') === true) {
      form = this._buildFormData(options.formData);
    }

    //Make the request.
    return new Promise(function(resolve, reject) {
      //Make the connection
      var req = https.request(httpsOptions, function(res) {
        var data = "";
        res.setEncoding('utf8');

        res.on('data', function(newData) {
          data = data + newData;
        });

        res.on('end', function() {
          //Everything should be an object coming from Mailgun
          data = JSON.parse(data);
          if (res.statusCode == 200) {
            resolve(data);
          } else {
            reject(data);
          }
        });
      });


      if (options.hasOwnProperty('jsonData') === true) {
        //If we're poting JSON data
        options.jsonData = JSON.stringify(options.jsonData);

        req.setHeader('Content-Type', 'application/json');
        //Why? See: http://stackoverflow.com/questions/4505809/how-to-post-to-a-request-using-node-js
        req.setHeader('Content-Length', Buffer.byteLength(options.jsonData));

        req.write(options.jsonData, 'utf8');
        req.end();
      } else if (form && form.dataCount > 0) {
        //If we're posting form data
        req.setHeader('Content-Type', form.contentType);
        form.submitTo(req);
      } else {
        //If we're just getting a request.
        req.end();
      }

      req.on('error', function(e) {
        reject({message: `Problem connecting to Mailgun API. ${e}`});
      });
    });
  }

  /**
  * Does the actual request and response handling
  * @method sendEmail
  * @param {Object} postData an Object containing key: value pairs to send
  * @param {String} [domain] Domain to use in leiu of default domain
  * @return {Promise} The promise with request results.
  */
  sendEmail(postData, domain) {
    if ((typeof postData == 'undefined') || (typeof postData != 'object')) {
      throw new Error('You must pass the proper data to this function.');
    }
    return this._sendRequest('/<>/messages', 'POST', {
      formData: postData,
      domain: domain
    });
  }

  /**
  * Gets either a list of messages or a single message from server storage. If
  * no msgId is supplied, this function internally calls getEvents.
  * @method getStoredMessages
  * @param {String} [msgId] The ID of the single message you want to retrieve
  * @param {String} [domain] An alternative domain to fetch messages from
  * @return {Promise} The promise with the request results.
  */
  getStoredMessages(msgId, domain) {
    if (/^[a-zA-Z0-9\-]+\.\w+/.test(msgId) === true) {
      //I hope that msgId's don't have periods in them...
      domain = msgId;
      msgId = undefined;
    }

    if (typeof msgId == 'undefined') {
      return this.getEvents({event: 'stored'}, domain);
    } else {
      return this._sendRequest('/domains/<>/messages/' + msgId, 'GET', {
        domain: domain
      });
    }
  }

  /**
  * Deletes a stored message off from the Mailgun servers.
  * @method deleteStoredMessages
  * @param {String} msgId The ID of the single message you want to delete
  * @param {String} [domain] An alternative domain to fetch messages from
  * @return {Promise} The promise with the request results.
  */
  deleteStoredMessages(msgId, domain) {
    if (typeof msgId == 'undefined') {
      throw new Error('You must specify a msgId to delete');
    }

    return this._sendRequest('/domains/<>/messages/' + msgId, 'DELETE', {
      domain: domain
    });
  }

  /**
  * Gets information about a specified domain.
  * @method getInformation
  * @param {String} [domain] An alternative domain to fetch messages from
  * @return {Promise} The promise with the request results.
  */
  getInformation(domain) {
    return this._sendRequest('/domains/<>', 'GET', {
      domain: domain
    });
  }

  /**
  * Adds a new domain to the account
  * @method addNewDomain
  * @param {String} newDomain The new domain to add to the account
  * @param {String} smtpPassword The password the default smtp account will have
  * @param {Boolean|String} [wildcard] Will this accept email for subdomains?
  * @param {String} [spamAction] Action to take with spam messages (disabled or tag)
  * @return {Promise} The promise with the request results.
  */
  addNewDomain(newDomain, smtpPassword, wildcard, spamAction) {
    if ((typeof newDomain == 'undefined') || (typeof smtpPassword == 'undefined')) {
      throw new Error('You need to give both a new domain name and default password.');
    }

    //Sets spam action if given and no wildcard is given.
    if ((wildcard == 'tag') || (wildcard == 'disabled')) {
      spamAction = wildcard;
      wildcard = undefined;
    }

    if (typeof wildcard == 'undefined') {
      wildcard = false;
    }

    if (typeof spamAction == 'undefined') {
      spamAction = 'tag';
    }

    return this._sendRequest('/domains', 'POST', {
      formData: {
        name: newDomain,
        smtp_password: smtpPassword,
        spam_action: spamAction,
        wildcard: wildcard
      }
    });
  }

  /**
  * Deletes a domain from the account
  * @method deleteDomain
  * @param {String} domainToDelete The domain to delete
  * @return {Promise} The promise with the request results.
  */
  deleteDomain(domainToDelete) {
    if (typeof domainToDelete == 'undefined') {
      throw new Error('You must pass a domain to delete.');
    }

    return this._sendRequest('/domains/' + domainToDelete, 'DELETE');
  }

  /**
  * Gets smtp users for given account
  * @method getSmtpUsers
  * @param {String} [domain] The domain to query
  * @return {Promise} The promise with the request results.
  */
  getSmtpUsers(domain) {
    return this._sendRequest('/domains/<>/credentials', 'GET', {
      domain: domain
    });
  }

  /**
  * Adds a smtp user to an account
  * @method addSmtpUser
  * @param {String} username Username of the new account
  * @param {String} password Password of the new account
  * @param {String} [domain] The domain to add account
  * @return {Promise} The promise with the request results.
  */
  addSmtpUser(username, password, domain) {
    if ((typeof username == 'undefined') || (typeof password == 'undefined')) {
      throw new Error('Both the username and password must be set.');
    }

    if ((password.length < 5) || (password.length > 32)) {
      throw new Error('Password needs to be between 5 and 32 characters long.');
    }

    return this._sendRequest('/domains/<>/credentials', 'POST', {
      domain: domain,
      formData: {
        login: username,
        password: password
      }
    });
  }

  /**
  * Updates a smtp user on given domain
  * @method updateSmtpUser
  * @param {String} username Username of account to update
  * @param {String} password New password for found account
  * @param {String} [domain] The domain to update user
  * @return {Promise} The promise with the request results.
  */
  updateSmtpUser(username, password, domain) {
    if ((typeof username == 'undefined') || (typeof password == 'undefined')) {
      throw new Error('Both the username and password must be set.');
    }

    if ((password.length < 5) || (password.length > 32)) {
      throw new Error('Password needs to be between 5 and 32 characters long.');
    }

    return this._sendRequest('/domains/<>/credentials/' + username, 'PUT', {
      domain: domain,
      formData: {
        password: password,
      }
    });
  }

  /**
  * Deletes a smtp user on given domain
  * @method deleteSmtpUser
  * @param {String} username Username of account to delete
  * @param {String} [domain] The domain to delete user
  * @return {Promise} The promise with the request results.
  */
  deleteSmtpUser(username, domain) {
    if (typeof username == 'undefined') {
      throw new Error('A username is required for this function.');
    }

    return this._sendRequest('/domains/<>/credentials/' + username, 'DELETE', {
      domain: domain
    });
  }

  /**
  * Gets connection settings for a single domain
  * @method getConnectionSettings
  * @param {String} [domain] The domain to get settings
  * @return {Promise} The promise with the request results.
  */
  getConnectionSettings(domain) {
    return this._sendRequest('/domains/<>/connection', 'GET', {
      domain: domain
    });
  }

  /**
  * Updates connection settings for a single domain
  * @method updateConnectionSettings
  * @param {Boolean} requireTLS Do you want Mailgun to only use TLS connections?
  * @param {Boolean} skipVerification Do you want Mailgun to verify certificate and hostname?
  * @param {String} [domain] The domain to update settings
  * @return {Promise} The promise with the request results.
  */
  updateConnectionSettings(requireTLS, skipVerification, domain) {
    if ((typeof requireTLS == 'undefined') || (typeof skipVerification == 'undefined')) {
      throw new Error('Both requireTLS and skipVerifcation are required');
    }

    return this._sendRequest('/domains/<>/connection', 'PUT', {
      domain: domain,
      formData: {
        require_tls: requireTLS,
        skip_verification: skipVerification
      }
    });
  }

  /**
  * Gets stats for given domain
  * @method getStats
  * @param {Object|String} options Object with key:value pairs or raw query string
  * @param {String} [domain] The domain to get stats
  * @return {Promise} The promise with the request results.
  */
  getStats(options, domain) {
    return this._sendRequest('/<>/stats', 'GET', {
      queryData: options,
      domain: domain
    });
  }

  /**
  * Deletes a given tag from the server's tag counter
  * @method deleteStats
  * @param {String} tagName Tag name to delete
  * @param {String} [domain] The domain to delete tags
  * @return {Promise} The promise with the request results.
  */
  deleteStats(tagName, domain) {
    if (typeof tagName == 'undefined') {
      throw new Error('A tagName needs to be supplied');
    }

    return this._sendRequest('/<>/tags/' + tagName, 'DELETE', {
      domain: domain
    });
  }

  /**
  * Gets events for a specified domain
  * TODO: Implement event polling. (https://documentation.mailgun.com/api-events.html#event-polling)
  * @method getEvents
  * @param {String|Object} options Raw query string (var1=val1) or key/value pair object to search
  * @param {String} [domain] The domain to get events
  * @return {Promise} The promise with the request results.
  */
  getEvents(options, domain) {
    return this._sendRequest('/<>/events', 'GET', {
      domain: domain,
      queryData: options
    });
  }

  /**
  * Gets email addresses that bounced back to Mailgun. If address is given as
  * first field, get specific information about a single address. If a number
  * is given in the first field, this will return a list from given domain.
  * @method getBounces
  * @param {String|Number} search Value to search or limit by
  * @param {String} [domain] The domain to get bounces
  * @return {Promise} The promise with the request results.
  */
  getBounces(search, domain) {
    if (typeof search == 'number') {
      return this._sendRequest('/<>/bounces', 'GET', {
        domain: domain,
        queryData: {
          limit: search
        }
      });
    } else if (typeof search == 'string') {
      return this._sendRequest('/<>/bounces/' + search, 'GET', {
        domain: domain
      });
    } else if (typeof search == 'undefined') {
      return this._sendRequest('/<>/bounces', 'GET', {
        domain: domain
      });
    } else {
      throw new Error('Wrong object type passed to search parameter');
    }
  }

  /**
  * Adds emails to a domain's bounce list
  * @method addBounces
  * @param {Object|Array} addresses A single object or array of objects to add to bounce list
  * @param {String} [domain] The domain to add records
  * @return {Promise} The promise with the request results.
  */
  addBounces(addresses, domain) {
    if (typeof addresses != 'object')  {
      throw new Error('You must pass an object or array to this function');
    }

    //So if an array isn't sent, this actually replies with Invalid JSON
    //Which is not correct.  Stupid even. It should say something like
    //'Misformatted. Expected Array.' Whatever
    addresses = (Array.isArray(addresses) ? addresses : [addresses]);

    return this._sendRequest('/<>/bounces', 'POST', {
      domain: domain,
      jsonData: addresses
    });
  }

  /**
  * Deletes emails from a domain's bounce list
  * @method deleteBounces
  * @param {String} address A single email to remove from bounce list
  * @param {String} [domain] The domain to delete record
  * @return {Promise} The promise with the request results.
  */
  deleteBounces(address, domain) {
    if (typeof address != 'string') {
      throw new Error('A single address needs to be supplied');
    }

    return this._sendRequest('/<>/bounces/' + address, 'DELETE', {
      domain: domain
    });
  }

  /**
  * Gets email addresses that unsubscribed from a list. If address is given as
  * first field, get specific information about a single address. If a number
  * is given in the first field, this will return a list from given domain.
  * @method getUnsubscribes
  * @param {String|Number} search Value to search or limit by
  * @param {String} [domain] The domain to get unsubscribes
  * @return {Promise} The promise with the request results.
  */
  getUnsubscribes(search, domain) {
    if (typeof search == 'number') {
      return this._sendRequest('/<>/unsubscribes', 'GET', {
        domain: domain,
        queryData: {
          limit: search
        }
      });
    } else if (typeof search == 'string') {
      return this._sendRequest('/<>/unsubscribes/' + search, 'GET', {
        domain: domain
      });
    } else if (typeof search == 'undefined') {
      return this._sendRequest('/<>/unsubscribes', 'GET', {
        domain: domain
      });
    } else {
      throw new Error('Wrong object type passed to search parameter');
    }
  }

  /**
  * Adds emails to a domain's unsubscribe list
  * @method addUnsubscribes
  * @param {Object|Array} addresses A single object or array of objects to add to unsubscribe list
  * @param {String} [domain] The domain to add unsubscribes
  * @return {Promise} The promise with the request results.
  */
  addUnsubscribes(addresses, domain) {
    if (typeof addresses != 'object')  {
      throw new Error('You must pass an object or array to this function');
    }

    addresses = (Array.isArray(addresses) ? addresses : [addresses]);

    return this._sendRequest('/<>/unsubscribes', 'POST', {
      domain: domain,
      jsonData: addresses
    });
  }

  /**
  * Deletes emails from a domain's unsubscribe list
  * @method deleteUnsubscribes
  * @param {String} address A single email to remove from unsubscribe list
  * @param {String} [domain] The domain to delete unsubscribes
  * @return {Promise} The promise with the request results.
  */
  deleteUnsubscribes(address, domain) {
    if (typeof address != 'string') {
      throw new Error('A single address needs to be supplied');
    }

    return this._sendRequest('/<>/unsubscribes/' + address, 'DELETE', {
      domain: domain
    });
  }

  /**
  * Gets email addresses that reported your email as spam. If address is given as
  * first field, get specific information about a single address. If a number
  * is given in the first field, this will return a list from given domain.
  * @method getComplaints
  * @param {String|Number} search Value to search or limit by
  * @param {String} [domain] The domain to get complaints
  * @return {Promise} The promise with the request results.
  */
  getComplaints(search, domain) {
    if (typeof search == 'number') {
      return this._sendRequest('/<>/complaints', 'GET', {
        domain: domain,
        queryData: {
          limit: search
        }
      });
    } else if (typeof search == 'string') {
      return this._sendRequest('/<>/complaints/' + search, 'GET', {
        domain: domain
      });
    } else if (typeof search == 'undefined') {
      return this._sendRequest('/<>/complaints', 'GET', {
        domain: domain
      });
    } else {
      throw new Error('Wrong object type passed to search parameter');
    }
  }

  /**
  * Adds emails to a domain's unsubscribe list
  * @method addComplaints
  * @param {Object|Array} addresses A single object or array of objects to add to complaint list
  * @param {String} [domain] The domain to add complaints
  * @return {Promise} The promise with the request results.
  */
  addComplaints(addresses, domain) {
    if (typeof addresses != 'object')  {
      throw new Error('You must pass an object or array to this function');
    }

    addresses = (Array.isArray(addresses) ? addresses : [addresses]);

    return this._sendRequest('/<>/complaints', 'POST', {
      domain: domain,
      jsonData: addresses
    });
  }

  /**
  * Deletes emails from a domain's complaint list
  * @method deleteComplaints
  * @param {String} address A single email to remove from complaint list
  * @param {String} [domain] The domain to delete complaints
  * @return {Promise} The promise with the request results.
  */
  deleteComplaints(address, domain) {
    if (typeof address != 'string') {
      throw new Error('A single address needs to be supplied');
    }

    return this._sendRequest('/<>/complaints/' + address, 'DELETE', {
      domain: domain
    });
  }

  /**
  * Gets curent routes for the API's account
  * @method getRoutes
  * @param {String} routeID If given, ignores limit and skip and returns data about one route
  * @param {Number} [limit] Limits the number of records returned
  * @param {Number} [skip] Skips x records
  * @return {Promise} The promise with the request results.
  */
  getRoutes(limit, skip) {
    if (typeof limit == 'string') {
      return this._sendRequest('/routes/' + limit, 'GET');
    } else {
      return this._sendRequest('/routes', 'GET', {
        queryData: {
          limit: limit || 100,
          skip: skip || 0
        }
      });
    }
  }

  /**
  * Adds a route record to the API's account. Currently only single actions can be added
  * at one time.
  * TODO: Add array support for formData in order to allow multiple actions for each route
  * @method addRoutes
  * @param {Object} route The route to add to the account
  * @return {Promise} The promise with the request results.
  */
  addRoutes(route) {
    if (typeof route != 'object') {
      throw new Error('Route need to be an object');
    }

    return this._sendRequest('/routes', 'POST', {
      formData: route
    });
  }

  /**
  * Updates a single route already on the account's route list
  * TODO: Add array support for formData in order to allow multiple actions for each route
  * @method updateRoutes
  * @param {String} routeID The ID of the route to update
  * @param {Object} route The new route data to put. Can be only parts you want to change.
  * @return {Promise} The promise with the request results.
  */
  updateRoutes(id, route) {
    if (typeof id != 'string') {
      throw new Error('Your Route ID needs to be a string and present');
    }
    if (typeof route != 'object') {
      throw new Error('Your new route data needs to be an object and present');
    }

    return this._sendRequest('/routes/' + id, 'PUT', {
      formData: route
    });
  }

  /**
  * Deletes a single route already on the account's route list
  * @method deleteRoutes
  * @param {String} id The ID of the route to delete
  * @return {Promise} The promise with the request results.
  */
  deleteRoutes(id) {
    if (typeof id != 'string') {
      throw new Error('A string ID must be supplied.');
    }

    return this._sendRequest('/routes/' + id, 'DELETE');
  }

  /**
  * Gets curent campaigns for the API's account
  * @method getCampaigns
  * @param {String} campId If given, ignores limit and skip and returns data about one campaign
  * @param {Number} [limit] Limits the number of records returned
  * @param {Number} [skip] Skips x records
  * @param {String} [domain] Overrides default domain
  * @return {Promise} The promise with the request results.
  */
  getCampaigns(limit, skip, domain) {
    if ((typeof limit == 'string') && (/\w+\.\w+/.test(limit) === false)) {
      return this._sendRequest('/<>/campaigns/' + limit, 'GET', {
        domain: skip
      });
    } else {
      if (typeof limit == 'string') {
        domain = limit;
        limit = undefined;
      } else if (typeof skip == 'string') {
        domain = skip;
        skip = undefined;
      }

      return this._sendRequest('/<>/campaigns', 'GET', {
        domain: domain,
        queryData: {
          limit: limit || 100,
          skip: skip || 0
        }
      });
    }
  }

  /**
  * Adds a campaign to a domain.
  * @method addCampaigns
  * @param {Object} campaign The campaign to add to the domain
  * @param {String} [domain] A domain that will overide the default
  * @return {Promise} The promise with the request results.
  */
  addCampaigns(campaign, domain) {
    if (typeof campaign != 'object') {
      throw new Error('There needs to be a campaign object to add');
    }

    return this._sendRequest('/<>/campaigns', 'POST', {
      domain: domain,
      formData: campaign
    });
  }

  /**
  * Updates a single campaign already on the domain's list
  * @method updateCampaigns
  * @param {String} id The ID of the campaign to update
  * @param {Object} newData The new campaign data to put.
  * @param {String} [domain] A domain to overwrite the default domain name.
  * @return {Promise} The promise with the request results.
  */
  updateCampaigns(id, newData, domain) {
    if (typeof id != 'string') {
      throw new Error('Your Campaign ID needs to be a string and present');
    }
    if (typeof newData != 'object') {
      throw new Error('Your new campaign data needs to be an object and present');
    }

    return this._sendRequest('/<>/campaigns/' + id, 'PUT', {
      domain: domain,
      formData: newData
    });
  }

  /**
  * Deletes a single campaign already on the domain's route list
  * @method deleteCampaigns
  * @param {String} id The ID of the campaign to delete
  * @param {String} [domain] A domain to overwrite the default domain
  * @return {Promise} The promise with the request results.
  */
  deleteCampaigns(id, domain) {
    if (typeof id != 'string') {
      throw new Error('A string ID must be supplied.');
    }

    return this._sendRequest('/<>/campaigns/' + id, 'DELETE', {
      domain: domain
    });
  }

  /**
  * Gets events for a specific campaign. This rolls many of the campaign reporting
  * endpoints into one.  The valid event types are 'events', 'stats', 'clicks',
  * 'opens', 'unsubscribes', and 'complaints'.
  * @method getCampaignsEvents
  * @param {String} campId The ID of the campaign to get events about
  * @param {String} [eventType] The type of events to retrieve
  * @param {Object|String} [options] A raw query string to object of key/values to search by
  * @param {String} [domain] A domain to overwrite the default domain
  * @return {Promise} The promise with the request results.
  */
  getCampaignsEvents(campId, eventType, options, domain) {
    if (typeof campId == 'undefined') {
      throw new Error('You must give a campaign ID to search');
    }

    //Check to see if we have a domain in the eventType
    if (/\w\.\w/.test(eventType) === true) {
      domain = eventType;
      eventType = undefined;
    }

    if (typeof eventType == 'undefined') {
      eventType = 'events';
    } else if (/(events|stats|clicks|opens|unsubscribes|complaints)/.test(eventType) === false) {
      throw new Error('Event type is invalid.');
    }

    //Check to see if we have a domain in the options.
    if ((/\w\.\w/.test(options) === true) && (/=/.test(options) === false)) {
      domain = options;
      options = undefined;
    }

    return this._sendRequest('/<>/campaigns/' + campId + '/' + eventType, 'GET', {
      domain: domain,
      queryData: options
    });
  }

  /**
  * Gets webhooks from a specific domain. If a hook type is given,
  * it will return information about that single hook.
  * @method getWebhooks
  * @param {String} [hookName] The type of webhook to search for
  * @param {String} [domain] A domain to overwrite the default domain
  * @return {Promise} The promise with the request results.
  */
  getWebhooks(hookName, domain) {
    if (/\w\.\w/.test(hookName) === true) {
      domain = hookName;
      hookName = undefined;
    }

    if (typeof hookName == 'undefined') {
      return this._sendRequest('/domains/<>/webhooks', 'GET', {
        domain: domain
      });
    } else {
      if (/(bounce|deliver|drop|spam|unsubscribe|click|open)/.test(hookName) === false) {
        throw new Error('Hookname is not valid');
      }

      return this._sendRequest('/domains/<>/webhooks/' + hookName, 'GET', {
        domain: domain
      });
    }
  }

  /**
  * Adds a webhook to given domain. hookName can be 'bounce', 'deliver', 'drop',
  * 'spam', 'unsubscribe', 'click', and 'open'.
  * @method addWebhook
  * @param {String} hookName The type of webhook to add
  * @param {String} url The url to notify for the webhook
  * @param {String} [domain] A domain to overwrite the default domain
  * @return {Promise} The promise with the request results.
  */
  addWebhooks(hookName, url, domain) {
    if (typeof hookName == 'undefined') {
      throw new Error('You need to pass a hook type and url');
    } else if (/(bounce|deliver|drop|spam|unsubscribe|click|open)/.test(hookName) === false) {
      throw new Error('Hookname is not valid');
    } else if (typeof url == 'undefined') {
      throw new Error('You need to pass an url');
    }

    return this._sendRequest('/domains/<>/webhooks', 'POST', {
      domain: domain,
      formData: {
        id: hookName,
        url: url
      }
    });
  }

  /**
  * Updates a webhook URL to given domain.
  * @method updateWebhooks
  * @param {String} hookName The type of webhook to update
  * @param {String} url The url to update for the webhook
  * @param {String} [domain] A domain to overwrite the default domain
  * @return {Promise} The promise with the request results.
  */
  updateWebhooks(hookName, url, domain) {
    if (typeof hookName == 'undefined') {
      throw new Error('You need to pass a hook type and url');
    } else if (/(bounce|deliver|drop|spam|unsubscribe|click|open)/.test(hookName) === false) {
      throw new Error('Hookname is not valid');
    } else if (typeof url == 'undefined') {
      throw new Error('You need to pass an url');
    }

    return this._sendRequest('/domains/<>/webhooks/' + hookName, 'PUT', {
      domain: domain,
      formData: {
        url: url
      }
    });
  }

  /**
  * Deletes a webhook URL for a given domain.
  * @method deleteWebhooks
  * @param {String} hookName The type of webhook to update
  * @param {String} [domain] A domain to overwrite the default domain
  * @return {Promise} The promise with the request results.
  */
  deleteWebhooks(hookName, domain) {
    if (typeof hookName == 'undefined') {
      throw new Error('You need to pass a hook type and url');
    } else if (/(bounce|deliver|drop|spam|unsubscribe|click|open)/.test(hookName) === false) {
      throw new Error('Hookname is not valid');
    }

    return this._sendRequest('/domains/<>/webhooks/' + hookName, 'DELETE', {
      domain: domain
    });
  }

  /**
  * Verifies that a webhook call was made from mailgun.
  * @method verifyWebhook
  * @param timestamp The timestamp from the webhook header
  * @param token The randomly generated token from webhook header
  * @param signature The signature from the webhook header
  * @return {Promise} Promise resolves if request is real. Rejects if possibly false
  */
  verifyWebhook(timestamp, token, signature) {
    var _this = this;
    return new Promise(function(resolve, reject) {
      var hmac = crypto.createHmac('sha256', _this.privateApi);
      hmac.update(timestamp + token);
      var digest = hmac.digest('hex');
      if (signature === digest) {
        resolve(token);
      } else {
        reject('Webhook signature and hash do not match.');
      }
    });
  }

  /**
  * Returns all or a single mailing list. If listAddress is given,
  * limit and skip are ignored.
  * @method getMailLists
  * @param {String} [listAddress] The address of the mailing list to see information
  * @param {String|Object} [search] A raw query string or object to limit results
  * @return {Promise} The promise with the request results.
  */
  getMailLists(listAddress) {
    if (/@/.test(listAddress) === true) {
      return this._sendRequest('/lists/' + listAddress, 'GET');
    } else {
      return this._sendRequest('/lists', 'GET', {
        queryData: listAddress
      });
    }
  }

  /**
  * Adds a new mailing list to the account
  * @method addMailLists
  * @param {Object} listData The object containing the new list's properties
  * @return {Promise} The promise with the request results.
  */
  addMailLists(listData) {
    if (typeof listData != 'object') {
      throw new Error('listData must be an object and supplied');
    }

    return this._sendRequest('/lists', 'POST', {
      formData: listData
    });
  }

  /**
  * Updates a mailing list on the account
  * @method updateMailLists
  * @param {String} listAddress The email address of the mailing list
  * @param {Object} listData The object containing the updated list's properties
  * @return {Promise} The promise with the request results.
  */
  updateMailLists(listAddress, listData) {
    if((typeof listAddress != 'string') || (typeof listData != 'object')) {
      throw new Error('You need to provide both listAddress and listData with correct information');
    }

    return this._sendRequest('/lists/' + listAddress, 'PUT', {
      formData: listData
    });
  }

  /**
  * Deletes a mailing list from the account
  * @method deleteMailLists
  * @param {String} listAddress The email address of the mailing list to delete
  * @return {Promise} The promise with the request results.
  */
  deleteMailLists(listAddress) {
    if (typeof listAddress != 'string') {
      throw new Error('listAddress must be provided and be of the correct type');
    }

    return this._sendRequest('/lists/' + listAddress, 'DELETE');
  }

  /**
  * Returns all the members of a single mailing list or information about
  * a single member on the list
  * @method getMailListsMembers
  * @param {String} listAddress The address of the mailing list to see information
  * @param {String} memberAddress The address of a single member to view
  * @param {String|Object} [search] A raw query string or object to limit results
  * @return {Promise} The promise with the request results.
  */
  getMailListsMembers(listAddress, memberAddress) {
    if (typeof listAddress == 'undefined') {
      throw new Error('This function needs at least a listAddress to look up');
    }

    if (/@/.test(memberAddress) === true) {
      return this._sendRequest('/lists/' + listAddress + '/members/' + memberAddress, 'GET');
    } else {
      return this._sendRequest('/lists/' + listAddress + '/members', 'GET', {
        queryData: memberAddress
      });
    }
  }

  /**
  * Adds members to a mailing list
  * @method addMailListsMembers
  * @param {String} listAddress The address of the mailing list to add members to
  * @param {Object|Array} memberObject A single member object to add or an array of objects
  * @param {String} [upsert] 'yes' or 'no', update existing members
  * @return {Promise} The promise with the request results.
  */
  addMailListsMembers(listAddress, memberObject, upsert) {
    /*There are *two* ways to add members to mailing lists.  However,
      I decided to only use the second way. Why? KISS. */
    if (typeof listAddress != 'string') {
      throw new Error('You must provide a listAddress as a string');
    }
    if (typeof memberObject != 'object') {
      //We can accept an array. Good thing an array is an object
      throw new Error('memberObject must be an object or array of objects.');
    }

    return this._sendRequest('/lists/' + listAddress + '/members.json', 'POST', {
      formData: {
        members: JSON.stringify(memberObject),
        upsert: upsert || 'no'
      }
    });
  }

  /**
  * Updates a member on the mailing list
  * @method updateMailListsMembers
  * @param {String} listAddress The address of the mailing list to add members to
  * @param {String} memberAddress The address of the member to update
  * @param {Object} memberObject A single member object that contains object updates
  * @return {Promise} The promise with the request results.
  */
  updateMailListsMembers(listAddress, memberAddress, memberObject) {
    if ((typeof listAddress != 'string') || (typeof memberAddress != 'string')) {
      throw new Error('listAddress and memberAddress must be given and strings');
    }

    if (typeof memberObject != 'object') {
      throw new Error('You must pass some information to update');
    }

    return this._sendRequest('/lists/' + listAddress + '/members/' + memberAddress, 'PUT', {
      formData: memberObject
    });
  }

  /**
  * Deletes a member from a the mailing list
  * @method deleteMailListsMembers
  * @param {String} listAddress The address of the mailing list to add members to
  * @param {String} memberAddress The address of the member to update
  * @return {Promise} The promise with the request results.
  */
  deleteMailListsMembers(listAddress, memberAddress) {
    if ((typeof listAddress != 'string') || (typeof memberAddress != 'string')) {
      throw new Error('listAddress and memberAddress must be given and strings');
    }

    return this._sendRequest('/lists/' + listAddress + '/members/' + memberAddress, 'DELETE');
  }

  /**
  * Validates a single Email
  * @method validateEmail
  * @param {String} emailToCheck The Address to validate
  * @return {Promise} The promise with the request results.
  */
  validateEmail(emailToCheck) {
    if (typeof emailToCheck != 'string') {
      throw new Error('emailToCheck must exist and be a string');
    }

    return this._sendRequest('/address/validate', 'GET', {
      publicApi: true,
      queryData: {
        address: emailToCheck
      }
    });
  }

  /**
  * Parses a single or multiple emails
  * @method parseEmail
  * @param {String} emailsToParse A single address or a list of addresses seperated
  *                               by a semi-colon or comma
  * @param {Boolean} syntaxOnly Perform only syntax checks or DNS and ESP specific validation as well.
  * @return {Promise} The promise with the request results.
  */
  parseEmail(emailsToParse, syntaxOnly) {
    if (typeof emailsToParse != 'string') {
      throw new Error('You must pass at least one email to parse');
    }

    if ((typeof syntaxOnly != 'boolean') && (typeof syntaxOnly != 'undefined')) {
      throw new Error('syntaxOnly should be true or false or undefined. (Defaults to true)');
    }

    if (typeof syntaxOnly == 'undefined') {
      syntaxOnly = true;
    }

    return this._sendRequest('/address/parse', 'GET', {
      publicApi: true,
      queryData: {
        syntax_only: syntaxOnly,
        addresses: emailsToParse
      }
    });
  }
} //End of Class

// var MailGun = require('mailgun-es6');
var mailGun = new MailGun({
  privateApi: 'key-2453a548806cfab4a5b8dd4120d74e43',
  publicApi: 'pubkey-44b46bb3e848d96db7f95ab2b5285350',
  domainName: 'sandbox6c870ede0e054f9d8f792643c62e30a7.mailgun.org'
});

module.exports = MailGun;
