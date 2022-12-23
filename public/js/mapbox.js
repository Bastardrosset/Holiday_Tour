/* eslint-disable */ 

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken = 'pk.eyJ1IjoiZnVsbGRldnhhdiIsImEiOiJjbGMwbzJucmMwNmQwM3JwYmxtbGNhYnhjIn0.G1YoqvqGhryRVbvJxQcNsA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/fulldevxav/clc0xx07y000x14pbgw7i77mc'
  });