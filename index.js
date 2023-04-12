const btnSearchCoords = document.querySelector('#btn-search-coords');

var map;

const regexLatitude = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const regexLongitude = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

function check_lat_lon(latitudeCoord, longitudeCoord) {

  let isValidLatitudeCoord = regexLatitude.test(latitudeCoord);
  let isValidLongitudeCoord = regexLongitude.test(longitudeCoord);

  return isValidLatitudeCoord && isValidLongitudeCoord;

};

function searchCoords() {

    const latitudeCoord = document.querySelector('#latitude-coord').value;
    const longitudeCoord = document.querySelector('#longitude-coord').value;
    
    let isValidCoords = check_lat_lon(latitudeCoord, longitudeCoord);

    if(isValidCoords === false) {

        alert('Coordenada inválida!');
        return;

    };

    let searchedPosition = {
        coords: {
            latitude: latitudeCoord,
            longitude: longitudeCoord,
        }
    };

    if (map === undefined){

        map = L.map('map').setView([searchedPosition.coords.latitude, searchedPosition.coords.longitude], 13);

    } else{

        map.remove();
        map = L.map('map').setView([searchedPosition.coords.latitude, searchedPosition.coords.longitude], 13);

    };

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([searchedPosition.coords.latitude, searchedPosition.coords.longitude]).addTo(map)
        .bindPopup('Coordenada pesquisada')
        .openPopup();

};

btnSearchCoords.addEventListener('click', searchCoords);