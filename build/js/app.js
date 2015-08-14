var map;setTimeout(function(){map||$(".map-error").append("Google Map could not be loaded")},8e3),ko.bindingHandlers.googlemap={init:function(e){var t={zoom:13};map=new google.maps.Map(e,t)},update:function(e,t){var n=t(),o=n.mapCenter.latitude,a=n.mapCenter.longitude;map.setCenter({lat:o,lng:a})}};var infoWindowView=function(){var e='<div class="info-window" data-bind="with: currentVenue"><h2 class="window-header clickable" data-bind="text: name, click: selectVenue;"></h2><ul class="window-list" data-bind="foreach: concerts"><li class="window-list-element clickable" data-bind="click: selectEvent"><hr><h4 class="window-event-name" data-bind="text: title">blah</h4><p class="window-event-date date"><span data-bind="text: timeInfo.day"></span>, <span data-bind="text: timeInfo.date"></span></p></li></div>';return e=$.parseHTML(e)[0]},ViewModel=function(){function e(e,t){return e=e.toLowerCase(),e.indexOf(t)>-1}function t(t,n){for(var o=0;o<t.length;o++)if(e(t[o],n))return!0}function n(e){for(var t=[],n=0;n<e.length;n++)"string"==typeof e[n].artists.artist&&(t.push(e[n].artists.artist),e[n].artists.artist=t,t=[]),e[n].tags||(e[n].tags={tag:[]}),"string"==typeof e[n].tags.tag&&(t.push(e[n].tags.tag),e[n].tags.tag=t,t=[]),e[n].timeInfo={day:e[n].startDate.substring(0,3),date:e[n].startDate.substring(5,11),year:e[n].startDate.substring(12,16),time:e[n].startDate.substring(17,22)}}function o(e){var t="https://api.foursquare.com/v2/venues/"+e+"?oauth_token=PV4PYPFODETGIN4BI22F1YN23FER1YPGAKQOBLCODUP251GX&v=20150702",n={success:function(e,t,n){console.log(e),a.currentVenueFourSquare(e.response.venue)},error:function(e,t,n){a.fourSquareStatus("Four Square data for venue could not be found.")},timeout:8e3};$.ajax(t,n)}var a=this,r="Austin, TX";a.currentAddress=ko.observable(r),a.mapCenter=ko.observable({latitude:30.267153,longitude:-97.74306079999997}),a.lastFmEvents=ko.observableArray(),a.lastFmVenues=ko.observableArray(),a.searchInput=ko.observable(),a.filteredEvents=ko.observableArray(),a.currentEvent=ko.observable(),a.currentVenue=ko.observable(),a.currentVenueFourSquare=ko.observable(),a.currentArtist=ko.observable(),a.currentArtistInfo=ko.observable(),a.currentArtistYoutube=ko.observableArray(),a.extraInfoBoolean=ko.observable(!0),a.showEventInfo=ko.observable(!1),a.showVenueInfo=ko.observable(!1),a.showArtistInfo=ko.observable(!1),a.displaySmallMenu=ko.observable(!1),a.hideLargeMenu=ko.observable(!1),a.listEvents=ko.observable(!0),a.listVenues=ko.observable(!1),a.geocoderStatus=ko.observable(),a.lastFmStatus=ko.observable(),a.lastFmArtistStatus=ko.observable(),a.fourSquareStatus=ko.observable(),a.youtubeStatus=ko.observable(),a.currentArtistSearch=ko.computed(function(){var e;return a.currentArtist()&&(e=a.currentArtist().replace(/\s+/g,"+")),e}),a.showExtraInfo=ko.computed(function(){return(a.showEventInfo()||a.showVenueInfo()||a.showArtistInfo())&&a.extraInfoBoolean()?!0:!1}),a.newVenue=function(e,t){for(var n=0;n<t.length;n++)if(e===t[n].id)return n;return-1},a.buildVenues=ko.computed(function(){for(var e=a.lastFmEvents(),t=[],n=0;n<e.length;n++){var o=a.newVenue(e[n].venue.id,t),r=e[n].venue;-1===o?(r.concerts=[],r.concerts.push(e[n]),t.push(r),e[n].venueIndex=t.indexOf(r)):(e[n].venueIndex=o,t[o].concerts.push(e[n]))}a.lastFmVenues(t)}),a.mapMarkers=ko.computed(function(){var e=[],t=new google.maps.InfoWindow,n=a.lastFmVenues();console.log(n);for(var o=0;o<n.length;o++){var r=new google.maps.LatLng(n[o].location["geo:point"]["geo:lat"],n[o].location["geo:point"]["geo:long"]),s=new google.maps.Marker({position:r,title:n[o].name,content:infoWindowView(),icon:"images/red.png",map:map,venueIndex:o});google.maps.event.addListener(s,"mouseup",function(){t.setContent(this.content),a.currentVenue(a.lastFmVenues()[this.venueIndex]),t.open(map,this)}),e.push(s),ko.applyBindings(a,s.content)}return e}),a.searchLastFmEvents=ko.computed(function(){if(a.searchInput()){for(var n=a.searchInput().toLowerCase(),o=[],r=0;r<a.lastFmEvents().length;r++){var s=a.lastFmEvents()[r];(e(s.venue.name,n)||e(s.venue.location.street,n)||e(s.title,n)||e(s.description,n)||t(s.artists.artist,n)||t(s.tags.tag,n))&&o.push(s)}a.filteredEvents(o)}else a.filteredEvents(a.lastFmEvents())}),a.mapMarkersSearch=ko.computed(function(){for(var e=a.lastFmVenues(),t=(a.filteredEvents(),a.lastFmEvents(),0);t<e.length;t++){for(var n,o=0;o<e[t].concerts.length;o++)n=n||a.filteredEvents().indexOf(e[t].concerts[o])>-1;a.mapMarkers()[t].setIcon(a.filteredEvents()==a.lastFmEvents()?"images/red.png":n?"images/blue.png":"images/clear.png"),n=null}}),a.closeSmallMenu=function(){a.displaySmallMenu(!1)},a.openSmallMenu=function(){a.displaySmallMenu(!0)},a.toggleLargeMenu=function(){a.hideLargeMenu(a.hideLargeMenu()?!1:!0)},a.toggleExtraInfo=function(){a.extraInfoBoolean()?a.extraInfoBoolean(!1):(a.showEventInfo(!1),a.showVenueInfo(!1),a.showArtistInfo(!1),a.extraInfoBoolean(!0))},a.showEvents=function(){a.listEvents(!0),a.listVenues(!1)},a.showVenues=function(){a.listEvents(!1),a.listVenues(!0)},a.selectEvent=function(e){a.selectMarker(e.venueIndex),a.currentEvent(ko.mapping.fromJS(e)),a.showEventInfo(!0),a.showVenueInfo(!1),a.showArtistInfo(!1)},a.selectVenue=function(e){var t=e||a.lastFmVenues()[currentEvent().venueIndex()];a.selectMarker(lastFmVenues.indexOf(t)),a.showVenueInfo(!0),a.showEventInfo(!1),a.showArtistInfo(!1)},a.selectArtist=function(e){a.currentArtist(e),a.showArtistInfo(!0),a.showEventInfo(!1),a.showVenueInfo(!1)},a.closeExtraInfo=function(){a.showEventInfo(!1),a.showVenueInfo(!1),a.showArtistInfo(!1)},a.selectMarker=function(e){google.maps.event.trigger(a.mapMarkers()[e],"mouseup"),map.panTo(a.mapMarkers()[e].position)};var s=new google.maps.Geocoder;a.getMapGeocode=ko.computed(function(){var e=setTimeout(function(){a.geocoderStatus("Location coordinates could not be loaded.")},8e3);s.geocode({address:a.currentAddress()},function(t,n){if(a.geocoderStatus("Setting map location..."),n==google.maps.GeocoderStatus.OK){clearTimeout(e),a.geocoderStatus(null);var o=t[0].geometry.location.G,r=t[0].geometry.location.K,s={latitude:o,longitude:r};o!=a.mapCenter().latitude&&r!=a.mapCenter().longitude&&a.mapCenter(s)}else a.geocoderStatus("Geocoder error because: "+n)})}),a.getLastFmEvents=ko.computed(function(){if(a.mapCenter().latitude&&a.mapCenter().longitude){var e=a.mapCenter().latitude,t=a.mapCenter().longitude,o="http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat="+e+"&long="+t+"&limit=100&api_key=d824cbbb7759624aa8b3621a627b70b8&format=json",r={success:function(e,t,o){a.mapMarkers().forEach(function(e){e.setMap(null)}),e.events?(a.lastFmStatus(null),n(e.events.event),a.lastFmEvents(e.events.event)):a.lastFmStatus(e.message)},error:function(){a.lastFmStatus("Last FM data could not be loaded. Please try again.")},timeout:11e3};a.lastFmEvents.removeAll(),a.lastFmStatus("Loading Last FM Data..."),$.ajax(o,r)}}),a.getArtistInfo=ko.computed(function(){if(a.currentArtistSearch()){var e="http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+a.currentArtistSearch()+"&api_key=d824cbbb7759624aa8b3621a627b70b8&format=json",t={success:function(e,t,n){a.lastFmArtistStatus(null),a.currentArtistInfo(ko.mapping.fromJS(e.artist))},error:function(){a.lastFmArtistStatus("Last FM artist data could not be loaded.")},timeout:8e3};a.lastFmArtistStatus("Loading Last FM artist data..."),$.ajax(e,t)}}),a.getArtistVideos=ko.computed(function(){if(a.currentArtistSearch()){var e="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+a.currentArtistSearch()+"&key=AIzaSyA8B9NC0lW-vqhQzWmVp8XwEMFbyg01blI",t={success:function(e,t,n){for(var o=0;o<e.items.length;o++)e.items[o].url="https://www.youtube.com/watch?v="+e.items[o].id.videoId;a.youtubeStatus(null),a.currentArtistYoutube(e.items)},error:function(){a.youtubeStatus("Youtube search results could not be loaded.")},timeout:8e3};a.youtubeStatus("Loading Youtube search results..."),$.ajax(e,t)}}),a.findFourSquareVenue=ko.computed(function(){if(a.currentVenue()){var e=a.currentVenue().location["geo:point"]["geo:lat"],t=a.currentVenue().location["geo:point"]["geo:long"],n="https://api.foursquare.com/v2/venues/search?client_id=HEC4M2QKHJVGW5L5TPIBLBWBFJBBFSCIFFZDNZSGD2G5UGTI&client_secret=AJKA10FIBJE3CUKUBYYYOGZ0BU2XNGMXNGUA43LAI0PQT3ZD&v=20130815&ll="+e+","+t+"&query="+a.currentVenue().name+"&intent=match",r={success:function(e,t,n){e.response.venues.length>0?(o(e.response.venues[0].id),a.fourSquareStatus(null)):(a.currentVenueFourSquare(null),a.fourSquareStatus("Four Square data for venue could not be found."))},error:function(){a.fourSquareStatus("Four Square data for venue could not be loaded.")},timeout:8e3};a.fourSquareStatus("Loading Four Square data for venue..."),$.ajax(n,r)}})};ko.applyBindings(ViewModel);