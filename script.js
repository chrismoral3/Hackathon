var global_urls = {
  constant: "https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=",
  current:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=my+current+location",
  stores:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=stores+near+me",
  daycare:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=childcare+near+me",
  publictransp:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=25+park+place",}

function change_src(n) {
  switch(n) {
    case 0:
    document.getElementById("map_iframe").src=global_urls.current;
    break;
    case 1:
    document.getElementById("map_iframe").src=global_urls.stores;
    break;
    case 2:
    document.getElementById("map_iframe").src=global_urls.daycare;
    break;
    case 3:
    document.getElementById("map_iframe").src=global_urls.publictransp;
    break;
  }
}

var address_input = null

function change_src_address() {
    if(address_input == null) {
      address_input = document.getElementById("adrsfield");
    }
    var output = global_urls.constant+address_input.value.replace(/ /g,"+");
    console.log(output)
    map_iframe.src=output;
}
