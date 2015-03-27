function getPostNumber(sel)
{
try {
	var selector = document.querySelector(sel);

	if (selector != null) {
		//console.log("gpn(): " + selector.textContent);
		return selector.textContent;
	}
	else {
		console.exception("Missing selector");
		return null;
	}
}
catch (e) {
	console.exception(e.message);
	return null;
	}
};


//console.log("selector(): " + self.options.sel);
self.postMessage(getPostNumber(self.options.sel), "*");