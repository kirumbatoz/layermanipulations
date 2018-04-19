var initials = [0.486153974 , 37.926988635];
var map = L.map('map').setView(initials, 7);
var geojsonLayer = L.geoJson(counties,{
	style: styles,
	onEachFeature: eachPolygon
}).addTo(map);
var panMarker = [0.486153974 , 37.926988635];
var makePan = L.marker(panMarker, {
	draggable: true,
	keyboard: true,
	title: "Drag to Pan and get Point Coordinates.",
}).bindLabel('Search Co-ordinates!').addTo(map);
makePan.bindPopup('<i id="marker-info">Drag to Pan and get Point Coordinates.</i>').openPopup();
makePan.on('dragend', function(e){
 var panLocation = makePan.getLatLng();
	makePan.getPopup().setContent('<i id="marker-loc" >Marker Location Coordinates </br>Latitude : '+panLocation.lat+'. <br />Longitude : '+panLocation.lng+'.').openOn(map);
map.panTo(panLocation);
});

		var map_doc = "<h2>Map Help Doc</h2><p>This is a simple map of Kenya Aimed to deliver most general information such as: <ol class='doc'>" +
					"<li>County Boundaries</li>" +
					 "<li>Name of Counties and Constituencies</li>" +
					"<li>Area and Perimeter of Counties</li>" +
					"<li>Area and perimeter of Constituencies</li>" +
					"<li>Display of Coordinates of a given point in Kenya</li>" +
					"<li>Thematic comparison of Different county areas</li></ol>"+
				"<h3>Events and Methods</h3><ol class='events'>" +
						"<li>Feature Hover - Get Brief info about the feature</li>"+
						 "<li>click - Select feature, View more details on the side bar.</li>"+
						 "<li>Drag Marker - pan to, get Corrdinate of new location of Marker</li>"+
						 "<li>Others</li>"+
						 "</ol></p>";
				$(".basics-doc").html(map_doc);
var selected = "<h3>your selection</h3>";
$('.selection').html(selected);
function layerInfo(info){
		var selected = "<h3>your selection</h3>";
		var county = info.ADM2;
		var constit = info.ADM1;
		var area = info.Are;
		var perimeter = info.Perimeter;
		var info = "<p id='selected-feature'>County Name : "+county+",</br>Constituency: "+constit+",</br>Area : "+
				parseInt(area)+" M<sup>2</sup>,</br>Perimeter : "+parseInt(perimeter)+" M.</P>";
		selected += info;
		$('.selection').html(selected);
}
function eachPolygon(layer, polygon){
polygon.on( 'mouseover', function(){
	this.setStyle(
		{
		fillColor: "white",
		fillOpacity: 0.7,
		color: "yellow",
		weight: 1
		}
		);
		 // console.log(layer.properties);
	})
	.on('mouseout', function(e){
		geojsonLayer.resetStyle(e.target);
	})
	/*
		.on('dbclick', function(){
		map.fitBounds(this.getBounds());
	 })*/
			.on('click', function(){
			 layerInfo(layer.properties);
			})

			.bindLabel(layer.properties.ADM2 + "<br/>Area: " + parseInt( layer.properties.Are) +" M<sup>2</sup>");

		}

function styles(feature){
	var featureArea = feature.properties.Are;
	return{
		fillColor: customStyles(featureArea),
		fillOpacity: 0.9,
		color: '#F9FAFB',
		opacity: 0.5,
		lineWeight: 0.3
	}
}

function customStyles(Area){
	var customArea = Area * Math.pow(10, -8);
	//nsole.log(customArea);

	if(customArea > 700){
		return 'brown';
	}
	else if(customArea > 650 && customArea <= 700){
		return '#0F0F0E';
	}
	else if(customArea > 450 && customArea <= 650){
		return 'darkgoldenrod';
	}
	else if(customArea > 250 && customArea <= 450){
		return 'darkorchid';
	}
	else if(customArea > 150 && customArea <= 250){
		return '#95C538';
	}
	else if(customArea > 60 && customArea <= 150){
		return '#36AE49';
	}
	else if(customArea > 25 && customArea <= 60){
		return '#120EBC';
	}
	else{
		return '#41EDE1';
	}

}

var legend = L.control({position: 'bottomright'});
legend.onAdd = function(map){
	var container = L.DomUtil.create('div','legend');
	var labels = [
		"Area Greater than 700.",
		"Area Greater than 650 but Less than 700.",
		"Area Greater than 450 but Less than 650.",
		"Area Greater than 250 but Less than 450.",
		"Area Greater than 150 but Less than 250.",
		"Area Greater than 60 but Less than 150.",
		"Area Greater than 25 but Less than 60.",
		"Area Less than 25"
	];
	var intervals = [701, 651, 451, 251, 151, 61, 25.001, 24.999];
	var subInterval = [];
	for (var i = 0; i < intervals.length; i++){
		subInterval[i] = intervals[i]*Math.pow(10, 8);
		//console.log(subInterval[i]);
	}
	container.innerHTML = '<div class = "legend-container" style="background: green; color: yellow; font-size: 12pt"><h3>Approx Area (X10 <sup>8</sup> M<sup>2</sup>)</h3></div>';

	for(var count=0; count < intervals.length; count++){
		container.innerHTML += '<i style="background: ' + customStyles(subInterval[count]) + '" id="label-colors"></i><i>' +labels[count]+'</i></br>';

	}
	//container.innerHTML += '<h3>Hello </h3><p style="background: green; color: yellow; font-size: 11pt">Here goes the content</p>';
	return container;
}

legend.addTo(map);
