// Access window variable from Content Script
// http://stackoverflow.com/a/20513730/556079

// Read your variable from here and do stuff with it
console.log(editor);


  // Wrap wrapper around nodes
  // Just pass a collection of nodes, and a wrapper element
  function wrapAll(nodes, wrapper) {
      // Cache the current parent and previous sibling of the first node.
      var parent = nodes[0].parentNode;
      var previousSibling = nodes[0].previousSibling;

      // Place each node in wrapper.
      //  - If nodes is an array, we must increment the index we grab from
      //    after each loop.
      //  - If nodes is a NodeList, each node is automatically removed from
      //    the NodeList when it is removed from its parent with appendChild.
      for (var i = 0; nodes.length - i; wrapper.firstChild === nodes[0] && i++) {
          wrapper.appendChild(nodes[i]);
      }

      // Place the wrapper just after the cached previousSibling
      parent.insertBefore(wrapper, previousSibling.nextSibling);

      return wrapper;
  }


  // Set the editor and submit button
  var editorDiv = document.querySelector("#page-content.ace_editor");
  var submit = document.querySelector("#save-page-content");


  // Create wrapper for editor.
  var editorWrapper = document.createElement("div");
  editorWrapper.className = "editor-wrapper";

  // Create expand editor button
  var expandEditor = document.createElement("div");
  expandEditor.className = "expand-editor";
  expandEditor.innerHTML = "Expand";
  expandEditor.addEventListener("click", expEditor, false);

  var footerWrapper = document.createElement("div");
  footerWrapper.className = "editor-footer";
  footerWrapper.appendChild(submit);
  footerWrapper.appendChild(expandEditor);

  // Add it it all to the DOM and wrap it.
  var arr = [];
  arr.push(editorDiv);
  arr.push(footerWrapper);

  wrapAll(arr, editorWrapper);


  function expEditor() {
    document.body.classList.toggle("fullscreen-editor");
    editor.resize();
  }
