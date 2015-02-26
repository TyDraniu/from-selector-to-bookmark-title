var self = require("sdk/self");
var data = self.data;
var pws = require("sdk/page-worker");
var { setInterval, clearInterval } = require("sdk/timers");
var inter = require("sdk/simple-prefs").prefs["interval"];

function onPrefChange(prefName) {
		inter = require("sdk/simple-prefs").prefs[prefName];
		console.log("The preference " + prefName + " value has changed to " + inter);
		clearInterval(timer);
		timer = setInterval(p, inter);
}
require("sdk/simple-prefs").on("interval", onPrefChange);

function p() {
	let pageWorker = pws.Page({
	  contentScriptFile: data.url("script.js"),
	  contentURL: "http://mozillapl.org/forum/index.php",
	  contentScriptWhen: "ready"
	  });
	
	pageWorker.on("message", function(message) {
		let { search, UNSORTED, save } = require("sdk/places/bookmarks");
		
		//query places/bookmarks
		search({ query: "mozillapl.org" }, { sort: "title" }).on("end", bookmarkList );
		
		function bookmarkList(bookmarks) {
			for (i in bookmarks) {
			  console.log("bookmark: " + bookmarks[i].title);
			  if (message != null) {
				bookmarks[i].title = message;
				save(bookmark[i]);
				//console.log("Now waiting " + inter);
			  }
			};
			pageWorker.destroy();
		};
	});
}

var timer = setInterval(p, inter);