
chrome.runtime.onMessage.addListener((msg, sender, response) => {

  if (msg.command == "disable-image-complete") {
      chrome.tabs.query({}, function (tabs) {
        console.log("disable-image-complete")
      });
    }
});



document.querySelector('#disable-image').addEventListener('click', function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    
    var select = document.getElementById("type");
    
    var type = select.options[select.selectedIndex].value;
    console.log(type);

    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { command: "disable-image", data: {type:type} });
  });
});
