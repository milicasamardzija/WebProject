Vue.component("cekaju-dostavljaca", {
    data: function() {  
        return {
            orders: [],
            user:{}
            }
    },
template: `
<div class="container" style=" margin-top: 20px; margin-left: 40px; margin-right: 10px;">
  
<div>
<table  style=" margin:25px 25px; font-size:1.1 em;"> 
<tr>
    <td > <input type="text" placeholder="naziv restorana" style="height:32px;"> </td>
    <td style="padding: 12px;"> Cena od: </td> 
    <td style="padding: 12px;"> <input type="text" placeholder="pocetni iznos" style="height:32px;"></td> 
    <td style="padding: 12px;"> do: </td> 
    <td style="padding: 12px;"> <input type="text" placeholder="krajnji iznos" style="height:32px;"></td> 
    <td style="padding: 12px;"> Datum od: </td>
    <td style="padding: 12px;"> <input type="date" style="height:32px;"></td> 
    <td style="padding: 12px;"> do: </td> 
    <td style="padding: 12px;"> <input type="date" style="height:32px;"></td> 
    <td> <button class="btn btn-danger" type="button" >Nadji</button> </td>

</tr>

</table>

<table style=" margin:25px 25px; font-size:1.1 em;"> 
<tr> 
        <td style="width:450px !important;"><p> Ukoliko zelite da filtrirate prikaz, odaberite odgovarajuci tip restorana </p></td>  
    
        <td > <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" > Tip restorana </button>                  
            <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button class="dropdown-item" type="button" v-on:click="filterTypeRestaurant('italijanski')" >Italijanski</button>
            <button class="dropdown-item" type="button" v-on:click="filterTypeRestaurant('kineski')">Kineski</button>
            <button class="dropdown-item" type="button" v-on:click="filterTypeRestaurant('pica')" >Pica</button>
            <button class="dropdown-item" type="button" v-on:click="filterTypeRestaurant('rostilj')">Rostilj</button>
            <button class="dropdown-item" type="button" v-on:click="filterTypeRestaurant('riblji')" >Riblji</button>
            <button class="dropdown-item" type="button" v-on:click="filterTypeRestaurant('vege')">Veganski</button>
            </span>
        </td>
    </tr>
</table>

<table style=" margin:25px 25px; font-size:1.1 em;"> 
<tr> 
        <td style="width:450px !important;"><p> Ukoliko zelite da sortirate prikaz, odaberite odgovarajuci kriterijum  </p></td>  
    
        <td > <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" > Sortiraj porudzbine  </button>                  
            <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button class="dropdown-item" type="button" v-on:click="sortOrders('imeRastuce')">Nazivu restorana rastuce</button>
            <button class="dropdown-item" type="button" v-on:click="sortOrders('imeOpadajuce')">Nazivu restorana opadajuce</button>
            <button class="dropdown-item" type="button" v-on:click="sortOrders('rastuce')">Ceni porudzbine rastuce</button>
            <button class="dropdown-item" type="button" v-on:click="sortOrders('opadajuce')">Ceni porudzbine opadajuce</button>
            <button class="dropdown-item" type="button" v-on:click="sortOrders('datumRastuce')" >Datumu porudzbine rastuce</button>
            <button class="dropdown-item" type="button" v-on:click="sortOrders('datumOpadajuce')">Datumu porudzbine opadajuce</button>
            </span>
        </td>
        
    </tr>
</table>
</div>



   
  <div v-if= "orders != []" > 
  <h3 style=" margin-left: 30px;"> <small> Trenutno stanje svih porudzbina na cekanju: </small> <hr></h3>
    <table class="table table-hover" >
        <thead v-if= "orders != null">
          <tr>
            <th scope="col">Ime restorana</th>
            <th scope="col">Datum kreiranja</th>
            <th scope="col">Ukupna cena</th>
            <th scope="col">Status porudzbine</th>
            <th scope="col">Tip restorana </th>
            <th scope="col"> </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" v-on:click="getSelected(order)">
            <td>{{order.restaurantName}}</td>
            <td> {{order.date | dateFormat('DD.MM.YYYY.')}} </td>
            <td>{{order.price}}</td>
            <td>{{order.status}}</td>
            <td>{{order.restaurantType}}</td>
          
            <div>

              <td><button type="button" class="btn btn-secondary" v-if="order.potencialDeliverer != user.username" v-on:click="zaduziZaDostavu(order.id)">Zatrazi</button>
               </div>
          </tr>
        </tbody>
    </table>
  </div>
  
</div>
`,
methods:{
    getSelected: function(order){
        this.selected = order;
      }, 
    deleteOrder() {
        axios.post("/WebShopREST/rest/order/deleteOrder", this.selected.id )
        .then(response => {
            router.push(`/cekajuDostavljaca`);
        })
        .catch(function(error){
            console.log(error)
        })
    },
      
    filterTypeRestaurant: function(type) {
        this.orders=null,
        axios.post("/WebShopREST/rest/order/filterRestaurantTypeOnWaitOrders", type)
        .then(response => {
           this.orders = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    sortOrders: function(type) {
        this.orders=null,
        axios.post("/WebShopREST/rest/order/sortDelivererOnWaitOrders", type)
        .then(response => {
           this.orders = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    zaduziZaDostavu: function(id){
        this.orders=null;
        axios.post("/WebShopREST/rest/order/askForDelivery", id)
        .then(response => {
       this.orders =response.data
        })
        .catch(function(error){
            console.log(error)
        })
    }
    
},
mounted(){
    axios.get("/WebShopREST/rest/profile/profileUser")
    .then( response => {
        this.user = response.data
    })
    .catch(function(error){
        console.log(error)
    }),
    axios.get("/WebShopREST/rest/order/getAllOrdersForDelivererOnWait")
    .then( response => {
        this.orders = response.data
    })
    .catch(function(error){
        console.log(error)
    })

},
filters: {
    dateFormat: function(value, format){
        var parsed = moment(value);
        return parsed.format(format)
    }
}
});
