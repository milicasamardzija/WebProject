Vue.component("administrator-addRestaurant", {
    data:function(){
        return{
          restaurant:{},
          managers:[]
        }
    },    
  template: `
    <div class="containerInfo t"> 
    
    <div><input id="searchInput" class="controls" type="text" style="width: 250px;" placeholder="Ukucajte ime restorana..." /></div>
          	<div id="dvMap" style="width: 600px; height: 350px"></div>
          </div>
    
        <div class="information">
            <form>
                <table class="t">
                <div class="col-sm-4 my-col" style="margin-top: 2mm;">
          	
                    <tr>
                    <p style="margin-left: 5px;">Ovde unesite podatke o restoranu:</p>
                    </tr>
                    <tr>
                    <td class="labela">Menadzer:</td>
                    <td><select class="form-control" v-model="restaurant.managerId" placeholder="Kliknite za izbor menadzera">
                        <option v-for="m in managers" v-bind:value="m.id">{{m.name}} {{m.surname}}</option>
                    </select></td>
                    <td class="buttonMap"><button type="button" class="btn btn-success" v-on:click="dodajMenadzera">Kreiraj novog menadzera</button></td>
                    <td><p style="margin-left: 15px;margin-top: 8px;">*Ukoliko ne postoje slobodni menadzeri klikom na ovo dugme kreirajte novog menadzera.</p></td>
                    </tr>
                    <tr>
                    <td class="labela">Naziv:</td>
                    <td><input class="form-control" type="text" placeholder="Naziv" v-model="restaurant.name"></td>
                    </tr>
                    <tr>
                    <td class="labela">Tip:</td>
                    <td><select class="form-control" v-model="restaurant.type" placeholder="Kliknite za izbor tipa">
                        <option v-bind:value="0">Italijanski</option>
                        <option v-bind:value="1">Kineski</option>
                        <option v-bind:value="2">Pica</option>
                        <option v-bind:value="3">Rostilj</option>
                        <option v-bind:value="4">Riblji</option>
                        <option v-bind:value="5">Veganski</option>
                    </select>
                    </td>
                    </tr>
                    <tr>
                    <td class="labela">Ulica:</td>
                    <td><input class="form-control" type="text" placeholder="Ulica" id="street" v-model="restaurant.street"></td>
                    <td class="buttonMap"><button type="button" class="btn btn-success" v-on:click="initMap()"><i></i>Choose on map</button></td>
                    </tr>
                    <tr>
                    <td class="labela">Broj:</td>
                    <td><input class="form-control" type="text" id="number" placeholder="Broj" v-model="restaurant.number"></td>
                    </tr>
                    <tr>
                    <td class="labela">Grad:</td>
                    <td><input class="form-control" type="text" id = "city" placeholder="Grad" v-model="restaurant.city"></td>
                    </tr>
                    <tr>
                    <td class="labela">Postanski broj:</td>
                    <td><input class="form-control" type="text" id="postalCode" placeholder="Postanski broj" v-model="restaurant.zipCode"></td>
                    </tr>
                    <tr>
                    <td class="labela">Geografska duzina:</td>
                    <td><input class="form-control" type="text" id="latitude" placeholder="Postanski broj" v-model="restaurant.latitude"></td>
                    </tr>
                    <tr>
                    <td class="labela">Geografska sirina:</td>
                    <td><input class="form-control" type="text" id="longitude" placeholder="Postanski broj" v-model="restaurant.longitude"></td>
                    </tr>
                    <tr>
                    <td class="labela">Logo:</td>
                    <td><input type="file" onchange="encodeImageFileAsURL(this)" v-model="restaurant.link"></td>
                    </tr>
                    <tr>
                    <td class="buttonForm"><button type="button" class="btn btn-success" v-on:click="addRestaurant">Sacuvaj</button></td>
                    <td class="buttonForm"><button type="button" class="btn btn-success" v-on:click="otkazi">Otkazi</button></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
  `,
    methods : {
      addRestaurant: function(event){
        event.preventDefault()
        axios.post("/WebShopREST/rest/restaurant/addRestaurant", {
        "name":''+ this.restaurant.name, 
        "type":''+ this.restaurant.type, 
        "street":''+ this.restaurant.street, 
        "number":''+ this.restaurant.number, 
        "city":''+ this.restaurant.city, 
        "zipCode":''+ this.restaurant.zipCode,
        "link":''+ this.restaurant.link, 
        "managerId":''+ this.restaurant.managerId})
        .then(
          response => {
            router.push(`/`);
          } 
        )
        .catch()
      },
      otkazi: function(event){
        event.preventDefault()
        router.push(`/`);
      },
      dodajMenadzera: function(event){
        event.preventDefault()
        router.push(`/dodajMenadzera`);
      },
      formatGeoposition(){
      	this.restaurant.latitude = document.getElementById("latitude").value;
                this.restaurant.longitude = document.getElementById("longitude").value;
                this.restaurant.street = document.getElementById("street").value;
		        this.restaurant.city = document.getElementById("city").value;
		        this.restaurant.number = document.getElementById("number").value;
		        this.restaurant.zipCode = document.getElementById('postalCode').value;
      },
      initMap(){
      var mapOptions = {
                center: new google.maps.LatLng(45.2450573,19.8390942),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.SATELITE
            };
            var infoWindow = new google.maps.InfoWindow();
            var latlngbounds = new google.maps.LatLngBounds();
            var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
            google.maps.event.addListener(map, 'click', function (e) {
                document.getElementById("latitude").value = e.latLng.lat();
                document.getElementById("longitude").value = e.latLng.lng();
            });
            
            var input = document.getElementById('searchInput');
		    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		
		    var autocomplete = new google.maps.places.Autocomplete(input);
		    autocomplete.bindTo('bounds', map);
		
		    var infowindow = new google.maps.InfoWindow();
		    var marker = new google.maps.Marker({
		        map: map,
		        anchorPoint: new google.maps.Point(0, -29)
		    });
		
		    autocomplete.addListener('place_changed', function() {
	        infowindow.close();
	        marker.setVisible(false);
	        var place = autocomplete.getPlace();
	        if (!place.geometry) {
	            window.alert("Autocomplete's returned place contains no geometry");
	            return;
	        }
	  
	        // If the place has a geometry, then present it on a map.
	        if (place.geometry.viewport) {
	            map.fitBounds(place.geometry.viewport);
	        } else {
	            map.setCenter(place.geometry.location);
	            map.setZoom(17);
	        }
	        marker.setIcon(({
	            url: place.icon,
	            size: new google.maps.Size(20, 20),
	            origin: new google.maps.Point(5, 5),
	            anchor: new google.maps.Point(17, 34),
	            scaledSize: new google.maps.Size(20, 20)
	        }));
	        marker.setPosition(place.geometry.location);
	        marker.setVisible(true);
	    
	        var address = '';
	        if (place.address_components) {
	        document.getElementById("city").value = place.address_components[2].long_name;
	        document.getElementById("street").value = place.address_components[1].short_name;
	        document.getElementById("number").value = place.address_components[0].short_name;
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
      
        // Location details
        for (var i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] == 'postal_code'){
                document.getElementById('postalCode').value = place.address_components[i].long_name;
                
            }
        }
        this.info = place.formatted_address;
        document.getElementById("latitude").value = place.geometry.location.lat();
        document.getElementById("longitude").value = place.geometry.location.lng();
        document.getElementById('lat').innerHTML = place.geometry.location.lat();
        document.getElementById('lon').innerHTML = place.geometry.location.lng();
    });
      }
    },
    mounted(){
        axios.get("/WebShopREST/rest/user/getAvailableManagers")
        .then( response => {
            this.managers = response.data
        })
        .catch(function(error){
            console.log(error)
        }),
        this.initMap();
    }
  });