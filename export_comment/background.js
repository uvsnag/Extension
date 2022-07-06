
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  // console.log("1 message received!");
  if (msg.command == 'export-comment') {
    var type = msg.data.type;


   var arrCmt= getComment();
    if (type == "csv") {
      let str = arrayToStrCsv(arrCmt);
      // console.log(str);
      const d = new Date();
      downloadBlob(str, `cmt_${d.getDate()+1}${d.getMonth()}_${d.getHours()}${d.getMinutes()}${d.getSeconds()}.csv`, 'text/csv;charset=utf-8;')
    } else {
    }

    chrome.runtime.sendMessage({ command: "export-comment-complete", data: {} });
  }
});

function getComment() {
  let arrRes = [];
  document.querySelectorAll('.cwj9ozl2.tvmbv18p > ul')[0];
  var arrComment = document.querySelector('.cwj9ozl2.tvmbv18p > ul').querySelectorAll(':scope > li');
  console.log(`====post start====`);
  for (let i = 0; i < arrComment.length; i++) {
    ele = arrComment[i];
    var name = ele.querySelector('.d2edcug0.hpfvmrgz.qv66sw1b').textContent;
    var comment = ele.querySelector('.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql').textContent;

    let cmt ={
      name:name,
      comment:comment
    }
    arrRes.push(cmt);
    // console.log(`${name}: ${comment}`);
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
