chrome.storage.local.get('toggle', function(data) {
	 if(data.toggle == true){
	 	var links = document.getElementsByTagName('a');
		for (var i = 0, l = links.length; i < l; i++) {
		  links[i].target = '_blank';
		}
	 }
});
