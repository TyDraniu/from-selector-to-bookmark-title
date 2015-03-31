function getPostNumber(sel)
{
try {
	var selector = document.querySelector(sel);

	if (selector != null) {
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

self.postMessage(getPostNumber(self.options.sel), "*");