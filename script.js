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
  var localtime = new Date().toString();
  document.getElementById("cur_time").innerHTML = "Current Time: "+localtime;
  window.setTimeout(current_time, 1000);
}

function afterLoaded() { //init
  address_input = document.getElementById("adrsfield");
  map_frame = document.getElementById("map_iframe");
  window.setTimeout(current_time, 1000);
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

var m1 = null;
var m2 = null;
var m3 = null;
var m4 = null;

function item_check(n) {
  var box_id = ""//maybe useless
  
  switch(n) {
    case 0: //day cares
      if(document.getElementById("chkDayCares").checked == true){
        m1 = addMarkers(map,"day cares","red");
        google.maps.event.trigger(map, 'resize');
        console.log("daycares was clicked")
      } else {
        removeMarkers(m1);
        google.maps.event.trigger(map, 'resize');
        console.log("reset");
      }
      break;
    case 1: //job centers
      if(document.getElementById("chkJobCenters").checked == true){
        m2 = addMarkers(map,"job centers","blue");
        google.maps.event.trigger(map, 'resize');
        console.log("Job centers was clicked")
      } else {
        removeMarkers(m2);
        google.maps.event.trigger(map, 'resize');
        console.log("reset");
      }
      break;
    case 2: //public transport
    if(document.getElementById("chkOutreach").checked == true){
      m3 = addMarkers(map,"outreach","yellow");
      google.maps.event.trigger(map, 'resize');
      console.log("public Outreach was clicked")
    }  else {
        removeMarkers(m3);
        google.maps.event.trigger(map, 'resize');
        console.log("reset");
      }
      break;
    case 3: //grocery stores
    if(document.getElementById("chkGroceryStores").checked == true){
      m4 = addMarkers(map,"grocery stores","green");
      google.maps.event.trigger(map, 'resize');
      console.log("grocery was clicked")
    }  else {
        removeMarkers(m4);
        google.maps.event.trigger(map, 'resize');
        console.log("reset");
      }
      break;
    default:
    //
  }
}

var map = null;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            // ATL coordinates
            lat: 33.62889,
            lng: -84.443777
        }
    });
  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
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
            infoWindow.setContent('Current Location');
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
    //addMarkers(map,"job centers","blue");
    //addMarkers(map,"childcare","red");
}


function addMarkers(map,query,color){
  var markers = [];
  let request = {
    location: map.getCenter(),
    radius: '500',
    query: query
  };

  let service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) 
    for(i = 0; i < results.length; i++)
    {
      //console.log(i);
       let url = "http://maps.google.com/mapfiles/ms/icons/";
           url += color + "-dot.png";
      var marker = new google.maps.Marker({
              map: map,
              title:results[i].name,
              place: {
                placeId: results[i].place_id,
                location: results[i].geometry.location
              },
              
              icon: {
                url: url
              }
            });
      markers.push(marker);
    }
  }
  return markers;
}

function removeMarkers(markers){
  for(var i = 0; i < markers.length; i++)
    markers[i].setMap(null);
  markers = new Array();
}
