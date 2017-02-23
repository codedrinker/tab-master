function displayEnable () {
	chrome.contextMenus.removeAll();
	chrome.contextMenus.create({
	      title: "Enable",
	      contexts: ["browser_action"],
	      onclick: function() {
	        enable();
	        displayDisable();
	      }
	});
}

function displayDisable() {
	chrome.contextMenus.removeAll();
	chrome.contextMenus.create({
	      title: "Disable",
	      contexts: ["browser_action"],
	      onclick: function() {
	        disable();
	        displayEnable();
	      }
	});
}

function enable() {
	 chrome.storage.local.set({'toggle': true}, function() {
     });
}
function disable() {
	 chrome.storage.local.set({'toggle': false}, function() {
     });
}

displayEnable();