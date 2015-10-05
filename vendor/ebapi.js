$(function() {
    'use strict';

    var eb = {

        init: function () {
            var self = this;
            self.eventHandlers(self);
        },

        validateSelects: function () {
            var $selectsEls = $('.dropdown-button');
            var valid = 0;
            var validArr =[]

            $selectsEls.each(function(v) {
                validArr.push($(this).text());
            });

            $.each(validArr, function(i, v) {
                if (v !== 'Select') {
                    valid += 1;
                }
            });

            return (valid === $selectsEls.length) ? true : false;
        },

        eventHandlers: function (self) {

            // Dropdowns
            $('body').on('click', function(e) {
                var $tar = $(e.target);
                if ($tar.hasClass('dropdown-button')) {
                    return;
                } else {
                    $('.dropdown-menu').removeClass('show-menu')
                }
                console.dir($tar);
            });

            $('body').on('click', '.dropdown-button', function(e) {
              var $button, $menu, $parent, $parSibs, $otherMenus;

              $button = $(e.currentTarget);
              $parent = $button.parents('.dropdown');
              $parSibs = $parent.siblings('.dropdown');

              $menu = $button.siblings(".dropdown-menu");

              $menu.toggleClass("show-menu");
              $otherMenus = $parSibs.find('.dropdown-menu');
              $otherMenus.each(function(i) {
                if ($(this).hasClass('show-menu')) {
                    $(this).removeClass('show-menu')
                }
              });

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
                $(e.currentTarget).blur();
                self.eb.buildStr(self);
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

                total = 0;

                $.each(data.events, function(i, v) {
                    try {
                        name = v.name.text;
                        desc = v.description.text;
                        start = moment(v.start.utc).format("dddd, MMMM Do YYYY, h:mm:ss a");
                        end = moment(v.end.utc).format("dddd, MMMM Do YYYY, h:mm:ss a");
                        eventUrl = v.url;
                        logoUrl = v.logo.url || 'http://www.chrisdonham.com/venues/no_image_available.png';


                        if (desc.length > 256) {
                            desc = desc.slice(0, 300) + '...';
                        }

                        if (name && name && start && end && eventUrl) {
                            tmpHtml = '<li><div class="ev-wrapper"><h4>' + name + '</h4><img src="' + logoUrl + '" /><ul><li>Starts <span>' + start + '</span></li> <li>Ends <span>' + end + '</span></li></ul><p>' + desc + ' <br /> <br /><a href="' + eventUrl + '" target="_blank" class="btn clickthrough">Find out more <i class="fa fa-caret-right"></i></a></p></div></li>';
                            total += 1;
                            htmlArr.push(tmpHtml);

                        }
                    } catch (err){}

                });

                htmlArr = htmlArr.join(' ');
                self.eb.renderHtml(self, htmlArr, total);

            },

            renderHtml: function (self, html, total) {
                var $renderEl = $('#results-wrapper');
                var totesStr = (total === 1) ? ' event' : ' events';
                var totesHtml = (total === 0) ? '<img class="nothing"src="http://i.imgur.com/ATlhg.gif" />' : html;
                $('h3', $renderEl).text('We found ' + total + totesStr);
                $('#results-list').html(totesHtml).show();
                $renderEl.show();
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

