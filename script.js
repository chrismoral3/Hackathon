var global_urls = {
  constant: "https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=",
  current:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=my+current+location",
  stores:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=stores+near+me",
  daycare:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=childcare+near+me",
  publictransp:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=25+park+place",}

var map_frame = null
var address_input = null

function change_src(n) {
  switch(n) {
    case 0:
    map_frame.src=global_urls.current;
    break;
    case 1:
    map_frame.src=global_urls.stores;
    break;
    case 2:
    map_frame.src=global_urls.daycare;
    break;
    case 3:
    map_frame.src=global_urls.publictransp;
    break;
  }
}

function change_src_address() {
    var output = global_urls.constant+address_input.value.replace(/ /g,"+");
    console.log(output)
    map_iframe.src=output;
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
	  var dropdowns = document.getElementsByClassName("dropdown-content");
	  var i;
	  for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
		    openDropdown.classList.remove('show');
		}
	  }
	}
}

function current_time() {
  var now = new Date();
  var localtime = now.toString();
  return localtime;
}

function afterLoaded() { //init
  address_input = document.getElementById("adrsfield");
  map_frame = document.getElementById("map_iframe");
  document.getElementById("cur_time").innerHTML = "Current Time: "+current_time();
  document.getElementById("last_edited").innerHTML = "We last worked on this site on this date: "+document.lastModified;
  console.log("loaded")
}

function loading() {
  if(document.readyState === 'loading') {
    loading();
    console.log("loading")
  } else {
    afterLoaded();
  }
}


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            // ATL coordinates
            lat: 33.62889,
            lng: -84.443777
        }
    });
    // 33.7490° N, 84.3880° W
    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);
    var infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
}





function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631));
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
