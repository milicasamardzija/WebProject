Vue.component("administrator-restaurants", {
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
	<div class="row" style="width:1400px !important; margin-left:7%;">
		<div class="col-lg-12">
					    <div class="row" style="width:1400px !important;">
                        <form>
										        <div class="col-lg-2 col-md-3 col-sm-12 p-0 search">
										            <input type="text" class="form-control search-slt" placeholder="Naziv restorana" v-model="search.name">
										        </div>
										        <div class="col-lg-2 col-md-3 col-sm-12 p-0 search" >
										            <input type="text" class="form-control search-slt" placeholder="Lokacija restorana"  v-model="search.location">
										        </div>
                                                <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                                                    <select v-model="search.type" style="height: 35px; width: 150px; background-color:gray; color:white;  border-radius: 4px;">Tip
                                                     <option value="">Tip restorana</option>
                                                    <option  v-bind:value="0" style=" background-color:white; color: black">Italijanski</option>
                                                    <option  v-bind:value="1" style=" background-color:white; color: black">Kineski</option>
                                                    <option  v-bind:value="2" style=" background-color:white; color: black">Pica</option>
                                                    <option  v-bind:value="3" style=" background-color:white; color: black">Rostilj</option>
                                                    <option  v-bind:value="4" style=" background-color:white; color: black">Riblji</option>
                                                    <option  v-bind:value="5" style=" background-color:white; color: black">Veganski</option>
                                                    </select>
                                                </div>
                                                <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                                                <select  v-model="search.grade" style="height: 35px; width: 150px; background-color:gray; color:white;  border-radius: 4px;"> Ocena
                                                     <option value="">Ocena</option>
                                                    <option  v-bind:value="5" style=" background-color:white; color: black">5</option>
                                                    <option  v-bind:value="4" style=" background-color:white; color: black">4</option>
                                                    <option  v-bind:value="3" style=" background-color:white; color: black">3</option>
                                                    <option  v-bind:value="2" style=" background-color:white; color: black">2</option>
                                                    <option  v-bind:value="1" style=" background-color:white; color: black">1</option>
                                                    </select>
                                                </div>
                                                <div class="col-lg-1 col-md-3 col-sm-12 btn-search">
                                                    <button type="button" class="btn btn-danger wrn-btn" v-on:click="kombinovanaPretraga">Pretrazi kombinovano</button>
                                                </div>
                                                <div class="col-lg-1 col-md-3 col-sm-12 btn-search">
                                                    <button v-on:click= "addRestaurant" style= "margin-left: 70px; width:40px" type="button" class="btn btn-danger wrn-btn  col-lg-1 col-md-3 col-sm-12"><span class="glyphicon glyphicon-plus"></span></button>
                                                </div>
                        </form>
					    </div>
		</div>
	</div>
		
		
		
		            <div class=" tab-pane container active">
			                <div class="row-restaurants" v-for="restaurant in restaurants" v-if="restaurant.status == 'OTVOREN'" v-on:click="getSelected(restaurant)" >
			                    <div class = "col-with-picture">
			                        <div class="col-picture">
			                            <div><img v-bind:src="'../pictures/'+restaurant.link" style="height:250px !important; width:300px !important" v-on:click="goToRestaurant(restaurant.id)"></div>
			                        </div>
			                    </div>
			                    <div class="col-info">
			                        <h4 style="width: 600px;" class="text">Naziv:  {{restaurant.name}}</h4>
			                        <h4 style="width: 600px;" class="text">Tip:  {{restaurant.type}}</h4>
			                        <h4 style="width: 600px;" class="text">Lokacija:  {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}} ({{restaurant.address.latitude}} , {{restaurant.address.longitude}})</h4>
			                        <h4 style="width: 600px;" class="text">Prosecna ocena: {{restaurant.grade}}</h4>
                                    <h4 style="width: 600px;" class="text">Status: {{restaurant.status}}</h4>
			                    </div>
			                    <div class="buttons">
			                        <div class="buttons btn-group-vertical">

			                            <button style="width:100px; margin-top:10px;" type="button" class="btn btn-secondary" v-on:click="changeRestaurant" >Izmeni</button>
			                            <button style="width:100px;  margin-top:10px;" type="button" class="btn btn-danger" data-toggle="modal" data-target="#brisanje" v-on:click="getSelected(restaurant)" style="padding-top:10px;">Izbrisi</button>

			                        </div>
			                    </div>
			                    
			                </div>
			                  <hr/>
			                  
			                  <div class="row-restaurants" v-for="restaurant in restaurants" v-if="restaurant.status == 'ZATVOREN'" v-on:click="getSelected(restaurant)" >
			                    <div class = "col-with-picture">
			                        <div class="col-picture">
			                            <div><img v-bind:src="'../pictures/'+restaurant.link" style="height:250px !important; width:300px !important" v-on:click="goToRestaurant(restaurant.id)"></div>
			                        </div>
			                    </div>
			                    <div class="col-info">
			                        <h4 style="width: 600px;" class="text">Naziv:  {{restaurant.name}}</h4>
			                        <h4 style="width: 600px;" class="text">Tip:  {{restaurant.type}}</h4>
			                        <h4 style="width: 600px;" class="text">Lokacija:  {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}} ({{restaurant.address.latitude}} , {{restaurant.address.longitude}})</h4>
			                        <h4 style="width: 600px;" class="text">Prosecna ocena: {{restaurant.grade}}</h4>
                                    <h4 style="width: 600px;" class="text">Status: {{restaurant.status}}</h4>
			                    </div>
			                    <div class="buttons">
			                        <div class="buttons btn-group-vertical">

			                            <button style="width:100px; margin-top:10px;" type="button" class="btn btn-secondary" v-on:click="changeRestaurant" >Izmeni</button>
			                            <button style="width:100px;  margin-top:10px;" type="button" class="btn btn-danger" data-toggle="modal" data-target="#brisanje" v-on:click="getSelected(restaurant)" style="padding-top:10px;">Izbrisi</button>

			                        </div>
			                    </div>
			                    
			                </div>
		             </div>
	            

                        
            <!-- modal obrisi-->
            <div class="modal fade" id="brisanje" role="dialog" >
                    <div class="modal-dialog" style="width: 300px;" >
                        <!-- Modal content -->
                        <div class="modal-content">
                            <div class="modal-header" style="padding:35px 50px;">
                            <h5 class="modal-title" id="exampleModalLabel">Brisanje</h5>
                            </div>
                            <div class="modal-body"  style="padding:40px 50px;">
                                <form role="form" @submit="deleteRestaurant">
                                <div> <p> Da li ste sigurni da zelite da obrisete?</p></div>
                                    <button type="submit" class="btn btn-danger btn-block" v-on:click="deleteRestaurant"><span class="glyphicon glyphicon-off"></span> Obrisi</button>
                                </form>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-danger btn-default pull-left"  data-dismiss="modal">Odustani</button>   
                            </div>
                        </div>
                    </div>
            </div>     
                
</div>   
`,
methods:{
	    deleteRestaurant: function(){
            axios.post('/WebShopREST/rest/restaurant/deleteRestaurant', this.selected.id)
            .then(response => {
                router.push(`/`);
            })
            .catch(function(error){
                console.log(error)
            })
        }, 
        addRestaurant : function () {
            router.push(`/dodajRestoran`)
        }, 
        changeRestaurant : function () {
          this.$router.push({path: `/izmeniRestoran`, query:{ id: this.selected.id}})
        },
        getSelected: function(restaurant){
        this.selected= restaurant;
        },
        goToRestaurant : function (idRest) {
            this.$router.push({path: `/restoran`, query:{ id: idRest}})
        },
        kombinovanaPretraga: function(){
            axios.post('/WebShopREST/rest/restaurant/searchMix', this.search)
            .then(response => {
               this.restaurants = response.data
            })
            .catch(function(error){
                console.log(error)
            })
        }
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
});