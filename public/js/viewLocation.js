const socket = io();

let map;

function initMap() {
    map = L.map('map').setView([-31.4216, -64.1888], 13); // Córdoba, Argentina
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function updateOtherLocation(location) {
    const otherLocation = [location.latitude, location.longitude];
    
    // Limpiar marcadores existentes
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    map.setView(otherLocation, 15); // Mayor zoom para mejor precisión
    L.marker(otherLocation).addTo(map)
        .bindPopup("Shared Location")
        .openPopup();
}

socket.on('receive-location', (location) => {
    updateOtherLocation(location);
});

window.onload = initMap;
