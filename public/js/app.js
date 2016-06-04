$("#map").height($(window).height()).width($(window).width());

var map = L.map('map').setView([40.7127, -74.0059], 11);
map.scrollWheelZoom.disable();
map.dragging.disable();
map.touchZoom.disable();

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mpwest929.cdc89604',
    accessToken: 'pk.eyJ1IjoibXB3ZXN0OTI5IiwiYSI6IjkzYzUxMTY4NTQ5NzEzOWY3NWU1MWY3YzNiMTUwMGIxIn0.j5Pp4ifPG1I4ZIMaGtKtqA'
}).addTo(map);

// control that shows cb info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = '<h4>Street Tree Health By Community Board</h4>';
		};

		info.addTo(map);


		// get color depending on population density value
    function getColor(d) {
			return d > 100 ? '#276419' :
			       d > 90  ? '#4d9221' :
			       d > 80  ? '#7fbc41' :
			       d > 70  ? '#b8e186' :
			       d > 60  ? '#e6f5d0' :
			       d > 50  ? '#fde0ef' :
			       d > 40  ? '#f1b6da' :
             d > 30  ? '#de77ae' :
             d > 20  ? '#c51b7d' :
             d > 10  ? '#8e0152' :
			                  '#cccccc';
		}

		function style(feature) {
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.score)
			};
		}

		function highlightFeature(e) {
			var layer = e.target;

			layer.setStyle({
				weight: 5,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
			});

			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}

		var geojson;

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
			});
		}

		geojson = L.geoJson(commdistsSample, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);

// year button handlers
$('#ninetyFiveBtn').on('click', function (e) {
  console.log("Show 1995 trees");
})

$('#twentyFifteenBtn').on('click', function (e) {
  console.log("Show 2015 trees");
})
