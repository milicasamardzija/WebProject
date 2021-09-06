Vue.component("administrator-restaurants", {
    data(){
        return{
            restaurants:[], 
            selected:null
        }
    },
template: `
<div class="containerInfo">

	<!--pretraga-->
	<div class="row" style="width:1400px !important; margin-left:30px;">
		<div class="col-lg-12">
					    <div class="row" style="width:1400px !important;">
										        <div class="col-lg-2 col-md-3 col-sm-12 p-0 search">
										            <input type="text" class="form-control search-slt" placeholder="Naziv restorana">
										        </div>
										        <div class="col-lg-2 col-md-3 col-sm-12 p-0 search" >
										            <input type="text" class="form-control search-slt" placeholder="Lokacija restorana">
										        </div>
                                                <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
                                                    Tip restorana
                                                    </button>
                                                    <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    <button class="dropdown-item" type="button">Action</button>
                                                    <button class="dropdown-item" type="button">Another action</button>
                                                    <button class="dropdown-item" type="button">Something else here</button>
                                                    </span>
                                                </div>
                                                <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                                                    <button class="btn btn-secondary dropdown-toggle filters" type="button" data-toggle="dropdown">
                                                    Ocena restorana
                                                    </button>
                                                    <div class="dropdown-menu">
                                                    <button class="dropdown-item" type="button">Action</button>
                                                    <button class="dropdown-item" type="button">Another action</button>
                                                    <button class="dropdown-item" type="button">Something else here</button>
                                                    </div>
                                                </div>
                                                <div class="col-lg-1 col-md-3 col-sm-12 btn-search">
                                                    <button type="button" class="btn btn-danger wrn-btn">Pretrazi kombinovano</button>
                                                </div>
                                                <div class="col-lg-1 col-md-3 col-sm-12 btn-search">
                                                    <button v-on:click= "addRestaurant" style= "margin-left: 70px; width:40px" type="button" class="btn btn-danger wrn-btn  col-lg-1 col-md-3 col-sm-12"><span class="glyphicon glyphicon-plus"></span></button>
                                                </div>
					    </div>
		</div>
	</div>
		
		
		
		            <div class="rest tab-pane container active">
			                <div class="row-restaurants" v-for="restaurant in restaurants" v-on:click="getSelected(restaurant)" >
			                    <div class = "col-with-picture">
			                        <div class="col-picture">
			                            <div class="imageRest"></div>
			                        </div>
			                    </div>
			                    <div class="col-info">
			                        <h4 class="text">Naziv:  {{restaurant.name}}</h4>
			                        <h4 class="text">Tip:  {{restaurant.type}}</h4>
			                        <h4 class="text">Lokacija:  {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}}</h4>
			                        <h4 class="text">Prosecna ocena: </h4>
			                    </div>
			                    <div class="buttons">
			                        <div class="buttons btn-group-vertical">
			                            <button type="button" class="btn btn-secondary" style="padding-top:10px;">Dodaj menazera</button>
			                            <button type="button" class="btn btn-secondary" style="padding-top:10px;">Izmeni</button>
			                            <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#brisanje" v-on:click="getSelected(restaurant)" style="padding-top:10px;">Izbrisi</button>
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