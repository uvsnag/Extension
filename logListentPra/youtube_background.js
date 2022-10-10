var inteSubYt = null;
var inteOpenSub = null;
var inteGetSub = null;



chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log("1 message received!");
  var startTime = performance.now()
  if (msg.command == 'get-sub') {
    getSubProcess(msg);
  }
  var endTime = performance.now()
  console.log(`completed in: ${(endTime - startTime) / 1000} seconds!`);
});

function sendSubProcess(msg) {
  console.log(msg.data);

}

function getSubProcess(msg) {

  var type = msg.data;
  if (type == 'open-media') {
    var crrurl = window.location.href;
    var videoIdStr = crrurl.substring(crrurl.lastIndexOf('=') + 1, crrurl.length).trim();

    chrome.runtime.sendMessage({ command: "open-media-complete", data: { videoId: videoIdStr } });

  } else {
    var getStrSubYt = new Promise((resolve, reject) => {

      const timeOutStrSubYt = setTimeout(() => {
        clearInterval(inteGetSub);
        console.log("getStrSubYt() timeout!");
        console.log("interval inteGetSub:" + inteGetSub + " destroyed!");
        reject();
      }, 5000);

      let strResult = "";
      var arr = [];
      inteGetSub = setInterval(() => {
        if (document.querySelector('#segments-container')) {
          let pr = document.querySelector('#segments-container');
          if (pr.querySelectorAll(":scope > ytd-transcript-segment-renderer > .segment.style-scope.ytd-transcript-segment-renderer")) {
            clearInterval(inteGetSub);

            var parentEle = document.querySelector('#segments-container');
            var childEls = parentEle.querySelectorAll(":scope > ytd-transcript-segment-renderer > .segment.style-scope.ytd-transcript-segment-renderer");
            for (let i = 0; i < childEls.length; i++) {
              var obj = {};
              let ele = childEls[i];
              //
              var timeEle = ele.querySelector(":scope > .segment-start-offset > .segment-timestamp");
              obj.time = timeEle.innerHTML;
              //
              var StrEle = ele.querySelector(":scope > yt-formatted-string.segment-text");
              obj.stringSub = StrEle.innerHTML;
              arr.push(obj);
            }
            for (let i = 0; i < arr.length; i++) {
              var obj = arr[i];
              strResult += obj.time.trim() + '\n' + obj.stringSub.trim().replaceAll('\n', ' ') + '\n';
            }
            resolve(strResult.trim());
            clearTimeout(timeOutStrSubYt);
            console.log("timeout timeOutStrSubYt:" + timeOutStrSubYt + " destroyed!");
            console.log("interval inteGetSub:" + inteGetSub + " destroyed!");
          }
        }
      }, 100);
    });

    var openSub = new Promise((resolve, reject) => {
      const timeOutOpenSub = setTimeout(() => {
        clearInterval(inteOpenSub);
        console.log("openSub() timeout!");
        console.log("interval Open sub:" + inteOpenSub + " destroyed!");
        reject();
      }, 5000);

      var parent1 = document.querySelector("ytd-menu-renderer.style-scope.ytd-watch-metadata");
      var parent2 = parent1.querySelector(":scope > yt-icon-button#button.dropdown-trigger.style-scope.ytd-menu-renderer");
      var btnShow = parent2.querySelector(":scope > button#button.style-scope.yt-icon-button");
      btnShow.click();
      inteOpenSub = setInterval(() => {
        if (document.querySelectorAll("ytd-menu-service-item-renderer.style-scope.ytd-menu-popup-renderer")[1]) {
          clearInterval(inteOpenSub);
          clearTimeout(timeOutOpenSub);
          var showSubButton = document.querySelectorAll("ytd-menu-service-item-renderer.style-scope.ytd-menu-popup-renderer")[1];
          showSubButton.click();
          console.log("openSub() completed!");
          console.log("interval Open sub:" + inteOpenSub + " destroyed!");
          console.log("timeout timeOutOpenSub:" + timeOutOpenSub + " destroyed!");

          resolve();
        }
      }, 100);

    });

    openSub.then(() => {
      return getStrSubYt;
    }).then(function (strResult) {

      console.log("Data length:" + strResult.length);
      switch (type) {
        case 'sub-yt':
          chrome.runtime.sendMessage({ command: "get-ytsub-complete", data: strResult });
          break;
        case 'open-ytsub':
          var crrurl = window.location.href;
          var videoIdStr = crrurl.substring(crrurl.lastIndexOf('=') + 1, crrurl.length).trim();

          chrome.runtime.sendMessage({ command: "open-ytsub-complete", data: { sub: strResult, videoId: videoIdStr } });

          break;
        default:
          break;
      }
      console.log("1 message has been sent from background!");

    });
  }

}

