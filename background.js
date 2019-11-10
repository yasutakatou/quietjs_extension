var test_value;

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        test_value = request.value;
        return true;
    }
);
