
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  console.log('facebook_background.js')
  if (msg.command == 'export-comment') {
    var type = msg.data.type;

    let firstTopic = {
      seTopic: '.cwj9ozl2.tvmbv18p > ul',
      seTopic_comment: ':scope > li',
      seTopic_comment_name: '.d2edcug0.hpfvmrgz.qv66sw1b',
      seTopic_comment_cmt: '.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql'
    }
    var arrCmt = getComment(firstTopic, 'FB');

    if(arrCmt.length==0){

      let videoDetailTopic = {
        seTopic: '.l9j0dhe7.tkr6xdv7.buofh1pr.eg9m0zos >ul',
        seTopic_comment: ':scope > li',
        seTopic_comment_name: '.nc684nl6 > .qu0x051f',
        seTopic_comment_cmt: '.hcukyx3x.c1et5uql'
      }
      arrCmt = getComment(videoDetailTopic, 'FB');

      //
      if(arrCmt.length==0){
        let videoLiveTopic = {
          seTopic: '.rq0escxv.j83agx80.cbu4d94t.eg9m0zos.fh5enmmv.k4urcfbm',
          seTopic_comment: '.tw6a2znq.sj5x9vvc.d1544ag0.cxgpxx05',
          seTopic_comment_name: '.pq6dq46d > .d2edcug0',
          seTopic_comment_cmt: '.hcukyx3x.c1et5uql'
        }
        arrCmt = getComment(videoLiveTopic, 'FB');
      }
    //  document.querySelector('.l9j0dhe7.tkr6xdv7.buofh1pr.eg9m0zos > ul').querySelector(':scope > li').querySelectorAll('.hcukyx3x.c1et5uql');

    }

    if (type != "none") {
      exportFile(arrCmt, type)
    }

    chrome.runtime.sendMessage({ command: "export-comment-complete", data: {} });
  }
});






