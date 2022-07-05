chrome.runtime.onMessageExternal.addListener((msg, sender, response)=>{
    console.log('abagr');
    console.log(msg);
    if (msg.name == "fetchWords") {

    }
})