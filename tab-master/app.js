chrome.storage.sync.get({
    toggle: true,
    block_list: [],
}, function (items) {
    var toggle = items.toggle;
    var block_list = items.block_list;
    if (!toggle) return;
    if (isBlocked(block_list)) return;
    var links = document.getElementsByTagName('a');
    for (var i = 0, l = links.length; i < l; i++) {
        links[i].target = '_blank';
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