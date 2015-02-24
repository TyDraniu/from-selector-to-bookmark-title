function getPostNumber()
{
try {
	var selector = document.querySelector('#page-body > P:last-child > STRONG:first-child');

	if (selector != null) {
		console.log("gpn(): " + selector.innerHTML);
		return selector.innerHTML;
	}
	else {
		console.exception("Brak selektora");
		return null;
	}
}
catch (e) {
	console.exception(e.message);
	return null;
	}
};

self.postMessage(getPostNumber(), "*");