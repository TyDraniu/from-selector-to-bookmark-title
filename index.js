var self = require('sdk/self');
var data = require("sdk/self").data;
var { setInterval } = require("sdk/timers");


setInterval(function () {
	let pageWorker = require("sdk/page-worker").Page({
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
			  }
			};
			save(bookmarks).on("data", function (item, inputItem) {
			  // Each item in `bookmarks` has its own `data` event
			}).on("end", function (results, inputResults) {
			  // `results` is an array of items saved in the same order
			  // as they were passed in.
			});
		};
	});
	
}, 60000);
	  


