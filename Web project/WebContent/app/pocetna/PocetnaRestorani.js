Vue.component("restaurants", {
    data(){
        return{
            restaurants:[], 
            selected:null,
            search: {name:"", location:"", type:"", grade:""}
        }
    },
template: `
    
        <div>
                        <table style="margin-left: 200px; margin-top: 20px;" >
                          <tr> 
                            <td style="width: 250px"> <input style="width: 150px" type="text" class="form-control search-slt" placeholder="Naziv" v-model="search.name"> </td>
                            <td style="width: 250px" > <input style="width: 150px"  type="text" class="form-control search-slt" placeholder="Lokacija" v-model="search.location"> </td>
                              <td style="width: 300px"> 
                                
                                                    <select v-model="search.type">Tip
                                                    <option  v-bind:value="0">Italijanski</option>
                                                    <option  v-bind:value="1">Kineski</option>
                                                    <option  v-bind:value="2">Pica</option>
                                                    <option  v-bind:value="3">Rostilj</option>
                                                    <option  v-bind:value="4">Riblji</option>
                                                    <option  v-bind:value="5">Veganski</option>
                                                    </select>
                                
                            </td>
                              <td style="width: 250px"> 
                            
                              <select  v-model="search.grade"> Ocena
                              <option  v-bind:value="5">5</option>
                              <option  v-bind:value="4">4</option>
                              <option  v-bind:value="3">3</option>
                              <option  v-bind:value="2">2</option>
                              <option  v-bind:value="1">1</option>
                              </select>
                           
                            </td>
                            <td style="width: 250px"> <button type="button" class="btn btn-danger wrn-btn btn-search" v-on:click="pretrazi()">Search</button></td>
                         
                            </tr>
                        </table>

               
             
                        <table style="margin-left: 200px; margin-top: 20px;">
                          <tr> 
                            <td style="width:500px "> <p> Ukoliko zelite da filtrirate prikaz restorana,  izaberite odgovarajuci tip: </p></td>
                            <td>       <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
                          Tip restorana </button>
                     
                              <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                              <button class="dropdown-item" type="button" value="ITALIAN" v-on:click="filterType('ITALIAN')">Italijanski</button>
                              <button class="dropdown-item" type="button" value="CHINESE" v-on:click="filterType('CHINESE')">Kineski</button>
                              <button class="dropdown-item" type="button" value="PIZZA" v-on:click="filterType('PIZZA')">Pica</button>
                              <button class="dropdown-item" type="button" value="BARBECUE" v-on:click="filterType('BARBECUE')">Rostilj</button>
                              <button class="dropdown-item" type="button" value="FISH" v-on:click="filterType('FISH')">Riblji</button>
                              <button class="dropdown-item" type="button" value="VEGE" v-on:click="filterType('VEGE')">Veganski</button>
                              </span> </td>
                            <td style="width: 25px;"> </td>
                              <td style="width:150px "> <p> ili status restorana</p></td>
                              <td > <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" > Status restorana </button>
                                <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button class="dropdown-item" type="button" value="OPEN"  v-on:click="filterStatus('OPEN')">Otvoren</button>
                                <button class="dropdown-item" type="button" value="CLOSE" v-on:click="filterStatus('CLOSE')">Zatvoren</button>
                                </span>
                             </td>
                        </tr> 
                        </table>

                         <!-- za sortiranje-->
                      <table style="margin-left: 200px; margin-top: 20px;">
                            <tr> 
                              <td style="width: 500px;"> <p> Ukoliko zelite da sortirate prikaz, izaberite odgovarajuci kriterijum: </p></td>
                              <td style="margin-left: 30px;">    <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
                            Sortiranje</button>
                        
                                  <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                  <button class="dropdown-item" type="button" v-on:click="sortNameAsc()">Po nazivu rastuce</button>
                                  <button class="dropdown-item" type="button" v-on:click="sortNameDesc()" >Po nazivu opadajuce</button>
                                  <button class="dropdown-item" type="button" v-on:click="sortCityAsc()">Po mestu rastuce</button>
                                  <button class="dropdown-item" type="button" v-on:click="sortCityDesc()">Po mestu opadajuce</button>
                                  <button class="dropdown-item" type="button" v-on:click="sortGradeAsc()">Po oceni rastuce</button>
                                  <button class="dropdown-item" type="button" v-on:click="sortGradeDesc()">Po oceni opadajuce</button>
                                  </span> </td>
                            
                            </tr > 
                            
                      </table>
              
            
            <div id="restoraniPrikaz"> 
               <div class=" tab-pane container active">
                    <div class="row-restaurants" v-for="restaurant in restaurants" v-on:click="getSelected(restaurant)">
                        <div class = "col-with-picture">
                            <div class="col-picture">
                                <div><img v-bind:src="'pictures/'+restaurant.link" style="height:250px !important; width:300px !important" v-on:click="goToRestaurant(restaurant.id)"></div>
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
    </div>

`,
methods:{
        getSelected: function(restaurant){
        this.selected= restaurant;
        },
        goToRestaurant : function (idRest) {
            this.$router.push({path: `/restoran`, query:{ id:idRest}})
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

        sortNameAsc: function() {
			function compare(a, b) {
			  if (a.name < b.name)
			    return -1;
			  if (a.name > b.name)
			    return 1;
			  return 0;
			}

			return this.restaurants.sort(compare);
		}, 
		sortNameDesc: function() {
			function compare(a, b) {
			  if (a.name < b.name)
			    return 1;
			  if (a.name > b.name)
			    return -1;
			  return 0;
			}
			
			return this.restaurants.sort(compare);
		},
        sortGradeAsc: function() {
			function compare(a, b) {
			  if (a.grade < b.grade)
			    return -1;
			  if (a.grade > b.grade)
			    return 1;
			  return 0;
			}

			return this.restaurants.sort(compare);
		}, 
		sortGradeDesc: function() {
			function compare(a, b) {
			  if (a.grade < b.grade)
			    return 1;
			  if (a.grade > b.grade)
			    return -1;
			  return 0;
			}
			
			return this.restaurants.sort(compare);
		},
        sortCityAsc: function() {
			function compare(a, b) {
			  if (a.address.city < b.address.city)
			    return -1;
			  if (a.address.city > b.address.city)
			    return 1;
			  return 0;
			}

			return this.restaurants.sort(compare);
		}, 
		sortCityDesc: function() {
			function compare(a, b) {
			  if (a.address.city < b.address.city)
			    return 1;
			  if (a.address.city > b.address.city)
			    return -1;
			  return 0;
			}
			
			return this.restaurants.sort(compare);
		},
        filterType: function (type){
            this.restaurants = this.restaurants.filter(restaurant => restaurant.type === type);
        },
        filterStatus: function (status){
            this.restaurants = this.restaurants.filter(restaurant => restaurant.status === status);
        }
},
computed: {
    sortedName: function() {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }
  
      return this.restaurants.sort(compare);
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