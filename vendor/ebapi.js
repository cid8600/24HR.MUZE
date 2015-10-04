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

                var json = $.getJSON(totesStr)
                    .done(function(res) {
                        var  events = res.events;
                        if (events.length > 0) {
                            self.eb.buildHtml(self, events);
                        } else {
                            $('section').html('<div id="nodata"><p>Sorry, but we couln\'t find any events around you. Try searching with different options to see if it\'s us your you. <br /> ;-)</p><a class="inspirebtn btn" href="#">Try Again</a></div>');
                            // display no events found message
                        }
                    })
                    .fail(function(err) {
                        console.log('there was a prob, bob. ' + err);
                    });
            },

            buildHtml: function (self, events) {
                var htmlArr = [];
                var tmpHtml = '';
                var name, desc, logoUrl, start, end, eventUrl;

                $.each(events, function(i, v) {
                    try {
                        name = v.name.text;
                        desc = v.description.text;
                        start = v.start.utc;
                        end = v.end.utc;
                        eventUrl = v.url;
                        logoUrl = v.logo.url;

                        if (name && name && start && end && eventUrl && logoUrl) {
                            tmpHtml = '<li><div class="ev-wrapper"><h3>' + name + '</h3><img src="' + logoUrl + '" /><ul><li>Start: ' + start + '</li> <li>End: ' + end + '</li></ul><p>' + desc + '</p></div></li>';
                            htmlArr.push(tmpHtml);
                        }
                    } catch (err){}
                });

                htmlArr = htmlArr.join(' ');
                self.eb.renderHtml(self, htmlArr);

            },

            renderHtml: function (self, html) {
                $('section').html('<ul>' + html + '</ul>')
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

