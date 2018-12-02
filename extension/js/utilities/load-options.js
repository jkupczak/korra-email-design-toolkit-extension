

  var getAllOptions = new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, (items) => {
          let err = chrome.runtime.lastError;
          if (err) {

            //@TODO What do I do if the call errors out?!
            reject(err);

          } else {

            // Apply our result to a global variable so that we can use it throughout our other scripts.
            // Maybe not the best way to handle this?
            exOptions = items;
            korraOptions = items;

            console.groupCollapsed("Options from Storage (exOptions)");
            console.log(exOptions);
            console.groupEnd();


            // Created this function to take the items we got from the async call
            // and apply them to variables for easy use in other scripts.
            // I don't actually think this is necessary. Shouldn't I just call the items object?
            // Like...
            // exOptions = items;
            // And then later...
            // exOptions.optionName // returns the option I want.
            // They are afterall all already named within the object!
            // @TODO
            // resolveOptions(items);


            resolve(items);

            // var mailgunApiKey = exOptions.
          }
      });
  });
