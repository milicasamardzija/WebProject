Vue.component("restorani-kupac", {
    data(){
        return{
            restaurants:[], 
            selected:null,
            search: {name:"", location:"", type:6, grade:""}
        }
    },
template: `
<div class="containerInfo">

	<!--pretraga-->
	<div class="row" style="width:1400px !important; margin-left:8%;">
		<div class="col-lg-12">
					    <div class="row" style="width:1400px !important;">
										        <div class="col-lg-2 col-md-3 col-sm-12 p-0 search">
										            <input type="text" class="form-control search-slt" placeholder="Naziv restorana" v-model="search.name">
										        </div>
										        <div class="col-lg-2 col-md-3 col-sm-12 p-0 search" >
										            <input type="text" class="form-control search-slt" placeholder="Lokacija restorana" v-model="search.location">
										        </div>
                                                <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                                                    <select v-model="search.type" style="height: 35px; width: 150px; background-color:#6c757d; color:white;  border-radius: 4px;">Tip
                                                     <option value=6>Tip restorana</option>
                                                    <option  v-bind:value="0" style=" background-color:white; color: black">Italijanski</option>
                                                    <option  v-bind:value="1" style=" background-color:white; color: black">Kineski</option>
                                                    <option  v-bind:value="2" style=" background-color:white; color: black">Pica</option>
                                                    <option  v-bind:value="3" style=" background-color:white; color: black">Rostilj</option>
                                                    <option  v-bind:value="4" style=" background-color:white; color: black">Riblji</option>
                                                    <option  v-bind:value="5" style=" background-color:white; color: black">Veganski</option>
                                                    </select>
                                                   
                                                </div>
                                                <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                                                    <select v-model="search.grade" style="height: 35px; width: 150px; background-color:#6c757d; color:white;  border-radius: 4px;"> Ocena
                                                     <option value="">Ocena</option>
                                                    <option  v-bind:value="5" style=" background-color:white; color: black">5</option>
                                                    <option  v-bind:value="4" style=" background-color:white; color: black">4</option>
                                                    <option  v-bind:value="3" style=" background-color:white; color: black">3</option>
                                                    <option  v-bind:value="2" style=" background-color:white; color: black">2</option>
                                                    <option  v-bind:value="1" style=" background-color:white; color: black">1</option>
                                                    </select>
                                                    </div>
                                                
                                                <div class="col-lg-1 col-md-3 col-sm-12 btn-search">
                                                    <button type="button" class="btn btn-danger wrn-btn" v-on:click="pretrazi()">Pretrazi kombinovano</button>
                                                </div>
					    </div>
		</div>
	</div>
		
		
		
		            <div class=" tab-pane container active">
			                <div class="row-restaurants" v-for="restaurant in restaurants" v-on:click="getSelected(restaurant)" >
			                    <div class = "col-with-picture">
			                        <div class="col-picture">
			                            <div><img v-bind:src="'../pictures/'+restaurant.link" style="height:250px !important;border-radius: 4px; width:300px !important" v-on:click="goToRestaurant(restaurant.id)"></div>
			                        </div>
			                    </div>
			                    <div class="col-info">
			                        <h4 style="width: 600px;" class="text">Naziv:  {{restaurant.name}}</h4>
			                        <h4 style="width: 600px;" class="text">Tip:  {{restaurant.type}}</h4>
			                        <h4 style="width: 600px;" class="text">Lokacija:  {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}} ({{restaurant.address.latitude}} , {{restaurant.address.longitude}})</h4>
			                        <h4 style="width: 600px;" class="text">Prosecna ocena: {{restaurant.grade}}</h4>
			                    </div>
			                    <div class="buttons">
			                        <div class="buttons btn-group-vertical">
			                            <button style="width:100px; margin-top:10px;" type="button" class="btn btn-secondary" v-on:click="goToRestaurant(restaurant.id)">Porucivanje</button>
			                        </div>
			                    </div>
			                </div>
		             </div>
</div>   
`,
methods:{
        getSelected: function(restaurant){
        this.selected= restaurant;
        },
        goToRestaurant : function (idR) {
            this.$router.push({path: `/restoran`, query:{ id: idR}})
        },
        pretrazi: function(){
            axios.post('/WebShopREST/rest/restaurant/searchRestaurants', this.search)
            .then(response => {
               this.restaurants = response.data
            })
            .catch(function(error){
                console.log(error)
            })
        },
},
mounted(){
    axios.get("/WebShopREST/rest/restaurant/getAllRestaurants")
      .then( response => {
          this.restaurants = response.data
      })
      .catch(function(error){
          console.log(error)
      })
}
})