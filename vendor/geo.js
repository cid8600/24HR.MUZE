$(function() {
    'use strict';

    var geoApp = {

        init: function () {
            var self = this;
            self.eventHandlers(self);
        },

        eventHandlers: function (self) {

            $('body').on('click', '.getlocationbtn', function(e) {
                var $btnEl = $(e.currentTarget);
                if ($btnEl.hasClass('disabled')) {
                    return;
                } else {
                    self.loader.showLoader();
                    $(e.currentTarget).blur();
                    self.geo.reqLatLng(self, $btnEl);
                }

            });

        },

        loader: {
            showLoader: function () {
                $('#loading').show();
            },
            hideLoader: function () {
                $('#loading').hide();
            }
        },

        geo: {
            reqLatLng: function (self, $btnEl) {

                var geo_options = {
                  enableHighAccuracy: true,
                  maximumAge        : 30000,
                  timeout           : 27000
                };

                function geo_success(position) {

                    var geo = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    $('html').data('lat', geo.lat);
                    $('html').data('lng', geo.lng);

                    self.loader.hideLoader();
                    $btnEl.text('Found You!').delay(600).slideUp(600, function() {
                        $('.action-container').removeClass('hidden');
                    });
                }

                function geo_error() {
                    $btnEl.removeClass('disabled').text('Try Again');
                }

                navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
            }
        }
    };

    geoApp.init();

});

