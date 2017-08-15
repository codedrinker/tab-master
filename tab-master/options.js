function save_options() {
    var toggle = document.getElementById('toggle').checked;
    var block_mode = document.getElementById('block_mode').checked;
    chrome.storage.sync.set({
        toggle: toggle,
        block_mode: block_mode
    }, function () {
        show_message("Changes Saved.");
        checkToggle();
    });
}

function restore_options() {
    chrome.storage.sync.get({
        toggle: true,
        block_mode: true,
        block_list: [],
        white_list: []
    }, function (items) {
        document.getElementById('toggle').checked = items.toggle;
        document.getElementById('block_mode').checked = items.block_mode;
        if (items.block_mode) {
            if (!!items.white_list && items.white_list.length != 0) {
                generate_list_table("White List", items.white_list)
            }
        } else {
            if (!!items.block_list && items.block_list.length != 0) {
                generate_list_table("Block List", items.block_list)
            }
        }
    });
}

function generate_list_table(table_title, block_list) {
    var title = document.createElement("h1");
    title.textContent = table_title;
    document.body.appendChild(title);
    var blockListTableNode = document.createElement('table');
    blockListTableNode.className = "options-table";
    var header = createTableHeader();
    blockListTableNode.appendChild(header);
    for (var i = 0, l = block_list.length; i < l; i++) {
        var block_hostname = block_list[i];
        var tr = createCellNode(block_hostname);
        blockListTableNode.appendChild(tr);
    }
    document.body.appendChild(blockListTableNode);
}

function createCellNode(blockHostname) {
    var tr = document.createElement('tr');
    var hostnameTd = document.createElement('td');
    hostnameTd.textContent = blockHostname;
    var optionTd = document.createElement('td');
    optionTd.setAttribute("data-bind", blockHostname);
    optionTd.textContent = "Remove";
    optionTd.style.cursor = "pointer";
    optionTd.style.color = "blue";
    optionTd.addEventListener("click", function (e) {
        var hostname = e.srcElement.getAttribute("data-bind");
        removeFromList(hostname);
        e.srcElement.parentNode.parentNode.removeChild(e.srcElement.parentNode);
        show_message("Remove " + hostname + " Successfully.");
    });
    tr.appendChild(hostnameTd);
    tr.appendChild(optionTd);
    return tr;
}

function createTableHeader() {
    var tr = document.createElement('tr');
    var hostnameTh = document.createElement('th');
    hostnameTh.textContent = "Hostname";
    var optionTh = document.createElement('th');
    optionTh.textContent = "Option";
    var tr = document.createElement('tr');
    tr.appendChild(hostnameTh);
    tr.appendChild(optionTh);
    return tr;
}

function removeFromList(hostname) {
    chrome.storage.sync.get({
        block_mode: true,
        block_list: [],
        white_list: []
    }, function (items) {
        if (items.block_mode) {
            var white_list = result.white_list;
            if (!white_list) return;
            var index = white_list.indexOf(hostname);
            if (index > -1) {
                white_list.splice(index, 1);
            }
            chrome.storage.sync.set({white_list: white_list}, function () {
                console.log("Remove " + hostname + " Succeed.")
            });
        } else {
            var block_list = result.block_list;
            if (!block_list) return;
            var index = block_list.indexOf(hostname);
            if (index > -1) {
                block_list.splice(index, 1);
            }
            chrome.storage.sync.set({block_list: block_list}, function () {
                console.log("Remove " + hostname + " Succeed.")
            });
        }
    });
}

function show_message(message) {
    var status = document.getElementById('status');
    status.textContent = message;
    setTimeout(function () {
        status.textContent = '';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);