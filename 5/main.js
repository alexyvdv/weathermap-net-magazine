var map;

// Map from Met Office weather type index to Meteocon index
var weatherTypeToIcon = {
  0: 3, 
  1: 2, 
  2: 9, 
  3: 8,
  4: 0,
  5: 13,
  6: 13,
  7: 14,
  8: 14,
  9: 17,
  10: 17,
  11: 17,
  12: 17,
  13: 18,
  14: 18,
  15: 18,
  16: 22,
  17: 22,
  18: 22,
  19: 24,
  20: 24,
  21: 24,
  22: 22,
  23: 22,
  24: 22,
  25: 23,
  26: 23,
  27: 23,
  28: 16,
  29: 16,
  30: 16
};


function makeMap() {

  // Create a map
  map = new L.Map('map');

  // Create a layer
  var osmLayer = new L.TileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: 'Map data (C) <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }
  );

  // Add the layer to the map
  map.addLayer(osmLayer);

  // Set the viewing position
  map.setView([55, -5], 6);
}

function addSymbols(forecastData) {

  var sites = forecastData.SiteRep.DV.Location;

  sites.forEach(function(site, i) {

    // Only show some of the sites
    if(i % 15 !== 0)
      return;

    var iconURL = '../meteocons-icons/SVG/' + weatherTypeToIcon[ site.Period.Rep[0].W ] + '.svg';
    var icon = L.icon({
      iconUrl: iconURL,
      iconSize: [30, 30]
    });

    var marker = L.marker( [ +site.lat, +site.lon ], {icon: icon} );
    marker.bindPopup( 'Chance of rain ' + site.Period.Rep[0].PPd + '%' );
    marker.addTo(map);
  });

}

$.getJSON('../data/forecast.json', function(data) {
  makeMap();
  addSymbols(data);
});
