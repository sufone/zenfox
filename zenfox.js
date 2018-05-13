//theming
var base03 =  "#002b36";
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
  browser.storage.local.set({'currentTheme': theme});
  browser.theme.update(themes[theme]);
  console.log('theme:' + theme + 'applied');
}

////////////////////////////////////METHODS///////////////////////////////////

const date = new Date();
const hours = date.getHours();

async function timeMethod() {
  console.log('time method started')

  let hourStart = await browser.storage.local.get("hourStart");
  let hourStartProp = hourStart["hourStart"];
  let hourEnd = await browser.storage.local.get('hourEnd');
  let hourEndProp = hourEnd["hourEnd"];

  console.log('hourStart: '+hourStartProp);
  console.log('hourEnd: '+hourEndProp);

  if ((hours > hourStartProp) && (hours < hourEndProp)) {
      setTheme('light');
    } else {
      setTheme('dark');
    }

  console.log('<--- timeMethod complete');
  browser.alarms.clear('weatherMethod');
  browser.alarms.onAlarm.addListener(timeMethod);
  browser.alarms.create('timeMethod', {periodInMinutes: 5});
}

async function manualMethod() {
  const currentTheme = await browser.storage.local.get("currentTheme");
  const currentThemeProp = currentTheme["currentTheme"];

  switch (currentThemeProp) {
    case 'light': setTheme('dark'); break;
    case 'dark': setTheme('light'); break;
  }
}

async function weatherMethod() {
  console.log('weather method started')

  var lat = await browser.storage.local.get("lat");
  var latProp = lat["lat"];
  console.log('lat:'+latProp);
  var long = await browser.storage.local.get("long");
  var longProp = long["long"];
  console.log('long:'+longProp);
  var apiKey = await browser.storage.local.get('apiKey');
  var apiKeyProp = apiKey["apiKey"];
  console.log(apiKeyProp);

  var URL = 'http://api.openweathermap.org/data/2.5/weather?lat='+latProp+'&lon='+longProp+'&APPID='+apiKeyProp;
  console.log("weather URL: "+ URL);

  fetch(URL)
  .then(response => response.json())
  .then(data => {
    var cloudPercent = data.clouds.all;
    console.log('cloud %: ' + cloudPercent);

    if (cloudPercent < 50) {
      setTheme('light');
    } else {
      setTheme('dark');
    }

    browser.alarms.clear('timeMethod');
    browser.alarms.onAlarm.addListener(weatherMethod);
    browser.alarms.create('weatherMethod', {periodInMinutes: 5});
    console.log('<---weather method complete');
  });
}

/////////////////////////////ACTUAL WORK/////////////////////////////////////

async function accentHandler() {
    console.log('--->accent handler called');

    let accentColorLight = await browser.storage.local.get('accentColorForLight');
    let accentColorLightProp = accentColorLight["accentColorForLight"];

    let accentColorDark = await browser.storage.local.get('accentColorForDark');
    let accentColorDarkProp = accentColorDark["accentColorForDark"];

    console.log('light accent: ' + accentColorLightProp);
    console.log('dark accent: ' + accentColorDarkProp);

    themes['light'].colors["tab_line"] = accentColorLightProp;
    themes['light'].colors["tab_loading"] = accentColorLightProp;
    themes['light'].colors["icons_attention"] = accentColorLightProp;

    themes['dark'].colors["tab_line"] = accentColorDarkProp;
    themes['dark'].colors["tab_loading"] = accentColorDarkProp;
    themes['dark'].colors["icons_attention"] = accentColorDarkProp;

    console.log('<---accents set');
}

async function openSettings() {
  let initializedCheck = await browser.storage.local.get("initialized");
  let initializedCheckProp = initializedCheck["initialized"];

  if (initializedCheckProp != "yes") {
    browser.runtime.openOptionsPage();
  } 
  browser.storage.local.set({"initialized": "yes"});
  console.log('---openSettingsRun');
}

async function methodHandler() {
  console.log("--->method handler called");
  const method = await browser.storage.local.get("method");

  const methodProp = method["method"];
  console.log('method: '+methodProp);

  if (methodProp == "manual") {
    const currentTheme = await browser.storage.local.get("currentTheme"); 
    const currentThemeProp = currentTheme["currentTheme"]; //repeated from above… but too annoying

    console.log("manual method selected");
    browser.browserAction.setTitle({title: "Zen Fox: Manual"});
    browser.browserAction.onClicked.removeListener(openSettings); //otherwise, it would do both
    browser.browserAction.onClicked.addListener(manualMethod);
    //meant for browser startup, sets last used theme:
    switch (currentThemeProp) {
      case 'light':
        setTheme('light');
        break;
      default:
      case 'dark':
        setTheme('dark');
        break;
    };
  }
  else if (methodProp == "time") {
    console.log("time method selected");
    browser.browserAction.setTitle({title: "Zen Fox: Time"});
    timeMethod();

    browser.browserAction.onClicked.removeListener(manualMethod);
    browser.browserAction.onClicked.addListener(openSettings);
  }
  else if (methodProp == "weather") {
    console.log("weather method selected");
    browser.browserAction.setTitle({title: "Zen Fox: Weather"});
    weatherMethod();

    browser.browserAction.onClicked.removeListener(manualMethod);
    browser.browserAction.onClicked.addListener(openSettings);
  }
}

function apply() {
  console.log('---started apply');
  accentHandler();
  methodHandler();
}

apply();
openSettings();
browser.runtime.onMessage.addListener(apply);