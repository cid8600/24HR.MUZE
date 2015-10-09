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
            // $('body').on('click', '.inspirebtn', function (e) {
            //     $(e.currentTarget).blur();
            //     self.eb.buildStr(self);
            // });

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

