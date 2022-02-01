Vue.component("administrator-addRestaurant", {
    data:function(){
        return{
          restaurant:{},
          managers:[],
          previewMap: false,
          address:{}
        }
    }, 
    template: `
 
    <div class="containerInfo t"> 
    <div id="map" class="map" v-if="previewMap" style="width: 600px;height:600px; margin-left:500px"></div>
      <div class="information">
        <form>
            <table class="t">
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
                <td><input class="form-control" type="text" placeholder="Ulica" v-model="address.street"  id="streetID"></td>
                <td class="buttonMap"><button type="button" class="btn btn-success"   v-on:click="previewMapChooseLocation()"><i></i>Choose on map</button></td>
                </tr>
                <tr>
                <td class="labela">Broj:</td>
                <td><input class="form-control" type="text" placeholder="Broj" v-model="address.number"  id="numberID"></td>
                </tr>
                <tr>
                <td class="labela">Grad:</td>
                <td><input class="form-control" type="text" placeholder="Grad" v-model="address.city"  id="cityID"></td>
                </tr>
                <tr>
                <td class="labela">Postanski broj:</td>
                <td><input class="form-control" type="text" placeholder="Postanski broj" v-model="address.zipCode"  id="zipcodeID"></td>
                </tr>
                <tr>
                <td class="labela">Geografskia sirina:</td>
                <td><input class="form-control" type="text" placeholder="Geografskia sirina" id="latitudeID"  v-model="address.latitude"></td>
                </tr>
                <tr>
                <td class="labela">Geografska duzina:</td>
                <td><input class="form-control" type="text" placeholder="Geografska duzina" id="longitudeID"  v-model="address.longitude" ></td>
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
        "street":''+ this.address.street, 
        "number":''+ this.address.number, 
        "city":''+ this.address.city, 
        "zipCode":''+ this.address.zipCode,
        "latitude": '' + this.address.latitude,
        "longitude": '' + this.address.longitude,
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
       init: function(){
        const map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([19.41, 44.82]),
            zoom: 8
          })
        })

         /* map.on('click', function (evt) {
            console.log(evt.coordinate);
           // alert(evt.coordinate);

            var coord = ol.proj.toLonLat(evt.coordinate);
            reverseGeocode(coord);

      })*/
    
      map.on('click', function (evt) {          
        var coord = ol.proj.toLonLat(evt.coordinate);
        reverseGeocode(coord);
        this.$emit('change-address', this.address);
  })
    },
      previewMapChooseLocation: function () {
        this.previewMap = !this.previewMap;
        if (this.previewMap) {
            // Draw map on screen
            this.$nextTick(function () {
                this.init();

                // Seting some extra style for map
                let c = document.getElementById("map").childNodes;
                c[0].style.borderRadius  = '10px';
                c[0].style.border = '4px solid lightgrey';
            })
        }
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
      this.$nextTick(function () {
        this.init();
    })
    }
  });

  /**
 * From coords get real address and put that value in form. 
 * @param coords cords (x,y)
 */
function reverseGeocode(coords) {
  fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
      .then(function (response) {
          return response.json();
      }).then(function (json) {
         /* // LATITUDE & LONGITUDE
          console.log(coords);
          document.getElementById("longitudeID").value = coords[0];
          document.getElementById("latitudeID").value = coords[1];

          // TOWN 
          console.log(json.address);
          if (json.address.city) {
              document.getElementById("townID").value = json.address.city;
          }

          // STREET
          if (json.address.street) {
              document.getElementById("streetID").value = json.address.street;
          }

          // NUMBER OF HOUSE
          if (json.address.number) {
              document.getElementById("numberID").value = json.address.number;
          }

          // ZIP CODE
          if(json.address.zipCode){
              document.getElementById("zipcodeID").value = json.address.zipCode;
          }*/

          let elem = document.getElementById("longitudeID");
            elem.value = coords[0].toFixed(2);
            elem.dispatchEvent(new Event('input'));
            
            let el = document.getElementById("latitudeID");
                el.value = coords[1].toFixed(2);
                el.dispatchEvent(new Event('input'));
                
            if (json.address.road) {
                let el = document.getElementById("streetID");
                el.value = json.address.road;
                el.dispatchEvent(new Event('input'));
            } 

            if(json.address.streetNumber){
                let el = document.getElementById("numberID");
                el.value = json.address.number;
                el.dispatchEvent(new Event('input'));
            }

            if (json.address.city) {
                let el = document.getElementById("cityID");
                el.value = json.address.city;
                el.dispatchEvent(new Event('input'));
             } else if (json.address.city_district) {
                let el = document.getElementById("cityID");
                el.value = json.address.city_district;
                el.dispatchEvent(new Event('input'));
            }
                
            if (json.address.postcode) {
                let el = document.getElementById("zipcodeID");
                el.value = json.address.postcode;
                el.dispatchEvent(new Event('input'));
            } 
              
          });

           const util = require('util')
           console.log(util.inspect(this.address, false, null, true)) 

     // });
    }