# Solarized Fox

Simple theme to make Firefox as soothing on the eyes as it is pleasing!

## Dev
Overall logic:

manifest.json 	—> theme.js
				—> options.html		—> options.css
									—> options.js

				—> popup.html		—> popup.css
									—> popup.js

Theme things are in theme.js, and it looks for a method variable in local storage
Method variable comes from user choice in options.html
-The variable determines what method is used to theme (how is that done? your previous method was trash?) use localstorage to store values, and modularize the three types


## Credits

* Significant inspiration from the [example dynamic extension](https://github.com/mdn/webextensions-examples/tree/master/dynamic-theme) — a wonderful start to my first browser theme/extension

* The amazing [Solarized theme](http://ethanschoonover.com/solarized) by Ethan Schoonover. The icon graphic is also from there, and used with permission!

TODO: 
follow instructions for porting the theme
make settings page for the three choices; time with customs times, own choice w/button, site content. AND, weather!