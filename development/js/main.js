// main.js - launch app w/ require dependencies
require(['init'], function () {
    require(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyA8B9NC0lW-vqhQzWmVp8XwEMFbyg01blI&libraries=places'], function () {
        require(['knockout', 'app', 'registerKoComponents'],
            function (ko, ViewModel) {
            ko.applyBindings(ViewModel);
        });
    });
});
