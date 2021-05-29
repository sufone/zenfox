function saveOptions(e) {
  e.preventDefault();
  var lightTheme = document.querySelector("#lightTheme").value;
  var darkTheme = document.querySelector("#darkTheme").value;
  if ((lightTheme === "Solarized" || darkTheme === "Solarized") && lightTheme !== darkTheme) {
    document.querySelector("#solarizedWarning").style.color = "red"
  } else {
    document.querySelector("#solarizedWarning").style.color = "inherit"
  }

  browser.storage.local.set({
    "method": document.querySelector("#method").value,
    "hourStart": document.querySelector("#hourStart").value,
    "hourEnd": document.querySelector("#hourEnd").value,
    "lightTheme": lightTheme,
    "darkTheme": darkTheme,
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
    browser.runtime.sendMessage('update');
    console.log('message sent');
  });
}

async function restoreOptions() {
  var lightThemeSelector = document.querySelector("#lightTheme")
  var darkThemeSelector = document.querySelector("#darkTheme")
  var extensions = await browser.management.getAll();
  var themes = extensions.filter(ext => ext.type === "theme");

  console.info("Themes", themes)

  themes.forEach(t => {
    var opt = document.createElement("option");
    opt.value = t.id
    opt.textContent = t.name
    darkThemeSelector.appendChild(opt)
    lightThemeSelector.appendChild(opt.cloneNode(true))
  })

  var config = await browser.storage.local.get()
  document.querySelector("#method").value = config["method"] || 'manual';
  document.querySelector("#hourStart").value = config["hourStart"];
  document.querySelector("#hourEnd").value = config["hourEnd"];
  document.querySelector("#apiKey").value = config["apiKey"];
  document.querySelector("#lat").value = config["lat"];
  document.querySelector("#long").value = config["long"]

  lightThemeSelector.value = config["lightTheme"] || 'firefox-compact-light@mozilla.org';
  darkThemeSelector.value = config["darkTheme"] || 'firefox-compact-dark@mozilla.org';
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);