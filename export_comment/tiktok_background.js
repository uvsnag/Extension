
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'export-comment') {
    console.log('tiktok_background.js')
    var type = msg.data.type;
    
    let columnTopic = {
      seTopic: '.tiktok-3q30id-DivContentContainer',
      seTopic_comment: '.tiktok-16r0vzi-DivCommentItemContainer',
      seTopic_comment_name: '.tiktok-ku14zo-SpanUserNameText',
      seTopic_comment_cmt: '.tiktok-q9aj5z-PCommentText > span'
    }

    var arrCmt = getComment(columnTopic, 'TT');

    if(arrCmt.length == 0){
      let rowTopic = {
        seTopic: '.tiktok-1senhbu-DivLeftContainer',
        seTopic_comment: '.tiktok-16r0vzi-DivCommentItemContainer',
        seTopic_comment_name: '.tiktok-ku14zo-SpanUserNameText',
        seTopic_comment_cmt: '.tiktok-q9aj5z-PCommentText > span'
      }
      arrCmt = getComment(rowTopic, 'TT');
    }

    // document.querySelector('.tiktok-1senhbu-DivLeftContainer')
    // .querySelector('.tiktok-x4xlc7-DivCommentContainer')
    // .querySelectorAll('.tiktok-q9aj5z-PCommentText > span')


    if (type != "none") {
      exportFile(arrCmt, type)
    }
    chrome.runtime.sendMessage({ command: "export-comment-complete", data: {} });
  }
});

