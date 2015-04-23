function createPin(){
	
	var description = document.getElementById("description").value;
    var name = document.getElementById("name").value;
    var lat = (document.getElementById("latitude").value);
    var lon = (-1)*(document.getElementById("longitude").value);
    if (isNaN(lat) || isNaN(lon)){
        alert("Oops ! latitude and longitude must be numbers!");
        return;
    }
    if (description==null || description=="" || name=="" || name==null){
        alert("Oops ! Please Fill All Required Field");
        return false;
    }

	/* POST request to add a pin to the database */
	$.post("/pin",
       {name: name,
        description : description,
        lat : lat,
        lon : lon}, 
        function(data){
            $("#map-canvas").ScrollTo();
            alert('pin added. please refresh!');

        }
    );
}