 document.addEventListener('DOMContentLoaded', function() {
     chrome.storage.local.get('type', function(data) {
         reset(data.type || 1);
     });
     var items = [0, 1, 2, 3, 4];
     for (var i = 0; i < items.length; i++) {
         var item = document.getElementById('item_' + i);
         item.addEventListener('click', function() {
             reset(type);
             chrome.storage.local.set({ 'type': type }, function() {});
         });
     }
 });

 function reset(type) {
     $("#item_0").removeClass("active");
     $("#item_1").removeClass("active");
     $("#item_2").removeClass("active");
     $("#item_3").removeClass("active");
     $("#item_" + type).addClass("active");
 }
