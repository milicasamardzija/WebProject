Vue.component("indexRest", {
    data(){
        return{
            restaurants:[], 
            selected:null
        }
    },
template: `
<div class="containerInfo">
		
		            <div class=" tab-pane container active">
			                <div class="row-restaurants" v-for="restaurant in restaurants" v-on:click="getSelected(restaurant)" >
			                    <div class = "col-with-picture">
			                        <div class="col-picture">
			                            <div><img v-bind:src="'../pictures/'+restaurant.link" style="height:250px !important; width:300px !important" v-on:click="goToRestaurant"></div>
			                        </div>
			                    </div>
			                    <div class="col-info">
			                        <h4 style="width: 600px;" class="text">Naziv:  {{restaurant.name}}</h4>
			                        <h4 style="width: 600px;" class="text">Tip:  {{restaurant.type}}</h4>
			                        <h4 style="width: 600px;" class="text">Lokacija:  {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}}</h4>
			                        <h4 style="width: 600px;" class="text">Prosecna ocena: {{restaurant.grade}}</h4>
			                    </div>
			                </div>
		            </div>    
                
</div>   
`,
methods:{
        getSelected: function(restaurant){
        this.selected= restaurant;
        },
        goToRestaurant : function () {
            this.$router.push({path: `/restoran`, query:{ id: this.selected.id}})
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