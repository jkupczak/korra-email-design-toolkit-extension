//
// If I want to share this extension, I need a way to make it easy to find/keep the Users/<namehere>/ value.
//

var bkg = chrome.extension.getBackgroundPage();
bkg.console.log('foo');



chrome.browserAction.onClicked.addListener(function(tab) { // Do this when icon is clicked.


	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

		var currUrl = tabs[0].url

		if ( /^https?:\/\/(www\.)?dropbox\.com\/home\//.test(currUrl) ) { // If the current URL is on Dropbox, and is not a shortened link.
			var newUrl = currUrl.replace(/https?:\/\/(www\.)?dropbox\.com\/home\//gi, "file:///Users/jameskupczak/Dropbox%20(MedBridge%20.)/");
			var newUrl = newUrl.replace(/\/?\?preview=/gi, "\/");
		} 

		else if ( /^https?:\/\/(www\.)?dropbox\.com\/s\//.test(currUrl) ) { // Else, if the URL is shortened.

			var newUrl = currUrl.replace(/https?:\/\/(www\.)?dropbox\.com\/s\/.+?\//gi, "");

			var splitUrl = newUrl.split("-",6);

			var discipline = splitUrl[3];
			var year       = splitUrl[0];
			var fullYear   = "20" + year;
			var month      = splitUrl[1];
			var fullMonth  = "";
			var day        = splitUrl[2];
			var author     = splitUrl[5];
			var filename = newUrl;

			if ( month === "01" ) { fullMonth = "Jan" }
				else if ( month === "02" ) { fullMonth = "Feb" }
				else if ( month === "03" ) { fullMonth = "Mar" }
				else if ( month === "04" ) { fullMonth = "Apr" }
				else if ( month === "05" ) { fullMonth = "May" }
				else if ( month === "06" ) { fullMonth = "June" }
				else if ( month === "07" ) { fullMonth = "July" }
				else if ( month === "08" ) { fullMonth = "Aug" }
				else if ( month === "09" ) { fullMonth = "Sept" }
				else if ( month === "10" ) { fullMonth = "Sept" }
				else if ( month === "11" ) { fullMonth = "Nov" }
				else if ( month === "12" ) { fullMonth = "Dec" }


			var newUrl = "file:///Users/jameskupczak/Dropbox%20(MedBridge%20.)/Marketing%202/Campaigns/Email/" + discipline + "/" + fullYear + "/" + fullMonth + "-" + discipline + "/" + year + "-" + month + "-" + day + "-" + author + "/" + filename

		} 

		else { // Else, it's a local file.
			var newUrl = currUrl.replace(/file:\/\/\/Users\/(jameskupczak)?\/Dropbox%20\(MedBridge%20\.\)\//gi, "https://www.dropbox.com/home/");
		}

		chrome.tabs.update({
		     url: newUrl
		});

	});


});