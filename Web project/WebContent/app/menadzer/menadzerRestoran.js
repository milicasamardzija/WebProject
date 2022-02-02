Vue.component("restoran-menadzer", {
    data(){
        return{
            restaurant: {},
            articals: [],
            previewMap: false,
        }
    },
template: `
    
<div class="containerInfo" >
   
        <div class="row-restaurants">
            <div class = "col-with-picture">
                <div class="col-picture">
                    <div><img v-bind:src="'../pictures/'+restaurant.link" style="height:250px !important; width:300px !important; margin-left: 1.6em"></div>
                </div>
            </div>
            <div class="col-info">
                <h4 class="text" style="color: black; margin-left: 2em">Id: {{restaurant.id}}</h4>
                <h4 class="text" style="color: black; margin-left: 2em">Naziv: {{restaurant.name}}</h4>
                <h4 class="text"style="color: black; margin-left: 2em" >Tip: {{restaurant.type}}</h4>
                <h4 class="text" style="color: black; margin-left: 2em">Lokacija: {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}} {{restaurant.address.zipCode}}  ({{restaurant.address.latitude}} , {{restaurant.address.longitude}})</h4>
                <h4 class="text" style="color: black; margin-left: 2em">Status: {{restaurant.status}}</h4>
                <h4 class="text" style="color: black; margin-left: 2em">Prosecna ocena: {{restaurant.grade}}</h4>
                <button type="button" class="btn btn-success" v-on:click="dodaj(restaurant.id)" style="margin-left: 2em">Dodaj artikal </button>
            </div>
            <div id="popup" class="ol-popup">
                <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                <div id="popup-content"></div>
            </div>
            <div id="map" class="map" v-if="previewMap" style="width: 600px;height:300px; margin-right:50px; margin-left:500px;margin-top:20px"></div>
        </div>
       
    <h4 style="margin-left: 15px;  font-weight: bold; "> ARTIKLI:  </h4> 

    
    <div id="artikli" class="tab-pane fade in active">
        <div class="containerInfo">
            <div class="tab-content">
                <div class="panel">
                    <div class="row-artical">
                        <div class="column" v-for="artical in articals" v-on:click="getSelectedArtical(artical)" style="width: 340px; margin-bottom: 16px;
    padding: 0 7px;">
                            <div class="card" style="width: 300px">
                            <img v-bind:src="'../pictures/'+  artical.link" style="height:220px !important; width:250px !important; margin-left: 1.8em" >
                                <div class="container">
                                    <h3 style="font-weight: bold;margin-left: 1em">{{artical.name}}</h3>
                                    <p class="title" style="margin-left: 1.8em">{{artical.type}}</p>
                                    <p style="margin-left: 1.8em">Cena: {{artical.price}} din</p>
                                    <p style="margin-left: 1.8em">Gramaza: {{artical.quantity}}g</p>
                                    <div style=" word-wrap: break-word; width: 200px; margin-left: 1.8em ">
                                    Opis: {{artical.description}}
 										</div>
                                    <table style=" margin-left: 2px;width:300px">
                                    <tr>
                                      <td> <button style="width:70px;  margin-left: 1.6em; margin-bottom: 1em" class="button" v-on:click="izmeni(artical.id)" >Izmeni</button></td>
                                    
                                    <td> <button class="button" style="width:70px;  margin-left: 1.6em; margin-bottom: 1em" v-on:click="izbrisi(artical)" >Izbrisi</button></td>
                                    </tr>
                                    
                                     </table> 
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
</div>   

`,
methods:{
        getSelectedArtical: function(artical){
        this.selectedArtical = artical;
        },
        dodaj: function(idR){
            this.$router.push({path: `/dodajArtikal`, query:{ id: idR}})
        },
        izmeni: function(idA){
            this.$router.push({path: `/izmeniArtikal`, query:{ id: idA}})
        },
        izbrisi: function(idA){
            axios.post("/WebShopREST/rest/artical/deleteArtical", idA.id).then(
                response => {
                   this.$router.go();
                 } ).catch(function(error){
                console.log(error)
            })
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
                  center: ol.proj.fromLonLat([this.restaurant.address.longitude, this.restaurant.address.latitude]),
                  maxZoom: 18,
                  zoom: 12
                })
              })

              var layer = new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: [
                        new ol.Feature({
                            geometry: new ol.geom.Point(ol.proj.fromLonLat([this.restaurant.address.longitude, this.restaurant.address.latitude]))
                        })
                    ]
                })
            });
            map.addLayer(layer);

            var container = document.getElementById('popup');
            var content = document.getElementById('popup-content');
            var closer = document.getElementById('popup-closer');
  
            var overlay = new ol.Overlay({
                element: container,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            map.addOverlay(overlay);
  
            closer.onclick = function() {
                overlay.setPosition(undefined);
                closer.blur();
                return false;
            };
  
            map.on('singleclick', function (event) {
              if (map.hasFeatureAtPixel(event.pixel) === true) {
                  var coordinate = event.coordinate;
  
                  content.innerHTML =  this.restaurant.name;
                  overlay.setPosition(coordinate);
              } else {
                  overlay.setPosition(undefined);
                  closer.blur();
              }
          });
  
          content.innerHTML = this.restaurant.name;
          overlay.setPosition(ol.proj.fromLonLat([this.restaurant.address.longitude, this.restaurant.address.latitude]));

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
        axios.get("/WebShopREST/rest/restaurant/getRestaurantManager")
        .then( response => {
            this.restaurant = response.data
        })
        .catch(function(error){
            console.log(error)
        }),
        axios.get("/WebShopREST/rest/artical/getAllArticalsManager")
        .then( response => {
            this.articals = response.data
        })
        .catch(function(error){
            console.log(error)
        }),
        this.$nextTick(function () {
            this.init();
            this.previewMap = true;
            this.previewMapChooseLocation();
        })
}
});