
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'export-comment') {
    var type = msg.data.type;


   var arrCmt= getComment();
   if(type!="none"){
     exportFile(arrCmt, type)
   }

    chrome.runtime.sendMessage({ command: "export-comment-complete", data: {} });
  }
});

function exportFile(arrCmt, fileType ) {
  let str = "";
  if (fileType == "csv") {
     str = arrayToStrCsv(arrCmt);
  }else if(fileType == "txt") {
    str = arrayToStrTxt(arrCmt);
  }
  const d = new Date();
  downloadBlob(str, `cmt_${d.getDate()}${d.getMonth()+1}_${d.getHours()}${d.getMinutes()}${d.getSeconds()}.${fileType}`, 'text/csv;charset=utf-8;')
}

function getComment() {
  let arrRes = [];
  document.querySelectorAll('.cwj9ozl2.tvmbv18p > ul')[0];
  var arrComment = document.querySelector('.cwj9ozl2.tvmbv18p > ul').querySelectorAll(':scope > li');
  console.log(`====post start====`);
  for (let i = 0; i < arrComment.length; i++) {
    ele = arrComment[i];
    var eleName = ele.querySelector('.d2edcug0.hpfvmrgz.qv66sw1b')
    var eleComment = ele.querySelector('.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql')

    var name = (eleName)?eleName.textContent:"";
    var comment =(eleComment)?eleComment.textContent:"";

    let cmt ={
      name:name,
      comment:comment
    }
    arrRes.push(cmt);
  }
  arrRes.forEach(element => {
    console.log(`${element.name}: ${element.comment}`);
  });
  return arrRes;
}

// var cmt = document.querySelector('.cwj9ozl2.tvmbv18p > ul').querySelectorAll(':scope > li')[0].querySelector('.tw6a2znq.sj5x9vvc.d1544ag0.cxgpxx05');

// var cmt = document.querySelector('.cwj9ozl2.tvmbv18p > ul').querySelectorAll(':scope > li')[0].querySelector('.tw6a2znq.sj5x9vvc.d1544ag0.cxgpxx05 span');

// var cmt = document.querySelector('.cwj9ozl2.tvmbv18p > ul').querySelectorAll(':scope > li')[0].querySelector('.d2edcug0.hpfvmrgz.qv66sw1b').textContent;
// var cmt = document.querySelector('.cwj9ozl2.tvmbv18p > ul').querySelectorAll(':scope > li')[0].querySelector('.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql').textContent;


function arrayToStrCsv(arr) {
  return arr.map(element =>
    `"${element.name}","${element.comment}"`
  ).join('\r\n');
}
function arrayToStrTxt(arr) {
  return arr.map(element =>
    `${element.name}: ${element.comment}\r\n`
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
