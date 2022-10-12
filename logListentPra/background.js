var inteSubYt = null;
var inteOpenSub = null;
var inteGetSub = null;
const ID = 'id-log-ssnag'
var intv = null

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

    let slt = msg.selector
    if (!slt || slt.length == 0) {
      slt = '#ddd'
    }
    document.querySelector(slt).appendChild(para);
  } else if (msg.command == 'get-log') {
    intv = setInterval(() => {
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
    }, 50);
  } else if (msg.command == 'clear-inteval') {
    clearInterval(intv)
  }
});


