
chrome.runtime.onMessage.addListener((msg, sender, response) => {

  if (msg.command == "action-complete") {
      chrome.tabs.query({}, function (tabs) {
        console.log("action-complete")
      });
    }
});

document.querySelector('#gen-text').addEventListener('click', function () {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var select = document.getElementById("type");
    var type = select.options[select.selectedIndex].value;
    console.log(type);
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { command: "gen-text", data: {type:type} });
  });
});
