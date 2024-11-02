
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log("1 message received!");
  console.log(msg);
  if (msg.command == 'gen-text') {
    var type = msg.data.type;
    if (type == "shrt_Vie_quiz1") {
      shrt_Vie_quiz1();
    } else if (type == "shrt_eng_quiz1") {
      shrt_eng_quiz1();
    } else {
      console.log('Not defined yet')
    }
    chrome.runtime.sendMessage({ command: "action-complete", data: {} });
  }
});

function shrt_eng_quiz1() {
  let fileNm = document.querySelector('#original-filename').innerHTML;
  console.log(fileNm)
  let part = fileNm.match(/#(\d+)/);
  console.log(part)
  let title = `Spot The Difference #spotthedifference  #findthedifference #puzzle #quiz`
  // let title = `Spot The Difference P${part[1]} #spotthedifference  #findthedifference #puzzle #quiz`
  let descr = `Spot The Difference  #spotthedifference  #findthedifference #puzzle #quiz #spotthedifferencegame #quiztime #quizgames #quizgame #puzzlegame  #puzzles #braintest #braingames #braingame Quiz,Spot The Difference,puzzles,braingame,brain game,quiz game,puzzle game,brain test,spot the differences,can you spot the difference`
  let tag = 'quiz,Spot The Difference,puzzles,braingame,brain game,quiz game,pluzzle game,brain test,spot the differences,can you spot the difference,puzzle,find the difference'

  // let titleEle = document.querySelector('.title ytcp-social-suggestion-input');
  let titleEle = document.querySelector('.title #textbox');
  // let descEl = document.querySelector('.description ytcp-social-suggestion-input')
  let descEl = document.querySelector('.description  #textbox')
  setTimeout(() => {
    titleEle.focus();
    titleEle.innerText = title;
    titleEle.innerHTML = title;
    titleEle.value = title;
    titleEle.blur();

    descEl.focus();
    descEl.innerText = descr;
    descEl.innerHTML = descr;
    descEl.value = descr;
    descEl.blur();
  }, 1000);
  // navigator.clipboard.writeText(descr)
  // navigator.clipboard.readText()


  document.querySelector('.ytcp-video-metadata-playlists #right-icon').click()
  setTimeout(() => {
    document.querySelector('ytcp-checkbox-lit#checkbox-1').click()
    document.querySelector('tp-yt-paper-dialog#dialog .ytcp-playlist-dialog button.ytcp-button-shape-impl--size-m[aria-label="Xong"]').click()
  }, 200);
  return
  document.querySelector(`tp-yt-paper-radio-button[name='VIDEO_MADE_FOR_KIDS_NOT_MFK']`).click()
  let fieldTag = document.querySelector('#tags-container .chip-and-bar #text-input')
  fieldTag.value = tag
  enter(fieldTag)
}
function shrt_Vie_quiz1() {
}

function enter(fieldTag) {
  fieldTag.focus(); // Focus on the input field
  let enterEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    keyCode: 13, // 13 is the keycode for Enter
    code: 'Enter',
    which: 13,
    bubbles: true, // Bubbles the event up through the DOM
  });

  fieldTag.dispatchEvent(enterEvent); // Dispatch the Enter key event

}

