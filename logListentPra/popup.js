const URL_YT = "www.youtube.com/watch?";
const URL_GITHUB_YTSUB = "https://uvsnag.github.io/voiceToText";

var intv = null
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'getlog-complete') {

    text

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var type = 'get-log';
      var activeTab = tabs[0];
      console.log('send')
      var msg = 1
      // intv = setInterval(() => {
  
        let sytTab = getTabYtSub(tabs, URL_GITHUB_YTSUB);
        chrome.tabs.executeScript({
          code: '(' + modifyDOM + ')();' 
      }, (results) => {
          console.log('Popup script:')
          console.log(results[0]);
      });
  
        chrome.tabs.sendMessage(activeTab.id, { command: "create-ele", data: {type: type, msg:msg} });
        msg++
      // }, 1000);
    });
  }
});



document.querySelector('.get-log').addEventListener('click', function () {

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let sytTab = getTabYtSub(tabs, URL_GITHUB_YTSUB);
    chrome.tabs.sendMessage(sytTab, { command: "get-log", data: {type: type, msg:msg} });
  });

  document.querySelector('.stop').addEventListener('click', function () {
    clearInterval(intv)
  })
});

function getTabYtSub(tabs, url) {
  for (let i = 0; i < tabs.length; i++) {
    let tab = tabs[i];
    if (tab.url && tab.url.includes(url)) {
      console.log("getTabYtSub:" + tab.url);
      return tabs[i];
    }
  }
  return null;
}