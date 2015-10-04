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
            });

            // toggle list / slide views
            $('body').on('click', '#view-toggle', function (e) {
                var state = false; // list view
                var $slideEl = $('#results-slide');
                var $listEl = $('#results-list');

                if (!state) {
                    $listEl.hide();
                    self.slick.create(self, $slideEl);
                } else {
                    $slideEl.hide();
                    $listEl.show();
                    self.slick.destroy($slideEl);
                }

                state = !state;
            })

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
                    .done(function(data) {;
                        self.eb.buildHtml(self, data);
                    })
                    .fail(function(err) {
                        console.log('there was a prob, bob. ' + err);
                    });
            },

            buildHtml: function (self, data) {

                var htmlArr = [];
                var tmpHtml = '';
                var name, desc, logoUrl, start, end, eventUrl, total;

                total = data.pagination.object_count;

                $.each(data.events, function(i, v) {
                    try {
                        name = v.name.text;
                        desc = v.description.text;
                        start = v.start.utc;
                        end = v.end.utc;
                        eventUrl = v.url;
                        logoUrl = v.logo.url;


                        if (desc.length > 256) {
                            desc = desc.slice(0, 250) + '...';
                        }
                        if (name && name && start && end && eventUrl && logoUrl && total) {
                            tmpHtml = '<li><div class="ev-wrapper"><h3>' + name + '</h3><img src="' + logoUrl + '" /><ul><li>Starts: ' + start + '</li> <li>Ends: ' + end + '</li></ul><p>' + desc + ' <br /> <br /><a href="' + eventUrl + '" target="_blank">Find out more <i class="fa fa-caret-right"></i></a></p></div></li>';
                            htmlArr.push(tmpHtml);
                        }
                    } catch (err){}
                });

                htmlArr = htmlArr.join(' ');
                self.eb.renderHtml(self, htmlArr, total);

            },

            renderHtml: function (self, html, total) {
                var $renderEl = $('#results-wrapper');
                var totesStr = (total === 1) ? ' show' : ' shows';

                $('h2', $renderEl).text('We found ' + total + totesStr);
                $('#results-list').html(html).show();
                $('#results-slide').html(html);
                $renderEl.show();
            }
        },
        slick: {
            create: function (self, $el) {
                var options = {
                    autoplay: true,
                    autoplaySpeed: 4000,
                    slidesToShow: 1,
                    arrows: false,
                    centerPadding: '40px',
                    dots: true,
                    fade: true,
                    mobileFirst: true,
                    pauseOnDotsHover: true,
                    lazyLoad: 'progressive',
                    adaptiveHeight: true,
                    respondTo: 'min'
                };

                $el.slick(options);
                $el.slideDown(300)
            },
            destroy: function ($el) {
                $el.slick('unslick');
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

