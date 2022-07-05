console.log('popup.js');
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log(msg);
  console.log('popup.js addListener');
  if (msg.command == 'run-complete') {
    document.querySelector('textarea').value = JSON.stringify(msg.data);
    document.querySelector('textarea').style.display = 'block';
  }
});

function createCommandObject() {

  var commandsArr = [];
  var commands = document.querySelectorAll('.commands-list .commands-item');
  for (var i = 0; i < commands.length; i++) {

    var itemObj = {};
    itemObj.type = commands[i].querySelector('select').value;
    itemObj.one = commands[i].querySelector('.value-1').value;
    itemObj.two = commands[i].querySelector('.value-2').value;

    commandsArr.push(itemObj);
  }
console.log(commandsArr);
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    var obj = commandsArr;
    console.log(activeTab, obj);
    chrome.tabs.sendMessage(activeTab.id, { command: "runCommands", data: obj });
    
    // chrome.runtime.sendMessage( { command: "runCommands", data: obj });

    chrome.runtime.sendMessage({greeting: "hello"});
  });
}
document.querySelector('.run-command').addEventListener('click', function () {
  createCommandObject();
});

document.querySelector('.new-command').addEventListener('click', function () {
  var newItem = `<div class="command-item">
    <select>
    <option value="wait">Wait</option>
    <option value="click">Click</option>
    <option value="enter">Enter value</option>
    <option value="save">Save value</option>
    </select>
    <input class="value-1" placeholder="200ms"/> 
    <input class="value-2" placeholder="Optional"/> 
    </div>`;
  document.querySelector('.commands-list').innerHTML += newItem;
});

// chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {

//   var activeTab = tabs[0];
//   var obj = {};


//   /* 
//   Example Object
//   [
//     {
//       "type": "wait",
//       "one": "200ms",
//       "two": "",
//     },
//     {
//       "type": "click",
//       "one": "body .button-one",
//       "two": "",
//     },
//     {
//       "type": "enter",
//       "one": "body .input-one",",
//       "two": "input text",
//     },
//     {
//       "type": "save",
//       "one": "body .input-two",",
//       "two": "",
//     },
//   ]
//    */

//   chrome.tabs.sendMessage(activeTab.id, { command: "runCommands", data: obj });
// });