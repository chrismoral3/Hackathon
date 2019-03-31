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

function addMarkers(map,query){
  console.log(pos)
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
      console.log(i);
      var marker = new google.maps.Marker({
              map: map,
              place: {
                placeId: results[i].place_id,
                location: results[i].geometry.location
              }
            });
    }
  }

}
