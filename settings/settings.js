/*
function saveOptions(e) {

  console.log('save called');
  e.preventDefault();
  browser.storage.local.set({
    "accentColorForDark": document.querySelector("#accentColorForDark").value,
  });
  console.log('save complete');
}

function restoreOptions() {
  console.log('restore start');

  function setCurrentChoice(result) {
    document.querySelector("#accentColorForDark").value = result["accentColorForDark"];
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let accentColorForDark = browser.storage.local.get("accentColorForDark");
  accentColorForDark.then(setCurrentChoice, onError);

  console.log('restore complete');
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);


////////////////////////////////////////////////////////////////////////////////////////

function saveOptions() {
  /* to be called when save button is pressed on settings page //
  var accentColorForDark = document.querySelector("#accentColorForDark").value;
  browser.storage.local.set({
    "accentColorForDark": accentColorForDark
  });
}

functions loadOptions() {
  let gettingItem = browser.storage.local.get();
  gettingItem.then(onGot, onError);
}

*/
///////////////2nd try////////////////////////////
function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    "method": document.querySelector("#method").value,
    "hourStart": document.querySelector("#hourStart").value,
    "hourEnd": document.querySelector("#hourEnd").value,
    "accentColorForDark": document.querySelector("#accentColorForDark").value,
    "accentColorForLight": document.querySelector("#accentColorForLight").value,
    "apiKey": document.querySelector("#apiKey").value,
    "lat": document.querySelector("#lat").value,
    "long": document.querySelector("#long").value
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#method").value = result["method"];
    document.querySelector("#hourStart").value = result["hourStart"];
    document.querySelector("#hourEnd").value = result["hourEnd"];
    document.querySelector("#accentColorForDark").value = result["accentColorForDark"];
    document.querySelector("#accentColorForLight").value = result["accentColorForLight"];
    document.querySelector("#apiKey").value = result["apiKey"];
    document.querySelector("#lat").value = result["lat"];
    document.querySelector("#long").value = result["long"]
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get();
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);