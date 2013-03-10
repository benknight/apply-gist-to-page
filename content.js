var css = [];
var js = [];

function applyCSS() {
	for ( var x in css ) {
		var style = document.createElement('style');
		style.innerHTML = css[x];
		document.head.appendChild(style);
	}
}

function applyJS() {
	for ( var x in js ) {
		var script = document.createElement('script');
		script.innerHTML = js[x];
		document.body.appendChild(script);
	}
}

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/gists/' + request.gist, true);
		xhr.onload = function() {
			var data = JSON.parse(this.responseText);
			for ( var file in data.files ) {
				if ( data.files[file].language == 'CSS') {
					css.push( data.files[file].content );
				}
				if ( data.files[file].language == 'JavaScript' ) {
					js.push( data.files[file].content );
				}
			}
			// Apply CSS, then JS.
			applyCSS();
			applyJS();
		};
		xhr.onerror = function() {
			console.log('Failed to load Gist: ' + request.gist);
		};
		xhr.send();
	}
);