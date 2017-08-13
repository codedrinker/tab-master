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
    chrome.contextMenus.create({
        "title": "Add to Block List",
        "contexts": ["page"],
        "onclick": function (info) {
            add2blocklist(info.pageUrl);
        }
    });
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
    chrome.contextMenus.create({
        "title": "Add to Block List",
        "contexts": ["page"],
        "onclick": function (info) {
            add2blocklist(info.pageUrl);
        }
    });
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
checkToggle();