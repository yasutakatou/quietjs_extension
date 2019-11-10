document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('start').addEventListener('click', startReceive);
});

function startReceive() {
  console.log("start");
  let inputs = document.getElementById("start");
  inputs.innerText = "Started..";
  inputs.disabled = true;
  onQuietReady();
}

var content = new ArrayBuffer(0);

Quiet.init({
    profilesPrefix: "/",
    memoryInitializerPrefix: "/",
    libfecPrefix: "/"
});

function onReceive(recvPayload) {
  content = Quiet.mergeab(content, recvPayload);
  let texts = Quiet.ab2str(content);
  console.log(texts);
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": texts});
  });
};

function onReceiverCreateFail(reason) {
  console.log("failed to create quiet receiver: " + reason);
};

function onReceiveFail(num_fails) {
  console.log("We didn't quite get that. It looks like you tried to transmit something. You may need to move the transmitter closer to the receiver and set the volume to 50%.");
};

function onQuietReady() {
  Quiet.receiver({profile: 'ultrasonic-experimental',
    onReceive: onReceive,
    onCreateFail: onReceiverCreateFail,
    onReceiveFail: onReceiveFail
  });
};

function onQuietFail(reason) {
  console.log("quiet failed to initialize: " + reason);
};

function onDOMLoad() {
  Quiet.addReadyCallback(onQuietReady, onQuietFail);
};
