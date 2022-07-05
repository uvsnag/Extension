var inteSubYt = null;
var inteOpenSub = null;
var inteGetSub = null;

if (window.location.href.includes('https://uvsnag.github.io/reactjs_tool/?extension=true')) {
  console.log(window.location.href);
  var btnHome = document.querySelector('a');
  btnHome.click();
  setTimeout(() => {
    var ytSub = document.querySelector("[href='/youtube-sub']");
    ytSub.click();
  }, 200);

  console.log("New windows has been opened automatically!");
}


chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log(`1 message of ${msg.command} received!`);
  if (msg.command == 'send-sub') {
    sendSubProcess(msg);
  }
  if (msg.command == "send-media") {
    var inputId = document.querySelector('#txtSrcMedia');
    inputId.value = msg.data.videoId;
    document.querySelector('#btnExecute').click();
    chrome.runtime.sendMessage({ command: "send-sub-complete", data: "" });
    document.querySelector('#btnHide').click();
  }

});

function sendSubProcess(msg) {
  var inputId = document.querySelector('#txtSrcMedia');
  var inputSub = document.querySelector('#media-sub');
  inputId.value = msg.data.videoId;
  inputSub.value = msg.data.sub;

  setTimeout(() => {
    document.querySelector('#btnLoadSube').click();
    document.querySelector('#btnExecute').click();
    console.log("set infor completed!");

    chrome.runtime.sendMessage({ command: "send-sub-complete", data: "" });
  }, 300);
  document.querySelector('#btnHide').click();
}
