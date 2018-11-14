'use strict'; //Needed for ES6 Classes.

// var https = require('https');
// var stream = require('stream');
// var fs = require('fs');
// var path = require('path');

class FormData {
  constructor(options) {
    //Generate a Boundry to use for this instance
    //The boundary just needs to be random enough to not be included in any of
    //the sent data text.  This generates multiple -'s followed by 24 random
    //HexDec Chars.  Should be good for almost any situation...
    //unless you're really trying to screw things up.
    //https://github.com/coolaj86/http-examples/tree/master/multipart-form
    var baseBoundary = '--------------------------';
    for (var i = 0; i < 24; i++) {
      baseBoundary += Math.floor(Math.random() * 16).toString(16);
    }
    this._boundary = baseBoundary;

    //Number of form records being sent.
    this.dataCount = 0;

    //Set the variable that we will save the stream to. The way that they name
    //the streams was a little confusing for me.  This is how you should see it.
    //StreamReadable allows you to read FROM it.
    //StreamWriteable allows you to write TO it.
    //Lots of good information here: https://github.com/substack/stream-handbook
    this.dataStream = new stream.Readable();
  }

  get contentType() {
    return 'multipart/form-data; boundary=' + this._boundary;
  }

  get _lineBreak() {
    return '\r\n';
  }

  addData(name, value, type) {
    //This function adds data to the dataStream.
    //Yes. It's blocking.  Yes, that's how I designed it. Is there a reason
    //to turn this into a complicated promise or callback situation?
    if ((typeof name == 'undefined') || (typeof value == 'undefined')) {
      throw new Error('You must provide a name and value to add.');
    }

    this.dataStream.push('--' + this._boundary + this._lineBreak);

    if (typeof type != 'undefined') {
      this.dataStream.push(`Content-Disposition: form-data; name="${name}"; filename="${path.basename(value)}"`);
      this.dataStream.push(this._lineBreak);
      this.dataStream.push(`Content-Type: ${type}`);
      this.dataStream.push(this._lineBreak + this._lineBreak);
      this.dataStream.push(fs.readFileSync(path.resolve(value)));
      this.dataStream.push(this._lineBreak);
    } else {
      //Just a regular data field.
      value = (typeof value != 'string') ? JSON.stringify(value) : value;
      this.dataStream.push(`Content-Disposition: form-data; name="${name}"`);
      this.dataStream.push(this._lineBreak + this._lineBreak);
      this.dataStream.push(value + this._lineBreak);
    }

    this.dataCount++;
  }

  submitTo(req) {
    //This will stream a Readable stream to a writeable stream.
    //Curious to see what it looks like? process.stdout is a writable stream.

    //First we need to close up the form data.
    this.dataStream.push('--' + this._boundary + '--' + this._lineBreak);
    //Pushing null tells the stream that that's the end.
    this.dataStream.push(null);
    this.dataStream.pipe(req);
  }
}

// module.exports = FormData;


var mailGun = new MailGun({
  privateApi: 'key-2453a548806cfab4a5b8dd4120d74e43', // 'Your Private API Key',
  publicApi: 'key-2453a548806cfab4a5b8dd4120d74e43', // 'Your Public API Key',
  domainName: 'sandbox6c870ede0e054f9d8f792643c62e30a7.mailgun.org' // 'The domain on your account'
});

console.log(mailGun);

mailGun.sendEmail({
  to: 'james@medbridgeed.com',
  from: 'james@medbridgeed.com',
  subject: 'Email Subject',
  text: 'Email Text'
});
