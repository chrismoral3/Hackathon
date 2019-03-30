var global_urls = {
  constant:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=",
  current:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=my+current+location",
  stores:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=stores+near+me",
  daycare:"https://www.google.com/maps/embed/v1/search?key=AIzaSyDHUvAP5UqYKG_YEravAYaI1vccBDj8CvY&q=9712+north+pond"}

var map_iframe = document.getElementById("map_iframe");

function change_src(n) {
  switch(n) {
    case 0:
    map_iframe.src=global_urls.current;
    break;
    case 1:
    map_iframe.src=global_urls.stores;
    break;
    case 2:
    map_iframe.src=global_urls.daycare;
    break;
  }
}

var address_input = document.getElementBtId("address_field");

function change_src_address() {
    map_iframe.src=global_urls.constant+address_input.value.replace(/ /g,"+");
}

/*address_input.addEventListener("keydown",function(event) {
    if(event.keycode === 13) {// 13 - space
	//event.preventDefault();
	change_src_address(address_input.value.replace(/ /g,"+");
    }
});
*/
    
