
var inter = 60;
var sel = '';
var sourceURL = '';
const MINUTE = 60;

var gettingPrefs = browser.storage.sync.get(['interval', 'url', 'selector']);

gettingPrefs.then((res) => {
  sel = res.selector;
  inter = res.interval;
  sourceURL = res.url;
  browser.alarms.create("periodic-alarm", { periodInMinutes: inter/MINUTE });
});

/*
On alarm, ask for the sourceURL.
*/
browser.alarms.onAlarm.addListener((alarm) => {
	if (alarm.name == "periodic-alarm" && sourceURL != '')
	{
		
		httpRequest = new XMLHttpRequest();

		if (!httpRequest) {
		  return false;
		}
		
		httpRequest.onreadystatechange = alertContents;
		httpRequest.open('GET', sourceURL, true);
		httpRequest.send();
	  }
});

/*
On prefs change.
*/
browser.storage.onChanged.addListener((settings) => {
  sel = settings.selector.newValue;
  inter = settings.interval.newValue;
  sourceURL = settings.url.newValue;
  
  var al = browser.alarms.clear("periodic-alarm");
  al.then(() => {
    browser.alarms.create("periodic-alarm", { periodInMinutes: inter/MINUTE });
  });
});

function alertContents() {
	var answer = null;
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			
			var doc = new DocumentFragment();
			var div = document.createElement("div");
			div.innerHTML = httpRequest.response;
			doc.appendChild(div);

			answer = doc.querySelector(sel);
		
			var searching = browser.bookmarks.search({url: sourceURL});
			searching.then((bookmarks) => {
			for (bk of bookmarks) {
				if (bk.url && answer != null) 
				{
					var updating = browser.bookmarks.update(bk.id, 
					{
						title: answer.innerHTML
					});
				}
			}});
		}
		else {
			console.log('There was a problem with the request.');
		}
	}
}