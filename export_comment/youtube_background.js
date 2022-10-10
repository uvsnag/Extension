
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'export-comment') {
    console.log('youtube_background.js')
    var type = msg.data.type;

    let nomalTopic = {
      seTopic: '.ytd-comments > #contents',
      seTopic_comment: ':scope > ytd-comment-thread-renderer',
      seTopic_comment_name: '#author-text > .style-scope.ytd-comment-renderer',
      seTopic_comment_cmt: '#content-text'
    }
    var arrCmt = getComment(nomalTopic, "YT");

    // chua set cai dat
    if (arrCmt.length == 0) {
      let videoLiveTopic = {
        seTopic: 'yt-live-chat-app #item-offset #items',
        seTopic_comment: 'yt-live-chat-text-message-renderer',
        seTopic_comment_name: '#author-name',
        seTopic_comment_cmt: '#message'
      }
      arrCmt = getComment(videoLiveTopic, 'YT');
    }

    if (type != "none") {
      exportFile(arrCmt, type)
    }
    chrome.runtime.sendMessage({ command: "export-comment-complete", data: {} });
  }
});

