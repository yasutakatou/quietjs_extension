
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.message);
    let sendList = request.message.split(/,/);
    for (let i = 0; i < sendList.length; i++) {
      let sends = sendList[i].split(/:/);
      if (location.href.indexOf(sends[0]) != -1) {
        var inputs = document.querySelectorAll(sends[1]);
        inputs[0].value = sends[2];
      }
    }
  }
);
