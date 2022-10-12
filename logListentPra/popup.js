// const URL_DENSTINY_SITE = "https://uvsnag.github.io/voiceToText";
const URL_DENSTINY_SITE = "http://localhost:3000/voiceToText";
document.querySelector('#selector').value = '#ddd id="ddd"'
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'getlog-complete') {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      var selector = document.getElementById('selector').value.trim()
      console.log('selector:')
      console.log(selector)
      chrome.tabs.sendMessage(activeTab.id, { command: "create-ele", data: msg.data, selector:selector });
    });
  }
});


document.querySelector('#get-log').addEventListener('click', function () {
  chrome.tabs.query({  }, function (tabs) {
    let sytTab = getTabYtSub(tabs, URL_DENSTINY_SITE);
    // intv = setInterval(() => {
      console.log('sending---')
      chrome.tabs.sendMessage(sytTab.id, { command: "get-log" });
    // }, 200);
  });
});
// document.querySelector('#stop').addEventListener('click', function () {
//   // clearInterval(intv)
//   let sytTab = getTabYtSub(tabs, URL_DENSTINY_SITE);
//   chrome.tabs.sendMessage(sytTab.id, { command: "clear-inteval" });
// });

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