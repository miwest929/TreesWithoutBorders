$("#map").height($(window).height()).width($(window).width());

var map = L.map('map').setView([40.7127, -74.0059], 11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mpwest929.cdc89604',
    accessToken: 'pk.eyJ1IjoibXB3ZXN0OTI5IiwiYSI6IjkzYzUxMTY4NTQ5NzEzOWY3NWU1MWY3YzNiMTUwMGIxIn0.j5Pp4ifPG1I4ZIMaGtKtqA'
}).addTo(map);

$.get('/districts', function(data, status) {
  var getStyle = function(color) {
    return {
      "color": color,
      "weight": 5,
      "opacity": 0.2
    };
  };

  var bronxStyle = getStyle("#cc33ff");
  var brooklynStyle = getStyle("#0078ff");
  var manhattanStyle = getStyle("#339966");
  var queensStyle = getStyle("#f0f00b");
  var statenIslandStyle = getStyle("#cc3300");

  var getColorized = function(colorIndex) {
    var colorStyle = ["#339966", "#0078ff", "#cc33ff", "#f0f00b", "#cc3300"];
    return getStyle( colorStyle[colorIndex] );
  };

  var districtLayer = L.geoJson(data, {
    onEachFeature: function (feature, layer) {
      //layer.bindPopup(feature.properties.neighborhood);
    },
    style: function(feature) {
      /*switch(feature.properties.borough) {
        case 'Bronx': return bronxStyle;
        case 'Brooklyn': return brooklynStyle;
        case 'Manhattan': return manhattanStyle;
        case 'Queens': return queensStyle;
        case 'Staten Island': return statenIslandStyle;
      }*/
      return getStyle("#339966");
    }
  }).addTo(map);

  var source = null;
  districtLayer.on("click", function (e) {
    //TODO: Implement
  });
});
