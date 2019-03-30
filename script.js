var global_urls = {
  current:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=my+current+location",
  stores:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=stores+near+me",
  daycare:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=childcare+near+me",
  publictransp:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=public+transportation+near+me",}

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
