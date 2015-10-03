function getLatLng() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        console.dir(location);
        return location;
    });
}

getLatLng();