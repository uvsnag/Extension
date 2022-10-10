var inteSubYt = null;
var inteOpenSub = null;
var inteGetSub = null;
const ID ='id-log-ssnag'
const url = 'https://uvsnag.github.io/voiceToText'

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'create-ele') {
    exstElement = document.getElementById(ID)
    if(exstElement){
      exstElement.remove()
    }
    const para = document.createElement("p");
    para.setAttribute("id",ID);
    const node = document.createTextNode("This is a paragraph."+msg.data.msg);

    para.appendChild(node);
    document.querySelector(".input_and_continue.row").appendChild(para);;
    chrome.runtime.sendMessage({ command: "getlog-complete", data: 'OK' });
  }else if(msg.command == 'get-log'){
    const text = document.querySelector('.content-log')
    chrome.runtime.sendMessage({ command: "getlog-complete", data: text });
  }
});


