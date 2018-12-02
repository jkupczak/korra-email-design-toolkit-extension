
//////////////////
//////////////////
//////////////////
// /
// /    Apply the original code to an iFrame to save it
// /
//////////////////
//////////////////
//////////////////
  //
  // ========== METHOD 1 =============
  // ======== ASYNC / XHR ============
  // =================================
  // We'll use xhr to access the filesystem and grab the original files HTML code.
  // This is great because it will be a string that was never rendered by the browser.
  // Previously we were grabiing the code after render, meaning things like <tbody> were being added.
  // This also opens the door for using emailcomb.com's API on the original code using a function.
  //
  // See newsletter-async.js for the xhr call.
  //
  //
  // //
  // ////
  // Grab all of the HTML in the document before we start manipulating the HTML
  //
  //
  // ========== METHOD 2 =============
  // ======= SERIALIZE XML ===========
  // =================================
  // This method serializes the DOM as XML and spits out a string.
  // This may be better than the current method I am using. But I don't have time to test it.
  // https://stackoverflow.com/a/17451014/556079
  //     var generatedSource = new XMLSerializer().serializeToString(document);
  //     console.log(generatedSource);
  //
  //
  // ========== METHOD 3 =============
  // ========== ORIGINAL =============
  // =================================
  // Originally I didn't know I could use xhr to get the pages original un-rendered HTML.
  // As a substitute I took the rendered code, and sort of frankenstein'd it together to create our desktop and mobile views.
  // This code has been commented out because we are now using xhr instead.

          ////
          // Get the page's HTML and Doctype
          ////


              //// We need a doctype first. Reassemble the doctype if there is one in the code.
              var savedDocType = "";

              if (document.doctype && document.doctype.name) {
                savedDocType = "<!doctype " + document.doctype.name;
                if (document.doctype.publicId) {
                  savedDocType += " PUBLIC \"" + document.doctype.publicId;
                }
                if (document.doctype.systemId) {
                  savedDocType += "\" \"" + document.doctype.systemId + '">';
                }
                if (!document.doctype.publicId && !document.doctype.systemId) {
                  savedDocType += ">";
                }
              }

              //// Create a copy of the original HTML
              var cleanedOriginalHtml = savedDocType;
              cleanedOriginalHtml += document.documentElement.outerHTML;

              //// Create the desktop and mobile versions
              var cleanedDesktopHtml = savedDocType;
              var cleanedMobileHtml = savedDocType;

                // Add dFrame.css to the desktop view
                var toolkitStyle = document.createElement("link");
                toolkitStyle.href = chrome.extension.getURL('css/newsletter/newsletter-dFrame.css');
                toolkitStyle.id = "debug-unique-style-block";
                toolkitStyle.className = "debug";
                toolkitStyle.rel = "stylesheet";
                toolkitStyle.type = "text/css";
                document.head.appendChild(toolkitStyle);

                // Add allFrames.css to both views
                var globalToolkitStyle = document.createElement("link");
                globalToolkitStyle.href = chrome.extension.getURL('css/newsletter/newsletter-allFrames.css');
                globalToolkitStyle.id = "debug-global-style-block";
                globalToolkitStyle.className = "debug";
                globalToolkitStyle.rel = "stylesheet";
                globalToolkitStyle.type = "text/css";
                document.head.appendChild(globalToolkitStyle);

                // Next add in the document's markup. Everything inside the <html> tag and including the <html> tag.
                cleanedDesktopHtml += document.documentElement.outerHTML;

                document.getElementById("debug-unique-style-block").setAttribute("href", chrome.extension.getURL('css/newsletter/newsletter-mFrame.css'))
                cleanedMobileHtml += document.documentElement.outerHTML;
