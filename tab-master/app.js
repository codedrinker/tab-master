chrome.storage.sync.get({
    toggle: true,
    block_mode: true,
    block_list: [],
    white_list: []
}, function (items) {
    var toggle = items.toggle;
    var block_list = items.block_list;
    var white_list = items.white_list;
    var block_mode = items.block_mode;
    if (!toggle) return;
    if (block_mode) {
        if (!isInWhiteList(white_list)) return;
    } else {
        if (isBlocked(block_list)) return;
    }
    var links = document.getElementsByTagName('a');
    for (var i = 0, l = links.length; i < l; i++) {
        links[i].target = '_blank';
        // links[i].addEventListener("click", function (e) {
        //     chrome.tabs.create({"url": this.getAttribute('href'), "active": false}, function (tab) {
        //         //Close tab here
        //     });
        // });
    }
});
function isBlocked(block_list) {
    if (!block_list || block_list.length == 0) return false;
    var domain = document.domain;
    var block = false;
    for (var i = 0; i < block_list.length; i++) {
        if (domain.indexOf(block_list[i]) != -1) {
            block = true;
        }
    }
    return block;
}
function isInWhiteList(white_list) {
    if (!white_list || white_list.length == 0) return false;
    var domain = document.domain;
    var block = false;
    for (var i = 0; i < white_list.length; i++) {
        if (domain.indexOf(white_list[i]) != -1) {
            block = true;
        }
    }
    return block;
}