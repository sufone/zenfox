function saveOptions(e) {

  console.log('save called');
  e.preventDefault();
  console.log('save step 2');
  browser.storage.local.set({
    "method": document.querySelector("#method").value,
    "hourStart": document.querySelector("#hourStart").value,
    "hourEnd": document.querySelector("#hourEnd").value,
    "accentColorForDark": document.querySelector("#accentColorForDark").value,
    "accentColorForLight": document.querySelector("#accentColorForLight").value,
    "apiKey": document.querySelector("#apiKey").value
  });
  console.log('save complete');
}

function restoreOptions() {
  console.log('restore start');

  function setCurrentChoice(result) {
    document.querySelector("#method").value = result["method"] || "manual";
    document.querySelector("#hourStart").value = result["hourStart"] || 6;
    document.querySelector("#hourEnd").value = result["hourEnd"] || 18;
    document.querySelector("#accentColorForDark").value = result["accentColorForDark"] || "cyan";
    document.querySelector("#accentColorForLight").value = result["accentColorForLight"] || "magenta";
    document.querySelector("#apiKey").value = result["apiKey"]
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let method = browser.storage.local.get("method");
  method.then(setCurrentChoice, onError);
  let hourStart = browser.storage.local.get("hourStart");
  hourStart.then(setCurrentChoice, onError);
  let hourEnd = browser.storage.local.get("hourEnd");
  hourEnd.then(setCurrentChoice, onError);
  let accentColorForDark = browser.storage.local.get("accentColorForDark");
  accentColorForDark.then(setCurrentChoice, onError);
  let accentColorForLight = browser.storage.local.get("accentColorForLight");
  accentColorForLight.then(setCurrentChoice, onError);
  let apiKey = browser.storage.local.get("apiKey");
  apiKey.then(setCurrentChoice, onError);

  console.log('restore complete');
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);