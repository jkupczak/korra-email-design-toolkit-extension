
//
/////////
//
// Isolated into its own file because its used both on local HTML files and on the MedBridge Blog
//
//
function isArticleProtected(document) {

  if ( /<h1/.test(document) ) {
    if ( /class="post__title">Protected\: /.test(document) ) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }

}
