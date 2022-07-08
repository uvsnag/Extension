
function getComment(topic, web) {

    let arrRes = [];
  
    if (document.querySelector(topic.seTopic)) {
      var arrComment = document.querySelector(topic.seTopic).querySelectorAll(topic.seTopic_comment);
      console.log(`====post start====`);
      for (let i = 0; i < arrComment.length; i++) {
        ele = arrComment[i];
        var eleName = ele.querySelector(topic.seTopic_comment_name)
        var eleComment = ele.querySelector(topic.seTopic_comment_cmt)

        let cmtRes =''
        if(eleComment){
            cmtRes = eleComment.textContent;

            if(!cmtRes){
                eleComment= ele.querySelector(topic.seTopic_comment_cmt).querySelectorAll(':scope > .yt-formatted-string')
                cmtRes =''
                for (let index = 0; index < eleComment.length; index++) {
                    const element = eleComment[index];
                    cmtRes+=element.textContent;
                }
                cmtRes= cmtRes.trim()
            }

        }

  
        var name = (eleName) ? eleName.textContent.trim() : "";
        var comment = cmtRes;
  
        let cmt = {
          name: name,
          comment: comment
        }
        if(`${cmt.name}${cmt.comment}`.trim().length!=0){

            arrRes.push(cmt);
        }
      }
      arrRes.forEach(element => {
        console.log(`${element.name}: ${element.comment}`);
      });
    }
    return arrRes;
  }

function exportFile(arrCmt, fileType) {
    let str = "";
    if (fileType == "csv") {
        str = arrayToStrCsv(arrCmt);
    } else if (fileType == "txt") {
        str = arrayToStrTxt(arrCmt);
    }
    const d = new Date();
    downloadBlob(str, `cmt_${d.getDate()}${d.getMonth() + 1}_${d.getHours()}${d.getMinutes()}${d.getSeconds()}.${fileType}`, 'text/csv;charset=utf-8;')
}
function arrayToStrCsv(arr) {
    return arr.map(element =>
        `"${element.name}","${element.comment}"`
    ).join('\r\n');
}
function arrayToStrTxt(arr) {
    return arr.map(element =>
        `<${element.name}>: ${element.comment}\r\n`
    ).join('\r\n');
}

function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);

    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
}