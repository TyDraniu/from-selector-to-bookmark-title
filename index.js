var self = require("sdk/self");
var data = self.data;
var pws = require("sdk/page-worker");
var { setInterval, clearInterval } = require("sdk/timers");

var preferences = require("sdk/simple-prefs");
var inter = preferences.prefs["interval"];
var sel = preferences.prefs["selector"];
var sourceURL = preferences.prefs["sourceURL"];
const SECOND = 1000;

function onPrefChange(prefName) {
		clearInterval(timer);
		inter = preferences.prefs["interval"];
		sel = preferences.prefs["selector"];
		sourceURL = preferences.prefs["sourceURL"];
		
		timer = setInterval(p, ((inter < 20) ? 20 : inter) * SECOND);
}

preferences.on("", onPrefChange);

function p() {
	let pageWorker = pws.Page({
	  contentScriptFile: data.url("script.js"),
	  contentScriptOptions: { "sel" : sel },
	  contentURL: sourceURL,
	  contentScriptWhen: "ready"
	  });
	
	pageWorker.on("message", function(message) {
		let { search, save } = require("sdk/places/bookmarks");
		
		//query places/bookmarks
		search({ query: sourceURL }, { sort: "title" }).on("end", bookmarkList );
		
		function bookmarkList(bookmarks) {
			for (i in bookmarks) {
			  if (message != null) {
				bookmarks[i].title = message.trim();
				save(bookmarks[i]);
			  }
			};
			pageWorker.destroy();
		};
	});
}

var timer = setInterval(p, ((inter < 20) ? 20 : inter) * SECOND);
