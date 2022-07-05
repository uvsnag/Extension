const URL_YT = "www.youtube.com/watch?";
const URL_GITHUB_YTSUB = "https://uvsnag.github.io/youtube-sub";
const URL_GITHUB_YTSUB_AUTO_OPEN = 'https://uvsnag.github.io/reactjs_tool?extension=true';
const URL_GITHUB_TOOL = "https://uvsnag.github.io/reactjs_tool";

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'get-ytsub-complete') {

    document.querySelector('textarea').value = msg.data;
    document.querySelector('textarea').style.display = 'block';
    document.querySelector('#coppy').style.display = 'block';
    navigator.clipboard.writeText(msg.data);
  }

  if (msg.command == 'open-media-complete') {
    sendDataSub("send-media", msg)

  }


  if (msg.command == 'open-ytsub-complete') {
    sendDataSub("send-sub", msg)

  }

  if (msg.command == "send-sub-complete") {
    chrome.tabs.query({}, function (tabs) {
      console.log("send-sub-complete")
      let sytTab = getTabYtSub(tabs, URL_GITHUB_YTSUB);
      chrome.tabs.update(sytTab.id, { highlighted: true });
    });
  }
});


function sendDataSub(command, msg) {
  let intv = null;
  let count = 0;
  console.log("process : open-ytsub-complete")
  let promiseSetData = new Promise((resolve, reject) => {
    console.log("promiseSetData")
    intv = setInterval(() => {
      count++;
      if (count > 40) {
        clearInterval(intv);
        console.log("Can not set data: timeout!!")
      }
      chrome.tabs.query({}, function (tabs) {
        let sytTab = getTabYtSub(tabs, URL_GITHUB_YTSUB);
        if (sytTab) {
          chrome.tabs.sendMessage(sytTab.id, { command: command, data: msg.data });
          resolve();
        }
      })
    }, 200);
  });

  promiseSetData.then(() => {
    clearInterval(intv);
    console.log("Set data successfully!!")
  })
}
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

document.querySelector('.get-sub').addEventListener('click', function () {

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var type = 'sub-yt';
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { command: "get-sub", data: type });
  });

});

document.querySelector('#open-ytsub').addEventListener('click', function () {

  sendBackground("get-sub", 'open-ytsub');
});

document.querySelector('#open-media').addEventListener('click', function () {

  sendBackground("get-sub", 'open-media');
});

function sendBackground(command, type) {
  chrome.tabs.query({}, function (tabs) {
    let sytTab = getTabYtSub(tabs, URL_GITHUB_YTSUB);
    if (!sytTab) {

      chrome.tabs.create({
        active: false,
        url: URL_GITHUB_YTSUB_AUTO_OPEN
      });

    }
  });

  chrome.tabs.query({}, function (tabs) {
    // var type = 'open-media';
    let sytTab = getTabYtSub(tabs, URL_YT);
    chrome.tabs.sendMessage(sytTab.id, { command: command, data: type });
  });
}

document.querySelector('#coppy').addEventListener('click', function () {
  let val = document.querySelector('textarea').value;
  navigator.clipboard.writeText(val);
});
