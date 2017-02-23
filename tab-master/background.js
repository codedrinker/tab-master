function displayEnable () {
	chrome.contextMenus.removeAll();
	chrome.contextMenus.create({
	      title: "Enable",
	      contexts: ["browser_action"],
	      onclick: function() {
	        enable();
	        displayDisable();
	        refresh();
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
	        refresh();
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

function refresh() {
	chrome.tabs.getSelected(null, function(tab) {
        tabId = tab.id;
        chrome.tabs.reload(tabId);
    });
}

enable();
displayDisable();