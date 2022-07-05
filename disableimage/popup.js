const URL_YT = "www.youtube.com/watch?";
const URL_GITHUB_YTSUB = "https://uvsnag.github.io/youtube-sub";
const URL_GITHUB_YTSUB_AUTO_OPEN = 'https://uvsnag.github.io/reactjs_tool?extension=true';
const URL_GITHUB_TOOL = "https://uvsnag.github.io/reactjs_tool";

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
