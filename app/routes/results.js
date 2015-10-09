import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var that = this;
    var eb = {

        buildSels: function() {

            var mi, miStr, pop, popStr, price, priceStr, selectStrs;
            pop = $('div[data-popularity]').find('.dropdown-button').text();
            pop = pop.toLowerCase();
            popStr = 'popular=' + pop;

            if (!pop) {
                that.transitionTo('/');
            }

            mi = $('div[data-radius]').find('.dropdown-button').text();
            mi = parseInt(mi);
            miStr = 'location.within=' + mi + 'mi';

            price = $('div[data-price]').find('.dropdown-button').text();
            price = price.toLowerCase();
            priceStr = 'price=' + price;

            selectStrs = popStr + '&' + miStr + '&' + priceStr

            return selectStrs;

        },

        buildCal: function() {
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

        buildStr: function() {
            var totesStr;

            var httpStr = 'https://www.eventbriteapi.com/v3/events/search/?';
            var cat = 'categories=103';
            var apiKey = 'token=63KPUFEERQXFNLX6J5QK';
            var g = this.buildGeo();
            var c = this.buildCal();
            var s = this.buildSels();

            totesStr = httpStr + cat + '&' + g + '&' + c + '&' + s + '&' + apiKey;
            return totesStr;

        }
    };

    var url = eb.buildStr();
    //'https://www.eventbriteapi.com/v3/events/search/?categories=103&location.latitude=37.786288299999995&location.longitude=-122.39139839999999&start_date.range_start=2015-10-08T13:23:34&start_date.range_end=2015-10-09T13:23:34&popular=false&location.within=50mi&price=paid&token=63KPUFEERQXFNLX6J5QK';
    return Ember.$.getJSON(url).then(function(data) {

        var evsArr = [];
        var total = 0;
        var totesStr = '';
        var res = {};

        $.each(data.events, function(i, v) {
            var ev = {};
            try {
                ev.name = v.name.text;
                ev.desc = v.description.text;
                ev.start = moment(v.start.utc).format("dddd, MMMM Do YYYY, h:mm:ss a");
                ev.end = moment(v.end.utc).format("dddd, MMMM Do YYYY, h:mm:ss a");
                ev.eventUrl = v.url;
                ev.logoUrl = v.logo.url || 'http://www.chrisdonham.com/venues/no_image_available.png';

                if (ev.desc.length > 256) {
                    ev.desc = ev.desc.slice(0, 300) + '...';
                }
                evsArr.push(ev);
                total += 1;

            } catch (err){}
        });

        totesStr = (total === 1) ? total + ' event' : total + ' events';

        res.evsArr =  evsArr;
        res.total = totesStr;

        return res;

    });
  }
});