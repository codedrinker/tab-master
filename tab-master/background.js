function attachContextMenu() {
    chrome.storage.sync.get({
        block_mode: true,
        white_list: [],
        block_list: []
    }, function (items) {
        var block_mode = items.block_mode;
        if (block_mode) {
            chrome.contextMenus.create({
                "title": "Enable On current apge",
                "contexts": ["page"],
                "onclick": function (info) {
                    add2whitelist(info.pageUrl);
                    refresh();
                }
            });
        } else {
            chrome.contextMenus.create({
                "title": "Disable on current page",
                "contexts": ["page"],
                "onclick": function (info) {
                    add2blocklist(info.pageUrl);
                    refresh();
                }
            });
        }
    });
}
function displayEnable() {
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        title: "Enable",
        contexts: ["browser_action"],
        onclick: function () {
            enable();
            displayDisable();
            refresh();
        }
    });
    attachContextMenu(block_mode);
}

function displayDisable() {
    chrome.contextMenus.removeAll();
    chrome.contextMenus.create({
        title: "Disable",
        contexts: ["browser_action"],
        onclick: function () {
            disable();
            displayEnable();
            refresh();
        }
    });
    attachContextMenu();
}

function enable() {
    chrome.storage.sync.set({'toggle': true}, function () {
    });
    chrome.browserAction.setIcon({
        path: "icon.png"
    });
}
function disable() {
    chrome.storage.sync.set({'toggle': false}, function () {
    });
    chrome.browserAction.setIcon({
        path: "close.png"
    });
}

function checkToggle() {
    chrome.storage.sync.get({
        toggle: true
    }, function (items) {
        var toggle = items.toggle;
        if (toggle) {
            displayDisable();
            enable();
        } else {
            displayEnable();
            disable();
        }
    });
}

function refresh() {
    chrome.tabs.getSelected(null, function (tab) {
        tabId = tab.id;
        chrome.tabs.reload(tabId);
    });
}

function getHostname(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
}

function add2blocklist(url) {
    var hostname = getHostname(url);
    chrome.storage.sync.get({block_list: []}, function (result) {
        var block_list = result.block_list;
        if (block_list.indexOf(hostname) != -1) return;
        block_list.push(hostname);
        chrome.storage.sync.set({block_list: block_list}, function () {

        });
    });
}
function add2whitelist(url) {
    var hostname = getHostname(url);
    chrome.storage.sync.get({white_list: []}, function (result) {
        var white_list = result.white_list;
        if (white_list.indexOf(hostname) != -1) return;
        white_list.push(hostname);
        chrome.storage.sync.set({white_list: white_list}, function () {
        });
    });
}
function removeFromwhitelist(url) {
    var hostname = getHostname(url);
    chrome.storage.sync.get({white_list: []}, function (result) {
        var white_list = result.white_list;
        var index = white_list.indexOf(hostname);
        if (index > -1) {
            white_list.splice(index, 1);
        }
        chrome.storage.sync.set({white_list: white_list}, function () {
        });
    });
}
checkToggle();