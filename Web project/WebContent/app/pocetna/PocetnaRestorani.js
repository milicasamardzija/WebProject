Vue.component("restaurants", {
    data(){
        return{
            restaurants:[], 
            selected:null
        }
    },
template: `
    
                  <div>
                      <table style="margin-left: 200px; margin-top: 20px;" >
                          <tr> 
                            <td style="width: 250px"> <input style="width: 150px" type="text" class="form-control search-slt" placeholder="Naziv"> </td>
                            <td style="width: 250px" > <input style="width: 150px"  type="text" class="form-control search-slt" placeholder="Lokacija"> </td>
                              <td style="width: 300px"> 
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
                                    Tip restorana
                                </button>
                                <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                  <button class="dropdown-item" type="button" value="ITALIAN">Italijanski</button>
                                  <button class="dropdown-item" type="button" value="CHINESE">Kineski</button>
                                  <button class="dropdown-item" type="button" value="PIZZA">Pica</button>
                                  <button class="dropdown-item" type="button" value="BARBECUE">Rostilj</button>
                                  <button class="dropdown-item" type="button" value="FISH">Riblji</button>
                                  <button class="dropdown-item" type="button" value="VEGE">Veganski</button>
                                  
                                </span>
                            </td>
                              <td style="width: 250px"> 
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
                                    Ocena restorana
                                </button>
                                <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button class="dropdown-item" type="button">1</button>
                                <button class="dropdown-item" type="button">2</button>
                                <button class="dropdown-item" type="button">3</button>
                                <button class="dropdown-item" type="button">4</button>
                                <button class="dropdown-item" type="button">5</button>
                                </span>
                            </td>
                            <td style="width: 250px"> <button type="button" class="btn btn-danger wrn-btn btn-search">Search</button></td>
                           </tr>
                       </table>

               
             
                        <table style="margin-left: 200px; margin-top: 20px;">
                          <tr> 
                            <td style="width:500px "> <p> Ukoliko zelite da filtrirate prikaz restorana,  izaberite odgovarajuci tip: </p></td>
                            <td>       <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
                          Tip restorana </button>
                     
                              <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                              <button class="dropdown-item" type="button" value="ITALIAN" v-on:click="checkType('ITALIAN')">Italijanski</button>
                              <button class="dropdown-item" type="button" value="CHINESE" v-on:click="checkType('CHINESE')">Kineski</button>
                              <button class="dropdown-item" type="button" value="PIZZA" v-on:click="checkType('PIZZA')">Pica</button>
                              <button class="dropdown-item" type="button" value="BARBECUE" v-on:click="checkType('BARBECUE')">Rostilj</button>
                              <button class="dropdown-item" type="button" value="FISH" v-on:click="checkType('FISH')">Riblji</button>
                              <button class="dropdown-item" type="button" value="VEGE" v-on:click="checkType('VEGE')">Veganski</button>
                              </span> </td>
                            <td style="width: 25px;"> </td>
                              <td style="width:150px "> <p> ili status restorana</p></td>
                              <td > <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" > Status restorana </button>
                                 
                       
                                <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <button class="dropdown-item" type="button" value="ITALIAN">Italijanski</button>
                                <button class="dropdown-item" type="button" value="CHINESE">Kineski</button>
                                <button class="dropdown-item" type="button" value="PIZZA">Pica</button>
                                <button class="dropdown-item" type="button" value="BARBECUE">Rostilj</button>
                                <button class="dropdown-item" type="button" value="FISH">Riblji</button>
                                <button class="dropdown-item" type="button" value="VEGE">Veganski</button>
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
                                  <button class="dropdown-item" type="button">Po nazivu rastuce</button>
                                  <button class="dropdown-item" type="button">Po nazivu opadajuce</button>
                                  <button class="dropdown-item" type="button">Po mestu rastuce</button>
                                  <button class="dropdown-item" type="button">Po mestu opadajuce</button>
                                  <button class="dropdown-item" type="button">Po oceni rastuce</button>
                                  <button class="dropdown-item" type="button">Po oceni opadajuce</button>
                                  </span> </td>
                            
                            </tr > 
                    
                      </table>
              
            
          <div id="restoraniPrikaz"> 
              <div class=" tab-pane container active">
                  <div class="row-restaurants" v-for="restaurant in restaurants" v-on:click="getSelected(restaurant)">
                    <div class = "col-with-picture">
                        <div class="col-picture">
                            <div><img v-bind:src="'pictures/'+restaurant.link" style="height:250px !important; width:300px !important" v-on:click="goToRestaurant"></div>
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