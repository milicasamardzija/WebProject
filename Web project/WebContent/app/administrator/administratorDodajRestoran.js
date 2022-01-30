Vue.component("administrator-addRestaurant", {
    data:function(){
        return{
          restaurant:{},
          managers:[],
          previewMap: false
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
                <td><input class="form-control" type="text" placeholder="Ulica" v-model="restaurant.street"  id="streetID"></td>
                <td class="buttonMap"><button type="button" class="btn btn-success"   v-on:click="previewMapChooseLocation()"><i></i>Choose on map</button></td>
                </tr>
                <tr>
                <td class="labela">Broj:</td>
                <td><input class="form-control" type="text" placeholder="Broj" v-model="restaurant.number"  id="numberID"></td>
                </tr>
                <tr>
                <td class="labela">Grad:</td>
                <td><input class="form-control" type="text" placeholder="Grad" v-model="restaurant.city"  id="townID"></td>
                </tr>
                <tr>
                <td class="labela">Postanski broj:</td>
                <td><input class="form-control" type="text" placeholder="Postanski broj" v-model="restaurant.zipCode"  id="zipcodeID"></td>
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

            <!-- I use those inputs field for geting data from map -->
            <input type="text" id="latitudeID"  v-model="restaurant.latitude" hidden> 
            <input type="text" id="longitudeID"  v-model="restaurant.longitude" hidden>
            <!-- End of getind data for long i lat -->

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
        "latitude": '' + this.restaurant.latitude,
        "longitude": '' + this.restaurant.longitude,
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

          map.on('click', function (evt) {
            console.log(evt.coordinate);
           // alert(evt.coordinate);

            var coord = ol.proj.toLonLat(evt.coordinate);
            reverseGeocode(coord);

      })},
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
          // LATITUDE & LONGITUDE
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
          }

      });
    }