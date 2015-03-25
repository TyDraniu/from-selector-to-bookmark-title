function getPostNumber()
{
try {
	var selector = document.querySelector('#page-body > P:last-child > STRONG:first-child');

	if (selector != null) {
		//console.log("gpn(): " + selector.textContent);
		return selector.textContent;
	}
	else {
		console.exception("Selector is missing");
		return null;
	}
}
catch (e) {
	console.exception(e.message);
	return null;
	}
};

self.postMessage(getPostNumber(), "*");