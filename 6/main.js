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
  var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    opacity: 0.7
  });

  // Add the layer to the map
  map.addLayer(CartoDB_Positron);

  // Set the viewing position
  map.setView([55, -5], 6);
}

function getDistance(a, b) {
  // Return distance between two sites
  var dLat = +a.lat - +b.lat;
  var dLon = +a.lon - +b.lon;
  return Math.sqrt( dLat * dLat + dLon * dLon );
}

function filterSitesBySpacing(sites, spacing) {
  // Filter sites to get nice spacing and reduce overlapping

  var includedSites = [ sites[0] ];

  // Compare each site to included sites
  sites.forEach(function(site) {
    var shouldInclude = true;

    for(var i = 0; i < includedSites.length; i++ ) {
      if( getDistance( site, includedSites[i] ) < spacing ) {
        shouldInclude = false;
        break;
      }
    }

    if(shouldInclude)
      includedSites.push(site);
  });

  return includedSites;
}


function addSymbols(forecastData) {

  var sites = forecastData.SiteRep.DV.Location;
  var filteredSites = filterSitesBySpacing(sites, 0.5);

  filteredSites.forEach(function(site, i) {

    var forecast = site.Period.Rep[0];

    var icon = L.icon({
      iconUrl: '../meteocons-icons/SVG/' + weatherTypeToIcon[ forecast.W ] + '.svg',
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
