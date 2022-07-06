
chrome.runtime.onMessage.addListener((msg, sender, response) => {

  if (msg.command == "export-comment-complete") {
      chrome.tabs.query({}, function (tabs) {
        console.log("export-comment-complete")
      });
    }
});



document.querySelector('#export-comment').addEventListener('click', function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    
    var select = document.getElementById("type");
    var type = select.options[select.selectedIndex].value;
    console.log(type);

    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { command: "export-comment", data: {type:type} });
  });
});
