var map;setTimeout(function(){map||$(".map-error").append("Google Map could not be loaded")},8e3),ko.bindingHandlers.googlemap={init:function(e){var t={zoom:13};map=new google.maps.Map(e,t)},update:function(e,t){var o=t(),n=o.mapCenter.latitude,a=o.mapCenter.longitude;map.setCenter({lat:n,lng:a})}};var infoWindowView=function(){var e='<div class="info-window" data-bind="with: currentVenue"><h2 class="window-header clickable" data-bind="text: name, click: selectVenue;"></h2><ul class="window-list" data-bind="foreach: concerts"><li class="window-list-element clickable" data-bind="click: selectEvent"><hr><h4 class="window-event-name" data-bind="text: title">blah</h4><p class="window-event-date date"><span data-bind="text: timeInfo.day"></span>, <span data-bind="text: timeInfo.date"></span></p></li></div>';return e=$.parseHTML(e)[0]},ViewModel=function(){function e(e,t){return e=e.toLowerCase(),e.indexOf(t)>-1}function t(t,o){for(var n=0;n<t.length;n++)if(e(t[n],o))return!0}function o(e,t,o){localStorage&&(localStorage.setItem("lastAddress",e),localStorage.setItem("latitude",t),localStorage.setItem("longitude",o))}function n(e){for(var t=[],o=0;o<e.length;o++)"string"==typeof e[o].artists.artist&&(t.push(e[o].artists.artist),e[o].artists.artist=t,t=[]),e[o].tags||(e[o].tags={tag:[]}),"string"==typeof e[o].tags.tag&&(t.push(e[o].tags.tag),e[o].tags.tag=t,t=[]),e[o].timeInfo={day:e[o].startDate.substring(0,3),date:e[o].startDate.substring(5,11),year:e[o].startDate.substring(12,16),time:e[o].startDate.substring(17,22)}}function a(e){var t="https://api.foursquare.com/v2/venues/"+e+"?oauth_token=PV4PYPFODETGIN4BI22F1YN23FER1YPGAKQOBLCODUP251GX&v=20150702",o={success:function(e,t,o){console.log(e),r.currentVenueFourSquare(e.response.venue)},error:function(e,t,o){r.fourSquareStatus("Four Square data for venue could not be found.")},timeout:8e3};$.ajax(t,o)}var r=this;r.currentAddress=ko.observable(),r.mapCenter=ko.observable(),r.lastFmEvents=ko.observableArray(),r.lastFmVenues=ko.observableArray(),r.searchInput=ko.observable(),r.filteredEvents=ko.observableArray(),r.currentEvent=ko.observable(),r.currentVenue=ko.observable(),r.currentVenueFourSquare=ko.observable(),r.currentArtist=ko.observable(),r.currentArtistInfo=ko.observable(),r.currentArtistYoutube=ko.observableArray(),r.extraInfoBoolean=ko.observable(!0),r.showEventInfo=ko.observable(!1),r.showVenueInfo=ko.observable(!1),r.showArtistInfo=ko.observable(!1),r.displaySmallMenu=ko.observable(!1),r.hideLargeMenu=ko.observable(!1),r.listEvents=ko.observable(!0),r.listVenues=ko.observable(!1),r.geocoderStatus=ko.observable(),r.lastFmStatus=ko.observable(),r.lastFmArtistStatus=ko.observable(),r.fourSquareStatus=ko.observable(),r.youtubeStatus=ko.observable(),function(){if(localStorage.lastAddress&&localStorage.latitude&&localStorage.longitude){var e=Number(localStorage.latitude),t=Number(localStorage.longitude);r.currentAddress(localStorage.lastAddress),r.mapCenter({latitude:e,longitude:t})}else r.currentAddress("Austin, TX"),r.mapCenter({latitude:30.267153,longitude:-97.74306079999997})}(),r.currentArtistSearch=ko.computed(function(){var e;return r.currentArtist()&&(e=r.currentArtist().replace(/\s+/g,"+")),e}),r.showExtraInfo=ko.computed(function(){return(r.showEventInfo()||r.showVenueInfo()||r.showArtistInfo())&&r.extraInfoBoolean()?!0:!1}),r.newVenue=function(e,t){for(var o=0;o<t.length;o++)if(e===t[o].id)return o;return-1},r.buildVenues=ko.computed(function(){for(var e=r.lastFmEvents(),t=[],o=0;o<e.length;o++){var n=r.newVenue(e[o].venue.id,t),a=e[o].venue;-1===n?(a.concerts=[],a.concerts.push(e[o]),t.push(a),e[o].venueIndex=t.indexOf(a)):(e[o].venueIndex=n,t[n].concerts.push(e[o]))}r.lastFmVenues(t)}),r.mapMarkers=ko.computed(function(){var e=[],t=new google.maps.InfoWindow,o=r.lastFmVenues();console.log(o);for(var n=0;n<o.length;n++){var a=new google.maps.LatLng(o[n].location["geo:point"]["geo:lat"],o[n].location["geo:point"]["geo:long"]),s=new google.maps.Marker({position:a,title:o[n].name,content:infoWindowView(),icon:"images/red.png",map:map,venueIndex:n});google.maps.event.addListener(s,"mouseup",function(){t.setContent(this.content),r.currentVenue(r.lastFmVenues()[this.venueIndex]),t.open(map,this)}),e.push(s),ko.applyBindings(r,s.content)}return e}),r.searchLastFmEvents=ko.computed(function(){if(r.searchInput()){for(var o=r.searchInput().toLowerCase(),n=[],a=0;a<r.lastFmEvents().length;a++){var s=r.lastFmEvents()[a];(e(s.venue.name,o)||e(s.venue.location.street,o)||e(s.title,o)||e(s.description,o)||t(s.artists.artist,o)||t(s.tags.tag,o))&&n.push(s)}r.filteredEvents(n)}else r.filteredEvents(r.lastFmEvents())}),r.mapMarkersSearch=ko.computed(function(){for(var e=r.lastFmVenues(),t=(r.filteredEvents(),r.lastFmEvents(),0);t<e.length;t++){for(var o,n=0;n<e[t].concerts.length;n++)o=o||r.filteredEvents().indexOf(e[t].concerts[n])>-1;r.mapMarkers()[t].setIcon(r.filteredEvents()==r.lastFmEvents()?"images/red.png":o?"images/blue.png":"images/clear.png"),o=null}}),r.closeSmallMenu=function(){r.displaySmallMenu(!1)},r.openSmallMenu=function(){r.displaySmallMenu(!0)},r.toggleLargeMenu=function(){r.hideLargeMenu(r.hideLargeMenu()?!1:!0)},r.toggleExtraInfo=function(){r.extraInfoBoolean()?r.extraInfoBoolean(!1):(r.showEventInfo(!1),r.showVenueInfo(!1),r.showArtistInfo(!1),r.extraInfoBoolean(!0))},r.showEvents=function(){r.listEvents(!0),r.listVenues(!1)},r.showVenues=function(){r.listEvents(!1),r.listVenues(!0)},r.selectEvent=function(e){r.selectMarker(e.venueIndex),r.currentEvent(ko.mapping.fromJS(e)),r.showEventInfo(!0),r.showVenueInfo(!1),r.showArtistInfo(!1)},r.selectVenue=function(e){var t=e||r.lastFmVenues()[currentEvent().venueIndex()];r.selectMarker(lastFmVenues.indexOf(t)),r.showVenueInfo(!0),r.showEventInfo(!1),r.showArtistInfo(!1)},r.selectArtist=function(e){r.currentArtist(e),r.showArtistInfo(!0),r.showEventInfo(!1),r.showVenueInfo(!1)},r.closeExtraInfo=function(){r.showEventInfo(!1),r.showVenueInfo(!1),r.showArtistInfo(!1)},r.selectMarker=function(e){google.maps.event.trigger(r.mapMarkers()[e],"mouseup"),map.panTo(r.mapMarkers()[e].position)};var s=new google.maps.Geocoder;r.getMapGeocode=ko.computed(function(){var e=setTimeout(function(){r.geocoderStatus("Location coordinates could not be loaded.")},8e3);s.geocode({address:r.currentAddress()},function(t,n){if(r.geocoderStatus("Setting map location..."),n==google.maps.GeocoderStatus.OK){clearTimeout(e),r.geocoderStatus(null);var a=t[0].geometry.location.G,s=t[0].geometry.location.K,u={latitude:a,longitude:s};a!=r.mapCenter().latitude&&s!=r.mapCenter().longitude&&(r.mapCenter(u),o(r.currentAddress(),a,s))}else r.geocoderStatus("Geocoder error because: "+n)})}),r.getLastFmEvents=ko.computed(function(){if(r.mapCenter().latitude&&r.mapCenter().longitude){var e=r.mapCenter().latitude,t=r.mapCenter().longitude,o="http://ws.audioscrobbler.com/2.0/?method=geo.getevents&lat="+e+"&long="+t+"&limit=100&api_key=d824cbbb7759624aa8b3621a627b70b8&format=json",a={success:function(e,t,o){r.mapMarkers().forEach(function(e){e.setMap(null)}),e.events?(r.lastFmStatus(null),n(e.events.event),r.lastFmEvents(e.events.event)):r.lastFmStatus(e.message)},error:function(){r.lastFmStatus("Last FM data could not be loaded. Please try again.")},timeout:11e3};r.lastFmEvents.removeAll(),r.lastFmStatus("Loading Last FM Data..."),$.ajax(o,a)}}),r.getArtistInfo=ko.computed(function(){if(r.currentArtistSearch()){var e="http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist="+r.currentArtistSearch()+"&api_key=d824cbbb7759624aa8b3621a627b70b8&format=json",t={success:function(e,t,o){r.lastFmArtistStatus(null),r.currentArtistInfo(ko.mapping.fromJS(e.artist))},error:function(){r.lastFmArtistStatus("Last FM artist data could not be loaded.")},timeout:8e3};r.lastFmArtistStatus("Loading Last FM artist data..."),$.ajax(e,t)}}),r.getArtistVideos=ko.computed(function(){if(r.currentArtistSearch()){var e="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+r.currentArtistSearch()+"&key=AIzaSyA8B9NC0lW-vqhQzWmVp8XwEMFbyg01blI",t={success:function(e,t,o){for(var n=0;n<e.items.length;n++)e.items[n].url="https://www.youtube.com/watch?v="+e.items[n].id.videoId;r.youtubeStatus(null),r.currentArtistYoutube(e.items)},error:function(){r.youtubeStatus("Youtube search results could not be loaded.")},timeout:8e3};r.youtubeStatus("Loading Youtube search results..."),$.ajax(e,t)}}),r.findFourSquareVenue=ko.computed(function(){if(r.currentVenue()){var e=r.currentVenue().location["geo:point"]["geo:lat"],t=r.currentVenue().location["geo:point"]["geo:long"],o="https://api.foursquare.com/v2/venues/search?client_id=HEC4M2QKHJVGW5L5TPIBLBWBFJBBFSCIFFZDNZSGD2G5UGTI&client_secret=AJKA10FIBJE3CUKUBYYYOGZ0BU2XNGMXNGUA43LAI0PQT3ZD&v=20130815&ll="+e+","+t+"&query="+r.currentVenue().name+"&intent=match",n={success:function(e,t,o){e.response.venues.length>0?(a(e.response.venues[0].id),r.fourSquareStatus(null)):(r.currentVenueFourSquare(null),r.fourSquareStatus("Four Square data for venue could not be found."))},error:function(){r.fourSquareStatus("Four Square data for venue could not be loaded.")},timeout:8e3};r.fourSquareStatus("Loading Four Square data for venue..."),$.ajax(o,n)}})};ko.applyBindings(ViewModel);