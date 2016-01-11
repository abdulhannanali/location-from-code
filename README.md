# Location From Code

Live demo here: https://abdulhannanali.github.io/location-from-code/

Location from code is an interactive site which uses the [OpenStreetMap Nominatim API](http://wiki.openstreetmap.org/wiki/Nominatim) in order to get the geographical data from the location. It can also search for geographical data for specific countries. 

### Libraries, Frameworks and APIs used
The site couldn't have been possible without the following Libraries, Frameworks and APIs

#### APIs used
- [OpenStreetMap Nominatim API](http://wiki.openstreetmap.org/wiki/Nominatim)

#### Libraries and Frameworks
- [jQuery](http://jquery.com)
- [Materialize](http://materializecss.com)
- [Animate.css](https://daneden.github.io/animate.css/)

#### Other tools used
- [Google Material Icons](https://www.google.com/design/icons/)
- [GoSquared Flag Icons](https://www.gosquared.com/resources/flag-icons/)


### Material Design and Layout
The design and layout of the repo is fairly simple. It uses Materialize.css and also it's standard Materialize grid. I use Material cards included in Materialize.css to hold most of the input content just because cardds are something that look really cool to me. :smile:     	


### About the code
The javascript code of the site is located under one file [index.js](js/index.js) and it's where most of the magic happens. Other js code is included before index.js in index.html.

#### Nominatim module
[index.js](js/index.js) includes a module made using revealing module pattern and this encloses all the functionality related to the Nominatim api and exposes a uniform api. This can be easily seperated in it's own file too. Infact, this would have been done if I used Node and Browserify. 

Other functions here deal with the DOM using jQuery. Such as `displayCollection` function on receiving the data from the Nominatim API creates DOM elements for each place found.

#### Error Handling
A Place where likely an error can occur in [index.js](js/index.js) is `nominatim.getData` function. A request can fail due to any reason. In this case this error is catched and a Materialize Toast is displayed for it. 

#####  Other notifications
Most of the other notifications are displayed using `Materialize.toast` function. 

### Contributions
If you would like to extend this project or you find an issue. Please feel free to make an issue or a PR. It will be really appreciated.

### [FOSSASIA](https://fossasia.org) and [GCI](https://codein.withgoogle.com)
This site was made as task in Google CodeIn with [FOSSASIA](https://fossasia.org). FOSSASIA is a really awesome organization doing lots of cool and awesome stuff in open source. Be sure to check it's github page [here](https://fossasia.github.iio)

## LICENSE
This repo is licensed under MIT LICENSE. See [LICENSE](LICENSE) for more info.