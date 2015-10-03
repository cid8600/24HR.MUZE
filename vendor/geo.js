
$(function() {

    $('body').on('click', '.getlocationbtn', function(e) {
        var $btnEl = $(e.currentTarget);
        if ($btnEl.hasClass('disabled')) {
            return;
        } else {
            $btnEl.addClass('disabled');
            showLoader();
            getLatLng($btnEl);
        }
        getLatLng()
    });

    function showLoader() {
        $('#loader').show();
    }
    function hideLoader() {
        $('#loader').hide();
    }

    function putLatLng($btnEl, geo) {
        var lat = geo.lat;
        var lng = geo.lng;
        // put lat lng in local storage
        hideLoader();
        $btnEl.removeClass('disabled');
    }

    function getLatLng($btnEl) {
        // get lat lng from local storage
        // check local before req to speed up after first check


        // if (!latLng) {
            //reqLatLng($btnEl, cb);
        //}

    }

    function reqLatLng($btnEl, cb) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geo = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.dir(location);
            cb(geo);
        });
    }

    if (!($(html).hasClass('gelocation'))) {
        // goelocation not supported
        // offer some other way to tap the API
    } else {
        getLatLng();
    }

});

