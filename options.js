function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    //color: document.querySelector("#color").value
    hourStart: document.querySelector("#hourStart").value,
    hourEnd: document.querySelector("#hourEnd").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#hourStart").value = result.hourStart || 6;
    document.querySelector("#hourEnd").value = result.hourEnd || 18;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting1 = browser.storage.local.get("hourStart");
  getting1.then(setCurrentChoice, onError);
  var getting2 = browser.storage.local.get("hourEnd");
  getting2.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);