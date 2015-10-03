
$(function() {

    function putLatLng(geo) {
        var lat = geo.lat;
        var lng = geo.lng;
        // put lat lng in local storage
    }

    function getLatLng() {
        // get lat lng from local storage

        // if (!latLng) {
            //reqLatLng(cb);
        //}

    }

    function reqLatLng(cb) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geo = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.dir(location);
            cb(geo)
            return location;
        });
    }

getLatLng();

    if (!($(html).hasClass('gelocation'))) {
        // goelocation not supported
        // offer some other way to tap the API
    }

});

