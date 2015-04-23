var map;
var array; 
var data_len;

//google map styles
var styles = [
  {
    stylers: [
      { saturation: 0 }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

function zoomPin(lat, lon){
  pos = new google.maps.LatLng(lat, lon);
  if(!isNaN(lat) && !isNaN(lon)){
    map.setZoom(17);
    map.setCenter(pos);
    console.log(map);  
  }
}

//Finds y value of given object
function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

function initialize(){
	var mapOptions = {
		zoom: 17, 
		center: new google.maps.LatLng(41.8262, -71.399),
		draggable: true,
		styles: styles,
		minZoom: 14
	};

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  google.maps.event.addListener(map, 'dblclick', function(event) {
    //when map is double clicked smoothly scroll to the bottom where user inputs the data, and auto fill latitude and longitude
    var lat = event.latLng.k;
    var lon = event.latLng.D;
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = (-1)*lon;
    $("#dataInsert").ScrollTo(); // Scroll screen so that user can input info
  });
 
  //adding pins to the maps
  var myLatlng;

  $.get('/allpin', function(data) {
    data_len = data.length;
    array = new Array(data_len);
    //store all the data in mongodb into an array
    for(var i = 0; i < data_len; i++) {
      array[i] = new Array(4);
      array[i][0] = data[i].name;
      array[i][1] = data[i].description;
      array[i][2] = data[i].lat;
      array[i][3] = data[i].lon;
      myLatlng = new google.maps.LatLng(array[i][2], array[i][3]);

      //create map pins(markers) and put into the map as markers
      var marker = new google.maps.Marker({
          position: myLatlng, 
          map: map,
          title: data[i].name
      });

      //add pins to google map and add events => if double click on pin then zoom in and center to that location
      google.maps.event.addListener(marker, 'dblclick', function(event) {
        map.setZoom(18);
        map.setCenter(new google.maps.LatLng(event.latLng.k, event.latLng.D));

        //TODO : make sure when pin is double clicked, you see memo on the side 




      });
    }
  
    //adding list of memo names to the sheet
    for (var i = 0; i< data_len; i++){
      var a = '"' + '#pin'+i+'"';
      var b = '"' + 'pin' + i + '"';
      var pin_name = '<a class="btn btn-primary" onclick="zoomPin('+array[i][2] +','+array[i][3]+')" data-toggle="collapse" href=' + a + 
                          'aria-expanded="false" aria-controls=' +b+' style=" margin-top:20px; width:400px; height:50px" >'+ array[i][0] + '</a> </br>';
      $( "#pin_data" ).append(pin_name);

      var pin_des = '<div class="collapse" id=' + b +'>' + '<div class="well">' + array[i][1] + '</div></div>';
      $( "#pin_data" ).append( pin_des );
    }
  })
}

  //initialize all the maps!
  google.maps.event.addDomListener(window, "load", initialize());
