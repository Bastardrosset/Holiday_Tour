/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiZnVsbGRldnhhdiIsImEiOiJjbGMwbzJucmMwNmQwM3JwYmxtbGNhYnhjIn0.G1YoqvqGhryRVbvJxQcNsA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/fulldevxav/clc0xx07y000x14pbgw7i77mc',
  scrollZoom: false
  // center: [-118.113491, 34.111745],
  // zoom: 8,
  // interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map)

  // Extend map bound to include current location
  bounds.extend(loc.coordinates)
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    right: 100,
    left: 100
  }
});