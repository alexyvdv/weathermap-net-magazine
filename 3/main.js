var map;

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

function addMarkers(forecastData) {

  var sites = forecastData.SiteRep.DV.Location;

  sites.forEach(function(site, i) {

    // Only show some of the sites
    if(i % 20 !== 0)
      return;

    var marker = L.marker( [ +site.lat, +site.lon ]);
    marker.addTo(map);
  });

}


$.getJSON('../data/forecast.json', function(data) {
  makeMap();
  addMarkers(data);
});
