Vue.component("restoran-menadzer", {
    data(){
        return{
            restaurant: {},
            articals: []
        }
    },
template: `
    
<div class="containerInfo" >
   
        <div class="row-restaurants">
            <div class = "col-with-picture">
                <div class="col-picture">
                    <div><img v-bind:src="'../pictures/'+restaurant.link" style="height:250px !important; width:300px !important"></div>
                </div>
            </div>
            <div class="col-info">
                <h4 class="text" style="color: black;">Id: {{restaurant.id}}</h4>
                <h4 class="text" style="color: black;">Naziv: {{restaurant.name}}</h4>
                <h4 class="text"style="color: black;" >Tip: {{restaurant.type}}</h4>
                <h4 class="text" style="color: black;">Lokacija: {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}} {{restaurant.address.zipCode}}</h4>
                <h4 class="text" style="color: black;">Status: {{restaurant.status}}</h4>
                <h4 class="text" style="color: black;">Prosecna ocena: {{restaurant.grade}}</h4>
                <button type="button" class="btn btn-success" v-on:click="dodaj(restaurant.id)">Dodaj artikal </button>
            </div>
        </div>
       
    <h4 style="margin-left: 15px;  font-weight: bold; "> ARTIKLI:  </h4> 

    
    <div id="artikli" class="tab-pane fade in active">
        <div class="containerInfo">
            <div class="tab-content">
                <div class="panel">
                    <div class="row-artical">
                        <div class="column" v-for="artical in articals" v-on:click="getSelectedArtical(artical)">
                            <div class="card">
                            <img v-bind:src="'../pictures/'+  artical.link" style="height:280px !important; width:320px !important" >
                                <div class="container">
                                    <h2>{{artical.name}}</h2>
                                    <p class="title">{{artical.type}}</p>
                                    <p>Cena: {{artical.price}} din</p>
                                    <p>Gramaza: {{artical.quantity}}g</p>
                                    <p>Opis: {{artical.description}}</p>
                                    <button class="button" v-on:click="izmeni(artical.id)">Izmeni</button>
                                    <button class="button" v-on:click="izbrisi(artical.id)">Izbrisi</button>
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
            
        },

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
        })
}
});