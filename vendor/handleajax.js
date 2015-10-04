$(function() {
    'use strict';

    $(document).ajaxStart(function () {
        $("#loading").css({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }).show();
    });

    $(document).ajaxComplete(function () {
        $("#loading").hide();
    });
})