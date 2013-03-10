
chrome.omnibox.onInputEntered.addListener(function(gist) {
	// console.log('inputEntered: ' + gist);
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendMessage(tab.id, { gist: gist });
	});
});
