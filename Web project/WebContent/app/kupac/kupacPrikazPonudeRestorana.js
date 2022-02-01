Vue.component("odabraniRestoran-kupac", {
    data(){
        return{
            restaurant: {},
            articals: [],
            idRestaurant: null,
            selectedArtical: {},
            quantity: null,
            articalChart: {idArtical:"", quantity:""},
            previewMap: false,
        }
    },
template: `
    
<div class="containerInfo" >
   
        <div class="row-restaurants">
            <div class = "col-with-picture">
                <div class="col-picture">
                    <div><img v-bind:src="'../pictures/'+restaurant.link" style="height:250px !important; width:300px !important; margin-left: 5em; margin-top: 3em;"></div>
                </div>
            </div>
            <div class="col-info">
                <h4 class="text" style="color: black;margin-top: 3em;">Naziv: {{restaurant.name}}</h4>
                <h4 class="text"style="color: black;" >Tip: {{restaurant.type}}</h4>
                <h4 class="text" style="color: black;">Lokacija: {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}} {{restaurant.address.zipCode}}</h4>
                <h4 class="text" style="color: black;">Status: {{restaurant.status}}</h4>
                <h4 class="text" style="color: black;">Prosecna ocena: {{restaurant.grade}}</h4>
                <button type="button" class="btn btn-success" v-on:click="showComments"> Pogledaj komentare </button>
                <button type="button" class="btn btn-success"   v-on:click="previewMapChooseLocation()"><i></i>See on map</button>
            </div>
            <div id="popup" class="ol-popup">
                <a href="#" id="popup-closer" class="ol-popup-closer"></a>
                <div id="popup-content"></div>
            </div>
            <div id="map" class="map" v-if="previewMap" style="width: 300px;height:300px; margin-right:50px; margin-left:500px;margin-top:20px"></div>
        </div>
       
    <h4 style="margin-left: 5em;  font-weight: bold; "> ARTIKLI:  </h4> 

    
    <div id="artikli" class="tab-pane fade in active">
        <div class="containerInfo">
            <div class="tab-content">
                <div class="panel">
                    <div class="row-artical">
                        <div class="column" v-for="artical in articals" v-on:click="getSelectedArtical(artical)">
                            <div class="card">
                            <img v-bind:src="'../pictures/'+  artical.link" style="height:220px !important; width:260px !important; margin-left: 1.7em" >
                                <div class="container">
                                    <h3>{{artical.name}}</h3>
                                    <p class="title">{{artical.type}}</p>
                                    <p>Cena: {{artical.price}} din</p>
                                    <p>Gramaza: {{artical.quantity}}g</p>
                                     <div style=" word-wrap: break-word; width: 250px; margin-left: 0em ">
                                    Opis: {{artical.description}}
                                    </div>
                                </div>
                                <div>
                                <td><p style="margin-left: 1em">Unesite kolicinu: </p> </td>
                                <td> <input type="number" min="0" v-model="artical.number" @input="dodaj(artical)" style="margin-left: 3em; width: 5em">  </td>
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
        showComments: function() {
            this.$router.push({path: `/prikaziKomentareRestorana`, query:{ id: this.idRestaurant}})
        },
        poruci: function(){

        },
        dodaj: function(artical){
            axios.post("/WebShopREST/rest/articalChart/addNew", artical)
            .then()
            .catch(function(error){
                console.log(error)
            })

        },
        oduzmi:function(idArtical){
            
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
        this.idRestaurant = this.$route.query.id,
        axios.post("/WebShopREST/rest/restaurant/getRestaurant", this.idRestaurant)
        .then( response => {
            this.restaurant = response.data
        })
        .catch(function(error){
            console.log(error)
        }),
        axios.post("/WebShopREST/rest/artical/getAllArticals", this.idRestaurant)
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