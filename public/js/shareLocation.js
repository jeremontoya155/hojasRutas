const socket = io();

let map;

function initMap() {
    map = L.map('map').setView([-31.4216, -64.1888], 13); // Córdoba, Argentina
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function updateMyLocation(position) {
    const { latitude, longitude } = position.coords;
    const myLocation = [latitude, longitude];
    
    map.setView(myLocation, 15); // Mayor zoom para mejor precisión
    L.marker(myLocation).addTo(map)
        .bindPopup('My Location')
        .openPopup();

    // Emitir la ubicación del usuario a otros usuarios
    socket.emit('share-location', { latitude, longitude });
}

document.getElementById('shareLocationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateMyLocation, (error) => {
            console.error("Error al obtener la ubicación: ", error);
        }, {
            enableHighAccuracy: true, // Mejor precisión
            timeout: 5000, // Tiempo de espera para obtener la ubicación
            maximumAge: 0 // No usar ubicación en caché
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

window.onload = initMap;
