function saveOptions(e) {
  browser.storage.sync.set({
    url: document.querySelector("#url").value,
	selector: document.querySelector("#selector").value,
	interval: document.querySelector("#interval").value
  });
  e.preventDefault();
}

function restoreOptions() {
  var gettingPrefs = browser.storage.sync.get(['url', 'selector', 'interval']);
  gettingPrefs.then((res) => {
	document.querySelector("#url").value = res.url;
	document.querySelector("#selector").value = res.selector;
	document.querySelector("#interval").value = res.interval;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
