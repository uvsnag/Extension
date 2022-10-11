var inteSubYt = null;
var inteOpenSub = null;
var inteGetSub = null;
const ID = 'id-log-ssnag'

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'create-ele') {
    exstElement = document.getElementById(ID)
    if (exstElement) {
      exstElement.remove()
    }
    console.log('data reci..:')
      console.log(msg.data)
    const para = document.createElement("p");
    para.setAttribute("id", ID);
    const node = document.createTextNode(msg.data);
    para.appendChild(node);
    document.querySelector(msg.selector).appendChild(para);;
  } else if (msg.command == 'get-log') {
    var ele = document.querySelector('#transcript-i')
    let text = ele.value
    if (!text) {
      text = ele.innerHTML
      if (!text) {
        text = ele.textContent
      }
    }
    console.log('text:')
    console.log(text)
    chrome.runtime.sendMessage({ command: "getlog-complete", data: text });
  }
});


