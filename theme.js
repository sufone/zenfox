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
  'day': {
    colors: {
      "accentcolor": "tomato",
      "textcolor": "white",
      "toolbar": "#444",
      "toolbar_text": "lightgray",
      "toolbar_field": "black",
      "toolbar_field_text": "white"
    }
  },
  'night': {
    colors: {
      "accentcolor": "tomato",
      "textcolor": "white",
      "toolbar": "#444",
      "toolbar_text": "lightgray",
      "toolbar_field": "black",
      "toolbar_field_text": "white"
    }
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

function checkTime() {
  let date = new Date();
  let hours = date.getHours();
  // Will set the sun theme between 6am and 6pm.
  if ((hours > 6) && (hours < 18)) {
    setTheme('day');
  } else {
    setTheme('night');
  }
}

// On start up, check the time to see what theme to show.
checkTime();

// Set up an alarm to check this regularly.
browser.alarms.onAlarm.addListener(checkTime);
browser.alarms.create('checkTime', {periodInMinutes: 5});