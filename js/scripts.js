/*let map = L.map('map-conten').setView([40.166833,-3.660926],18)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; MI OpenStreetMap contributors' }).addTo(map);

//let marker = L.marker([40.166833,-3.660926]).bindTooltip('Estoy aqui').openTooltip().addTo(map)

//---Añadir Popup----//

let greenIcon = L.icon({
    iconUrl: './img/leaf-green.png',
    shadowUrl: './img/leaf-shadow.png',
    iconSize:     [38, 95],
    shadowSize:   [50, 64], 
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62], 
    popupAnchor:  [-3, -90]
});

let popup = L.popup().setLatLng([40.166833,-3.660926]).setContent('Estoy Aqui')
let marker = L.marker([40.166833,-3.660926],{icon:greenIcon}).bindPopup(popup).openPopup().addTo(map)*/
let options = {
    enableHighAccuracy: true,
    timeout:5000,
    maximunAge:0
}

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
    )
}else{
    alert("Los servicios de geolocalizacion no estan disponibles")
}



function success(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map('map-conten',{
        center:[latitude,longitude],
        zoom:9
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; MI OpenStreetMap contributors' }).addTo(map);
    //----Definir Iconos----//
    let inicio = L.icon({
        iconUrl: './img/ini.png',
        //shadowUrl: './img/leaf-shadow.png',
        iconSize:     [38, 95],
        //shadowSize:   [50, 64], 
        iconAnchor:   [-407, -221], 
       // shadowAnchor: [4, 62], 
        popupAnchor:  [-3, -90]
    });
    
    let track = L.icon({
        iconUrl: './img/track.png',
        //shadowUrl: './img/leaf-shadow.png',
        iconSize:     [38, 95],
        //shadowSize:   [50, 64], 
        iconAnchor:   [22, 94], 
        //shadowAnchor: [4, 62], 
        popupAnchor:  [-3, -90]
    });

    let final = L.icon({
        iconUrl: './img/fin.png',
       // shadowUrl: './img/leaf-shadow.png',
        iconSize:     [38, 95],
        //shadowSize:   [50, 64], 
        iconAnchor:   [-407, -221], 
        //shadowAnchor: [4, 62], 
        popupAnchor:  [-3, -90]
    });

    //-----Calcular Ruta------//
    let control = L.Routing.control({
        waypoints:[
            L.latLng(latitude, longitude),
            L.latLng(40.2062161,-3.6786567)
        ],
        language:'es',
        


    }).addTo(map)
}

function error(){
    let map = L.map('map-conten',{
        center:[40.166833,-3.660926],
        zoom:9
    })
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; MI OpenStreetMap contributors' }).addTo(map);
}


