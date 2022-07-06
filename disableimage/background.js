const ARR_TAG_DIS = ['img', 'svg', 'title', 'small', '.favicon', 'image'];
const ARR_TAG_COLOR = ['a', 'p', 'span', 'div', 'pre', 'button', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  , 'strong', 'i', 'label', '.btn', '.fa-solid', '.fa', '.fa-light'];

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // console.log("1 message received!");
  if (msg.command == 'disable-image') {
    var type = msg.data.type;
    if (type == "none") {
      disableAllTag();
    } else if (type == "icon") {
      let arrIcon = ['.fa-solid', '.fa', '.fa-light']
      arrIcon.forEach(element => {
        removeTag(element);
      });
    } else if (type == "image") {
      ARR_TAG_DIS.forEach(element => {
        removeTag(element);
      });
    } else {
      removeTag(type);
    }

    chrome.runtime.sendMessage({ command: "disable-image-complete", data: {} });
  }
});

function disableAllTag() {


  console.log(`Disable`);
  ARR_TAG_DIS.forEach(element => {
    removeTag(element);
  });

  console.log(`Change color`);
  ARR_TAG_COLOR.forEach(element => {
    removeTagColor(element);
  });
}

function removeTag(tag) {
  var arr = document.querySelectorAll(tag);
  let length = arr.length;
  for (var i = length; i-- > 0;) {
    arr[i].style.setProperty("background-color", "", "important")
    arr[i].parentNode.removeChild(arr[i]);
  }
  console.log(`${length} ${tag}`);
}

function removeTagColor(tag) {
  var arr = document.querySelectorAll(tag);

  let length = arr.length;
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    element.style.setProperty("background-color", "#FFF", "important")
    element.style.setProperty("color", "#000000", "important")
    element.style.setProperty("font-weight", "400", "important")

  }
  console.log(`${length} ${tag}`);
}


