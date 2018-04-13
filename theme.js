//solarized theme
var base03 = "#002b36";
var base02 =  "#073642";
var base01 =  "#586e75";
var base00 =  "#657b83";
var base0 =   "#839496";
var base1 =   "#93a1a1";
var base2 =   "#eee8d5";
var base3 =   "#fdf6e3";
var yellow =  "#b58900";
var orange =  "#cb4b16";
var red =     "#dc322f";
var magenta = "#d33682";
var violet =  "#6c71c4";
var blue =    "#268bd2";
var cyan =    "#2aa198";
var green =   "#859900";

var currentTheme = '';

const themes = {
  'light': {
    colors: {
      "accentcolor": base3,
      "textcolor": base01,
      "toolbar": base2,
      "toolbar_text": base00,
      "toolbar_field": base3,
      "toolbar_field_text": base01,
      "tab_line": magenta,
      "popup": base3,
      "popup_text": base01,
      "tab_loading": magenta,
      "icons": base00,
      "icons_attention": magenta,
      "toolbar_vertical_separator": base3,
      "toolbar_field_separator": base2
    },
  },
  'dark': {
    colors: {
      "accentcolor": base03,
      "textcolor": base1,
      "toolbar": base02,
      "toolbar_text": base0,
      "toolbar_field": base03,
      "toolbar_field_text": base1,
      "tab_line": cyan,
      "popup": base03,
      "popup_text": base1,
      "tab_loading": cyan,
      "icons": base0,
      "icons_attention": cyan,
      "toolbar_vertical_separator": base02,
      "toolbar_field_separator": base03
    }, 
  }
};

function setTheme(theme) {
  if (currentTheme === theme) {
    // No point in changing the theme if it has already been set.
    return;
  }
  currentTheme = theme;
  browser.theme.update(themes[theme]);
}

function applyLight() {
  setTheme('light');
  console.log('light theme applied')
}
function applyDark() {
  setTheme('dark');
  console.log('dark theme applied');
}

///////////////////////////////////////////////////////////////////////////////

const date = new Date();
const hours = date.getHours();

function timeMethod() {
  if ((hours > 6) && (hours < 18)) {
      applyLight();
    } else {
      applyDark();
    }
    console.log('timeMethod used');
    browser.alarms.onAlarm.addListener(timeMethod);
    browser.alarms.create('timeMethod', {periodInMinutes: 5});
}

var i = 1;
function manualMethod() {
  if (i % 2 === 0) {
    applyLight();
    i++;
    console.log("light theme applied, i iterated to:" + i);
  } else {
    applyDark();
    i++;
    console.log("dark theme applied, i iterated to:" + i);
  }
}

function weatherMethod() {
  fetch('http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&APPID=8c0be18164812b760e6774e9bfee19e9')
  .then(response => response.json())
  .then(data => {
    var cloudPercent = data.clouds.all;
    console.log('cloud %: ' + cloudPercent);

    if (cloudPercent < 50) {
      applyDark();
    } else {
      applyLight();
    }
    console.log('weather method complete');
  });

  
}

//////////////////////////////////////////////////////////////////

async function methodHandler() {
  console.log("method handler called");
  let method = await browser.storage.local.get("method");

  function accentHandler() {
    console.log('accent handler called');
    var accentColorLight = browser.storage.local.get('accentColorForLight');
    var accentColorDark = browser.storage.local.get('accentColorForLight');

    for (let i = 0; i < themes['light'].colors.length; i++) {
      if (themes['light'].colors[i] === magenta) {
        themes['light'].colors[i] = accentColorLight;
      }
    }
    for (let i = 0; i < themes['dark'].colors.length; i++) {
      if (themes['dark'].colors[i] === cyan) {
        themes['dark'].colors[i] = accentColorDark;
      }
    }  
  }
  accentHandler();

  
  let methodProp = method["method"];
  console.log(methodProp);

  if (methodProp == "manual") {
    console.log("manual method selected");
    browser.browserAction.onClicked.addListener(manualMethod);
  } else if (methodProp == "time") {
    console.log("time method selected");
    timeMethod()
  } else if (methodProp == "weather") {
    console.log("weather method selected");
    weatherMethod();
  } else if (methodProp == "site") {

  }

}

applyLight();
methodHandler();

function reapply() {
  console.log('started reapply');
  methodHandler();
}

browser.storage.onChanged.addListener(reapply);