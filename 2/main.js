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

$.getJSON('../data/forecast.json', function(data) {
  makeMap();
  console.log(data);
});
