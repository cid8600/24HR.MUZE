$(function() {
    'use strict';

    var eb = {

        init: function () {
            var self = this;
            self.eventHandlers(self);
        },

        validateSelects: function () {
              var $selectsEls = $('.dropdown-button');
              var valid = false;
              $selectsEls.each(function(i, v) {
                if ($(this).text() === 'Select') {
                  valid = false;
                } else {
                  valid = true;
                }
              });

              return valid;
        },
        eventHandlers: function (self) {

            // Dropdowns
            $('body').on('click', '.dropdown-button', function(e) {
              var $button, $menu;

              $button = $(e.currentTarget);

              $menu = $button.siblings(".dropdown-menu");
              $menu.toggleClass("show-menu");
              $menu.children("li").click(function() {
                $menu.removeClass("show-menu");
                $button.html($(this).html());
              });
            });

            // Check if all drops are selected
            $('body').on('click', '.dropdown-menu > li', function (e) {
              if (self.validateSelects()) {
                $('.inspirebtn').slideDown(600);
              }
            });

            // make API call
            $('body').on('click', '.inspirebtn', function (e) {
                self.eb.buildStr(self);
              // use momemnt to get start-date = new Date()
            // use momemnt to calc end-date = (start-date + 24hr)
              // build string for API Call
              // handle resp (if no items, display message)
              // build html
              // render to dom

            });

        },

        eb: {
            buildSels: function(self) {

                var mi, miStr, pop, popStr, price, priceStr, selectStrs;
                pop = $('div[data-popularity]').find('.dropdown-button').text();
                pop = pop.toLowerCase();
                popStr = 'popular=' + pop;

                mi = $('div[data-radius]').find('.dropdown-button').text();
                mi = parseInt(mi);
                miStr = 'location.within=' + mi + 'mi';

                price = $('div[data-price]').find('.dropdown-button').text();
                price = price.toLowerCase();
                priceStr = 'price=' + price;

                selectStrs = popStr + '&' + miStr + '&' + priceStr

                return selectStrs;

            },

            buildCal: function(self) {
                var str, tod, tom;

                tod = moment();
                tom = moment().add(1, 'days');
                tod = tod.format();
                tod = tod.slice(0, 19);
                tom = tom.format();
                tom = tom.slice(0, 19);
                str = 'start_date.range_start=' + tod + '&start_date.range_end=' + tom;
                console.log(tod, tom, str);
                return str;

            },

            buildGeo: function() {
                var lat, latStr, lng, lngStr, geoStr;

                lat = $('html').data('lat');
                latStr = 'location.latitude=' + lat;

                lng = $('html').data('lng');
                lngStr = 'location.longitude=' + lng;

                geoStr = latStr + '&' + lngStr;

                return geoStr;
            },

            buildStr: function(self) {
                var totesStr;

                var httpStr = 'https://www.eventbriteapi.com/v3/events/search/?';
                var cat = 'categories=103';
                var apiKey = 'token=63KPUFEERQXFNLX6J5QK';
                var g = self.eb.buildGeo();
                var c = self.eb.buildCal();
                var s = self.eb.buildSels();

                totesStr = httpStr + cat + '&' + g + '&' + c + '&' + s + '&' + apiKey;

                self.eb.callApi(self, totesStr);

            },

            callApi: function(self, totesStr) {
                console.log(totesStr);
            },

            buildHtml: function () {

            }
        },
        loader: {
            showLoader: function () {
                $('#loading').show();
            },
            hideLoader: function () {
                $('#loading').hide();
            }
        }
    };

    eb.init();

});

