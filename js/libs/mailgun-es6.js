module.exports = {
  'definitions': {
    'message': {
      'description': 'This API allows you to send, access, and delete mesages programmatically.',
      'links': [{
        'description': 'Returns a single message in JSON format. To get full MIME message set MIME to true',
        'href': '/messages/{message}',
        'method': 'GET',
        'title': 'info',
        'properties': {
          'MIME': {
            'type': 'boolean'
          }
        }
      },
      {
        'description': 'Sends a message by assembling it from the components.',
        'href': '/messages',
        'method': 'POST',
        'title': 'send',
        'properties': {
          'from': {
            'type': 'string'
          }
        },
        'required': ['from']
      },
      {
        'description': 'Sends a message in MIME format.',
        'href': '/messages.mime',
        'method': 'POST',
        'title': 'send-mime',
        'properties': {
          'message': {
            'type': ['string', 'object']
          }
        }
      },
      {
        'description': 'To delete an inbound message that has been stored via the store() action.',
        'href': '/messages/{message}',
        'method': 'DELETE',
        'title': 'delete'
      }
      ]
    },
    'domain': {
      'description': 'This API allows you to create, access, and validate domains programmatically.',
      'links': [{
        'description': 'Returns a list of domains under your account in JSON.',
        'href': '/domains',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          }
        }
      },
      {
        'description': 'Returns a single domain, including credentials and DNS records.',
        'href': '/domains/{domain}',
        'method': 'GET',
        'title': 'info'
      },
      {
        'description': 'Create a new domain.',
        'href': '/domains',
        'method': 'POST',
        'title': 'create',
        'properties': {
          'name': {
            'type': 'string'
          },
          'smtp_password': {
            'type': 'string'
          },
          'wildcard': {
            'type': 'boolean'
          }
        },
        'required': ['name', 'smtp_password']
      },
      {
        'description': 'Delete a domain from your account.',
        'href': '/domains/{domain}',
        'method': 'DELETE',
        'title': 'delete'
      },
      {
        'description': 'Verifies and returns a single domain, including credentials and DNS records.',
        'href': '/domains/{domain}/verify',
        'method': 'PUT',
        'title': 'verify'
      }
      ]
    },
    'credentials': {
      'description': 'Programmatically get and modify domain credentials.',
      'links': [{
        'description': 'Returns a list of SMTP credentials for the defined domain.',
        'href': '/domains/{domain}/credentials',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          }
        }
      },
      {
        'description': 'Creates a new set of SMTP credentials for the defined domain.',
        'href': '/domains/{domain}/credentials',
        'method': 'POST',
        'title': 'create',
        'properties': {
          'login': {
            'type': 'string'
          },
          'password': {
            'type': 'string'
          }
        },
        'required': ['login', 'password']
      },
      {
        'description': 'Updates the specified SMTP credentials. Currently only the password can be changed.',
        'href': '/domains/{domain}/credentials/{login}',
        'method': 'PUT',
        'title': 'update',
        'properties': {
          'password': {
            'type': 'string'
          }
        },
        'required': ['password']
      },
      {
        'description': 'Deletes the defined SMTP credentials.',
        'href': '/domains/{domain}/credentials/{login}',
        'method': 'DELETE',
        'title': 'delete'
      }
      ]
    },
    'complaints': {
      'description': 'This API allows you to programmatically download the list of users who have complained, add a complaint, or delete a complaint.',
      'links': [{
        'description': 'Fetches the list of complaints.',
        'href': '/complaints',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          }
        }
      },
      {
        'description': 'Adds an address to the complaints table.',
        'href': '/complaints',
        'method': 'POST',
        'title': 'create',
        'properties': {
          'address': {
            'type': 'string'
          }
        },
        'required': ['address']
      },
      {
        'description': 'Fetches a single spam complaint by a given email address.',
        'href': '/complaints/{address}',
        'method': 'GET',
        'title': 'info'
      },
      {
        'description': 'Removes a given spam complaint.',
        'href': '/complaints/{address}',
        'method': 'DELETE',
        'title': 'delete'
      }
      ]
    },
    'unsubscribes': {
      'description': 'This API allows you to programmatically download the list of recipients who have unsubscribed from your emails. You can also programmatically “clear” the unsubscribe event.',
      'links': [{
        'description': 'Fetches the list of unsubscribes.',
        'href': '/unsubscribes',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          }
        }
      },
      {
        'description': 'Retreives a single unsubscribe record.',
        'href': '/unsubscribes/{address}',
        'method': 'GET',
        'title': 'info'
      },
      {
        'description': 'Removes an address from the unsubscribes table.',
        'href': '/unsubscribes/{address}',
        'method': 'DELETE',
        'title': 'delete'
      },
      {
        'description': 'Adds address to unsubscribed table.',
        'href': '/unsubscribes',
        'method': 'POST',
        'title': 'create',
        'properties': {
          'address': {
            'type': 'string'
          },
          'tag': {
            'type': 'string'
          }
        },
        'required': ['address', 'tag']
      }
      ]
    },
    'bounces': {
      'description': 'Mailgun automatically handles bounced emails. The list of bounced addresses can be accessed programmatically.',
      'links': [{
        'description': 'Fetches the list of bounces.',
        'href': '/bounces',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          }
        }
      },
      {
        'description': 'Fetches a single bounce event by a given email address.',
        'href': '/bounces/{address}',
        'method': 'GET',
        'title': 'info'
      },
      {
        'description': 'Clears a given bounce event.',
        'href': '/bounces/{address}',
        'method': 'DELETE',
        'title': 'delete'
      },
      {
        'description': 'Adds a permanent bounce to the bounces table. Updates the existing record if already here.',
        'href': '/bounces',
        'method': 'POST',
        'title': 'create',
        'properties': {
          'address': {
            'type': 'string'
          },
          'code': {
            'type': 'number'
          },
          'error': {
            'type': 'string'
          }
        },
        'required': ['address']
      }
      ]
    },
    'routes': {
      'description': 'Mailgun Routes are a powerful way to handle the incoming traffic. This API allows you to work with routes programmatically.',
      'links': [{
        'description': 'Fetches the list of routes.',
        'href': '/routes',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          }
        }
      },
      {
        'description': 'Returns a single route object based on its ID.',
        'href': '/routes/{id}',
        'method': 'GET',
        'title': 'info'
      },
      {
        'description': 'Creates a new route.',
        'href': '/routes',
        'method': 'POST',
        'title': 'create',
        'properties': {
          'limit': {
            'priority': 'number'
          },
          'description': {
            'type': 'string'
          },
          'expression': {
            'type': 'string'
          }
        },
        'required': ['expression']
      },
      {
        'description': 'Updates a given route by ID.',
        'href': '/routes/{id}',
        'method': 'PUT',
        'title': 'update',
        'properties': {
          'limit': {
            'priority': 'number'
          },
          'description': {
            'type': 'string'
          },
          'expression': {
            'type': 'string'
          }
        }
      },
      {
        'description': 'Deletes a route based on the id.',
        'href': '/routes/{id}',
        'method': 'DELETE',
        'title': 'delete'
      }
      ]
    },
    'list': {
      'description': 'You can programmatically work with mailing lists and mailing list members using Mailgun Mailing List API.',
      'links': [{
        'description': 'Returns a list of mailing lists under your account.',
        'href': '/lists',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'address': {
            'type': 'string'
          },
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          }
        }
      },
      {
        'description': 'Returns a single mailing list by a given address.',
        'href': '/lists/{address}',
        'method': 'GET',
        'title': 'info'
      },
      {
        'description': 'Creates a new mailing list.',
        'href': '/lists',
        'method': 'POST',
        'title': 'create',
        'properties': {
          'address': {
            'type': 'string'
          },
          'name': {
            'type': 'string'
          },
          'description': {
            'type': 'string'
          },
          'access_level': {
            'type': 'string'
          }
        },
        'required': ['address']
      },
      {
        'description': 'Update mailing list properties, such as address, description or name.',
        'href': '/lists/{address}',
        'method': 'PUT',
        'title': 'update',
        'properties': {
          'address': {
            'type': 'string'
          },
          'name': {
            'type': 'string'
          },
          'description': {
            'type': 'string'
          },
          'access_level': {
            'type': 'string'
          }
        }
      },
      {
        'description': 'Deletes a mailing list.',
        'href': '/lists/{address}',
        'method': 'DELETE',
        'title': 'delete'
      }
      ]
    },
    'members': {
      'description': 'Programatically work with mailing lists members.',
      'links': [{
        'description': 'Fetches the list of mailing list members.',
        'href': '/lists/{address}/members',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'subscribed': {
            'type': 'boolean'
          },
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          }
        }
      },
      {
        'description': 'Paginate over list members in the given mailing list',
        'href': '/lists/{address}/members/pages',
        'method': 'GET',
        'title': 'page',
        'properties': {
          'subscribed': {
            'type': 'boolean'
          },
          'limit': {
            'type': 'number'
          },
          'page': {
            'type': 'string'
          },
          'address': {
            'type': 'string'
          }
        }
      },
      {
        'description': 'Retrieves a mailing list member.',
        'href': '/lists/{address}/members/{member_address}',
        'method': 'GET',
        'title': 'info'
      },
      {
        'description': 'Adds a member to the mailing list.',
        'href': '/lists/{address}/members',
        'method': 'POST',
        'title': 'create',
        'properties': {
          'address': {
            'type': 'string'
          },
          'name': {
            'type': 'string'
          },
          'vars': {
            'type': 'object'
          },
          'subscribed': {
            'type': 'boolean'
          },
          'upsert': {
            'type': 'string'
          }
        },
        'required': ['address']
      },
      {
        'description': 'Adds multiple members, up to 1,000 per call, to a Mailing List.',
        'href': '/lists/{address}/members.json',
        'method': 'POST',
        'title': 'add',
        'properties': {
          'members': {
            'type': 'array'
          },
          'upsert': {
            'type': 'boolean'
          }
        },
        'required': ['members']
      },
      {
        'description': 'Updates a mailing list member with given properties.',
        'href': '/lists/{address}/members/{member_address}',
        'method': 'PUT',
        'title': 'update',
        'properties': {
          'address': {
            'type': 'string'
          },
          'name': {
            'type': 'string'
          },
          'vars': {
            'type': 'object'
          },
          'subscribed': {
            'type': 'string'
          }
        }
      },
      {
        'description': 'Delete a mailing list member.',
        'href': '/lists/{address}/members/{member_address}',
        'method': 'DELETE',
        'title': 'delete'
      }
      ]
    },
    'campaign': {
      'description': 'Manage campaigns. See http://documentation.mailgun.com/api-campaigns.html',
      'links': [{
        'description': 'Create a new campaign.',
        'href': '/campaigns',
        'method': 'POST',
        'title': 'create',
        'properties': {
          'id': {
            'type': 'string'
          },
          'name': {
            'type': 'string'
          }
        },
        'required': ['name']
      },
      {
        'description': 'Returns a list of campaigns.',
        'href': '/campaigns',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          }
        }
      },
      {
        'description': 'Get single campaign info.',
        'href': '/campaigns/{id}',
        'method': 'GET',
        'title': 'info'
      },
      {
        'description': 'Update campaign.',
        'href': '/campaigns/{id}',
        'method': 'PUT',
        'title': 'update',
        'properties': {
          'id': {
            'type': 'string'
          },
          'name': {
            'type': 'string'
          }
        }
      },
      {
        'description': 'Delete campaign.',
        'href': '/campaigns/{id}',
        'method': 'DELETE',
        'title': 'delete'
      }
      ]
    },
    'stats': {
      'description': 'Various data and event statistics for you mailgun account. See http://documentation.mailgun.com/api-stats.html',
      'links': [{
        'description': 'Returns a list of event stat items. Each record represents counts for one event per one day.',
        'href': '/stats',
        'method': 'GET',
        'title': 'list',
        'properties': {
          'limit': {
            'type': 'number'
          },
          'skip': {
            'type': 'number'
          },
          'start-date': {
            'type': 'string'
          }
        }
      }]
    },
    'tags': {
      'description': 'Deletes all counters for particular tag and the tag itself. See http://documentation.mailgun.com/api-stats.html',
      'links': [{
        'description': 'List all tags.',
        'href': '/tags',
        'method': 'GET',
        'title': 'list'
      },
      {
        'description': 'Gets a specific tag.',
        'href': '/tags/{tag}',
        'method': 'GET',
        'title': 'info'
      },
      {
        'description': 'Returns statistics for a given tag.',
        'href': '/tags/{tag}/stats',
        'method': 'GET',
        'title': 'info',
        'properties': {
          'event': {
            'type': 'array'
          },
          'start': {
            'type': 'string'
          },
          'end': {
            'type': 'string'
          },
          'resolution': {
            'type': 'string'
          },
          'duration': {
            'type': 'string'
          }
        },
        'required': ['event']
      },
      {
        'description': 'Returns a list of countries of origin for a given domain for different event types.',
        'href': '/tags/{tag}/stats/aggregates/countries',
        'method': 'GET',
        'title': 'list'
      },
      {
        'description': 'Returns a list of email providers for a given domain for different event types.',
        'href': '/tags/{tag}/stats/aggregates/providers',
        'method': 'GET',
        'title': 'list'
      },
      {
        'description': 'Returns a list of devices for a given domain that have triggered event types.',
        'href': '/tags/{tag}/stats/aggregates/devices',
        'method': 'GET',
        'title': 'list'
      },
      {
        'description': 'Deletes all counters for particular tag and the tag itself.',
        'href': '/tags/{tag}',
        'method': 'DELETE',
        'title': 'delete'
      }
      ]
    },
    'events': {
      'description': 'Query events that happen to your emails. See http://documentation.mailgun.com/api-events.html',
      'links': [{
        'description': 'Queries event records.',
        'href': '/events',
        'method': 'GET',
        'title': 'get',
        'properties': {
          'begin': {
            'type': 'string'
          },
          'end': {
            'type': 'string'
          },
          'ascending': {
            'type': 'string'
          },
          'limit': {
            'type': 'number'
          },
          'pretty': {
            'type': 'string'
          }
        }
      }]
    }
  }
}

//////////
//////////
//////////

// const inflection = require('inflection')
// const pathProxy = require('path-proxy')
// const promisifyCall = require('promisify-call')

class Builder {
  constructor (baseObj, resources) {
    this.baseObj = baseObj
    this.resources = resources
  }

  build () {
    Object.keys(this.resources).forEach((key) => {
      // console.log('building ' + key);
      this.buildResource(this.resources[key])
    })
  }

  buildResource (resource) {
    resource.links.forEach(this.buildAction, this)
  }

  buildAction (action) {
    const actionName = action.title
    const properties = action.properties
    const requiredProps = action.required

    // HACKY special case for members bulk add and send MIME endpoints
    const path = action.href.replace(/\.json/gi, '').replace(/\.mime/gi, '')
    const constructor = pathProxy.pathProxy(this.baseObj, path)

    function impl (data, fn) {
      let requestPath = action.href
      const pathParams = action.href.match(/{[^}]+}/g) || []

      if (typeof data === 'function') {
        fn = data
        data = undefined
      }

      let err

      if (this.params.length !== pathParams.length) {
        err = new Error(`Invalid number of params in path (expected ${pathParams.length}, got ${this.params.length}).`)

        return fn(err)
      }

      this.params.forEach((param) => {
        requestPath = requestPath.replace(/{[^}]+}/, param)
      })

      // check required payload properties
      if (requiredProps && requiredProps.length > 0) {
        if (!data) {
          err = new Error('Missing parameters.')
        } else {
          for (let i = 0; i < requiredProps.length; i++) {
            const prop = requiredProps[i]

            if (typeof data[prop] === 'undefined') {
              err = new Error(`Missing parameter '${prop}'`)
              break
            }
          }
        }
      }

      if (err) {
        return fn(err)
      }

      // check payload property types
      for (const key in properties) {
        if (data && data[key]) {
          const type = properties[key].type

          let dataType = typeof data[key]

          if (Array.isArray(data[key])) {
            dataType = 'array'
          }

          if (Array.isArray(type)) {
            if (type.indexOf(dataType) === -1) {
              err = new Error(`Invalid parameter type. ${key} must be of type: ${type}.`)
              break
            }
          } else if (dataType !== type) {
            err = new Error(`Invalid parameter type. ${key} must be of type: ${type}.`)
            break
          }
        }
      }

      if (err) {
        return fn(err)
      }

      this.client = this.base

      return this.client.request(action.method, requestPath, data, fn)
    }

    function promisifed (data, fn) {
      return promisifyCall(this, impl, data, fn)
    }

    constructor.prototype[getName(actionName)] = promisifed
  }
}

function getName (name) {
  name = name.toLowerCase()
  name = inflection.dasherize(name).replace(/-/g, '_')
  name = inflection.camelize(name, true)

  return name
}

function build (baseObj, resources) {
  const b = new Builder(baseObj, resources)

  b.build()
}

// exports.build = build

//////////////////
//////////////////
//////////////////
//////////////////


// const tsscmp = require('tsscmp')
// const crypto = require('crypto')

// const Attachment = require('./attachment')
// const Request = require('./request')
const builder = build;
const resources = require('./schema').definitions

const mailgunExpirey = 15 * 60 * 1000
const mailgunHashType = 'sha256'
const mailgunSignatureEncoding = 'hex'

class Mailgun {
  constructor (options) {
    if (!options.apiKey) {
      throw new Error('apiKey value must be defined!')
    }
    this.username = 'api'
    this.apiKey = options.apiKey
    this.publicApiKey = options.publicApiKey
    this.domain = options.domain
    this.auth = [this.username, this.apiKey].join(':')
    this.mute = options.mute || false
    this.timeout = options.timeout

    this.host = options.host || 'api.mailgun.net'
    this.endpoint = options.endpoint || '/v3'
    this.protocol = options.protocol || 'https:'
    this.port = options.port || 443
    this.retry = options.retry || 1

    if (options.proxy) {
      this.proxy = options.proxy
    }

    this.options = {
      'host': this.host,
      'endpoint': this.endpoint,
      'protocol': this.protocol,
      'port': this.port,
      'auth': this.auth,
      'proxy': this.proxy,
      'timeout': this.timeout,
      'retry': this.retry
    }

    this.mailgunTokens = {}
  }

  getDomain (method, resource) {
    let d = this.domain

    // filter out API calls that do not require a domain specified
    if ((resource.indexOf('/routes') >= 0) ||
      (resource.indexOf('/lists') >= 0) ||
      (resource.indexOf('/address') >= 0) ||
      (resource.indexOf('/domains') >= 0)) {
      d = ''
    } else if ((resource.indexOf('/messages') >= 0) &&
      (method === 'GET' || method === 'DELETE')) {
      d = `domains/${this.domain}`
    }

    return d
  }

  getRequestOptions (resource) {
    let o = this.options

    // use public API key if we have it for the routes that require it
    if ((resource.indexOf('/address/validate') >= 0 ||
        (resource.indexOf('/address/parse') >= 0)) &&
      this.publicApiKey) {
      const copy = Object.assign({}, this.options)

      copy.auth = [this.username, this.publicApiKey].join(':')
      o = copy
    }

    return o
  }

  request (method, resource, data, fn) {
    let fullpath = resource
    const domain = this.getDomain(method, resource)

    if (domain) {
      fullpath = '/'.concat(domain, resource)
    }

    const req = new Request(this.options)

    return req.request(method, fullpath, data, fn)
  }

  post (path, data, fn) {
    const req = new Request(this.options)

    return req.request('POST', path, data, fn)
  }

  get (path, data, fn) {
    const req = new Request(this.options)

    return req.request('GET', path, data, fn)
  }

  delete (path, data, fn) {
    const req = new Request(this.options)

    return req.request('DELETE', path, data, fn)
  }

  put (path, data, fn) {
    const req = new Request(this.options)

    return req.request('PUT', path, data, fn)
  }

  validateWebhook (timestamp, token, signature) {
    const adjustedTimestamp = parseInt(timestamp, 10) * 1000
    const fresh = (Math.abs(Date.now() - adjustedTimestamp) < mailgunExpirey)

    if (!fresh) {
      if (!this.mute) {
        console.error('[mailgun] Stale Timestamp: this may be an attack')
        console.error('[mailgun] However, this is most likely your fault\n')
        console.error('[mailgun] run `ntpdate ntp.ubuntu.com` and check your system clock\n')
        console.error(`[mailgun] System Time: ${new Date().toString()}`)
        console.error(`[mailgun] Mailgun Time: ${new Date(adjustedTimestamp).toString()}`, timestamp)
        console.error(`[mailgun] Delta: ${Date.now() - adjustedTimestamp}`)
      }

      return false
    }

    if (this.mailgunTokens[token]) {
      if (!this.mute) {
        console.error('[mailgun] Replay Attack')
      }

      return false
    }

    this.mailgunTokens[token] = true

    const tokenTimeout = setTimeout(() => {
      delete this.mailgunTokens[token]
    }, mailgunExpirey + (5 * 1000))

    tokenTimeout.unref()

    return tsscmp(
      signature, crypto.createHmac(mailgunHashType, this.apiKey)
      .update(Buffer.from(timestamp + token, 'utf-8'))
      .digest(mailgunSignatureEncoding)
    )
  }

  validate (address, isPrivate, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts
      opts = {}
    }

    if (typeof isPrivate === 'object') {
      opts = isPrivate
      isPrivate = false
    }

    if (typeof isPrivate === 'function') {
      fn = isPrivate
      isPrivate = false
      opts = {}
    }

    let resource = '/address/validate'

    if (isPrivate) {
      resource = '/address/private/validate'
    }

    const options = this.getRequestOptions(resource)

    const req = new Request(options)
    const data = Object.assign({}, {
      address
    }, opts)

    return req.request('GET', resource, data, fn)
  }

  parse (addresses, isPrivate, opts, fn) {
    if (typeof opts === 'function') {
      fn = opts
      opts = {}
    }

    if (typeof isPrivate === 'object') {
      opts = isPrivate
      isPrivate = false
    }

    if (typeof isPrivate === 'function') {
      fn = isPrivate
      isPrivate = false
      opts = {}
    }

    let resource = '/address/parse'

    if (isPrivate) {
      resource = '/address/private/parse'
    }

    const options = this.getRequestOptions(resource)

    const req = new Request(options)
    const data = Object.assign({}, {
      addresses
    }, opts)

    return req.request('GET', resource, data, fn)
  }
}

builder.build(Mailgun, resources)

Mailgun.prototype.Attachment = Attachment

Mailgun.prototype.Mailgun = Mailgun

function create (options) {
  return new Mailgun(options)
}

module.exports = create



///////////////////////
///////////////////////
///////////////////////
///////////////////////
///////////////////////



var api_key = 'key-2453a548806cfab4a5b8dd4120d74e43';
var domain = 'sandbox6c870ede0e054f9d8f792643c62e30a7.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
  from: 'Excited User <james@medbridgeed.com>',
  to: 'james@medbridgeed.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
