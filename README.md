# Zen Fox

**Maintainers Wanted** - Sadly I can't keep up maintenance, even though it's light. Let me know if you're interested and we can work out transferring ownership here and the Firefox add-ons store, or just fork and go your own way. 

As we spend more and more of our lives computing, and more and more of our computing is done on the browser, our browser being the awesome Firefox — it must be themed appropriately for its heavy duty.

Zen Fox uses the stunning Solarized Theme, ported to Firefox using it's latest APIs. That means browser menus like the hamburger and overflow are themed to suit the rest of your browser.

**Methods**:

Choose from 4 different methods to switch between Dark & Light Themes:

* Manual — toolbar button to switch themes upon press
* System — automatically changes theme based on OS dark/light theme
* Time — change themes automatically at times of your choice
* Weather — update theme based on current cloudiness at your locale


Also, you can now choose the accent color, that is used for your tab line, tab loading, and icon attention colors.

**Permissions**:

* Alarm — to set internal timers that check for weather/time updates
* Storage — to store your settings 
* Theme — to… theme

## Solarized References
* [Solarized theme website](http://ethanschoonover.com/solarized)

* [Solarized theme repo](https://github.com/altercation/ethanschoonover.com/tree/master/projects/solarized)

## Installation
From [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/zen-fox/). Alternatively, see dev instructions:

## Dev
1. Donwload repo as zip, 
2. Open firefox, and go to `about:debugging` in a new tab, 
3. Select any file of the add-on (eg. `manifest.json`) and open it from the file picker
4. ???
5. Profit

### Extra Talk
No unnecessary permissions are required by Zen Fox, and all the code is open source.

Recommended add-ons to go with it (but require some configuration from you):
- Vivaldi fox: set theme based on current site
- Stylus: modify site style to be how you like

*This extension can basically be forked and have the theme definitons replaced
and serve as kind of the template for dynamic Firefox themes of any color
scheme.*

Check out this [awesome fork](https://github.com/jonascj/zen-fox) which uses the `Messaging API` to change the Zenfox theme along with other system apps!
