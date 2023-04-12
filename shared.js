const btnShareLocation = document.querySelector('.btn-share-location');
const yourSharedLocation = document.querySelector('#your-shared-location');
const sharedLatitude = document.querySelector('#shared-latitude');
const sharedLongitude = document.querySelector('#shared-longitude');
var map;

function success (pos) {

    document.body.innerHTML = `
        <h1>Mapa</h1>
        <div class="form-control">
            <h2>Sua localização</h2>
            <span class='sharedLatitude'>Latitude Compartilhada: ${pos.coords.latitude}</span>
            <span class='sharedLongitude'>Longitude Compartilhada: ${pos.coords.longitude}</span>
            <button type="button" onClick="unshareLocation()">Parar de compartilhar</button>
            <a href="index.html">Pesquisar coordenadas</a>
        </div>
        <div id="map"></div>
    `;

    if (map === undefined){

        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);

    } else{

        map.remove();
        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 13);

    };

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('Estou aqui')
        .openPopup();
        
};

function error (error) {

    map = document.querySelector('#map');
    map.innerHTML = '';

    const p = document.createElement('p');
    p.classList.add('error');
    p.textContent = `${error.message}`;
    
    map.appendChild(p);

};

function shareLocation() {
  
    //Localização Compartilhada
    var watchID = navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 10000
    });
    
};

function unshareLocation() {

    //Localização Compartilhada
    var watchID = navigator.geolocation.watchPosition(success, error, {
        enableHighAccuracy: true,
        timeout: 10000
    });

    //Limpar o sensor de localização
    navigator.geolocation.clearWatch(watchID);

    map.remove();

    location.reload();

};

btnShareLocation.addEventListener('click', shareLocation);