
function saveOptions(e) {
	
  console.log('save called');
  e.preventDefault();
  console.log('save step 2');
  browser.storage.local.set({
    "method": document.querySelector("#method").value
  });
  console.log('save complete');
}

function restoreOptions() {
  console.log('restore start');

  function setCurrentChoice(result) {
    document.querySelector("#method").value = result.color || "blue";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("method");
  getting.then(setCurrentChoice, onError);

  console.log('restore complete');
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);