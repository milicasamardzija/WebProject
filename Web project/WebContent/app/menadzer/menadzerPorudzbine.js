Vue.component("porudbine-menadzer", {
    data: function() {  
        return {
        orders: []
        }
    },
template: `
<div class="container" style=" margin-top: 20px; margin-left: 40px; margin-right: 10px;">
  
    <div>
        <table  style=" margin:25px 25px; font-size:1.1 em;"> 
        <tr>
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
        <td style="width:450px !important;"><p> Ukoliko zelite da filtrirate prikaz, odaberite odgovarajuci kriterijum  </p></td>  
            <td > <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" > Tip porudzbine </button>                  
                    <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" type="button" v-on:click="filterTypeOrders('otkazana')">Otkazana</button>
                    <button class="dropdown-item" type="button" v-on:click="filterTypeOrders('obrada')">Obradjuje se</button>
                    <button class="dropdown-item" type="button" v-on:click="filterTypeOrders('ceka')">Ceka dostavljaca</button>
                    <button class="dropdown-item" type="button" v-on:click="filterTypeOrders('transport')">U transportu</button>
                    <button class="dropdown-item" type="button" v-on:click="filterTypeOrders('dostavljena')">Dostavljena</button>
                    <button class="dropdown-item" type="button" v-on:click="filterTypeOrders('priprema')">U pripremi</button>
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
                    <button class="dropdown-item" type="button"  >Datumu porudzbine rastuce</button>
                    <button class="dropdown-item" type="button" >Datumu porudzbine opadajuce</button>
                    </span>
                </td>
                
            </tr>
        </table>
    </div>



   
    <div v-if= "orders != []" > 
    <h3 style=" margin-left: 30px;"> <small> Trenutno stanje svih Vasih porudzbina: </small> <hr></h3>
        <table class="table table-hover" >
            <thead v-if= "orders != null">
            <tr>
                <th scope="col">Datum kreiranja</th>
                <th scope="col">Ukupna cena</th>
                <th scope="col">Status porudzbine</th>
                <th scope="col"> </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in orders" v-on:click="getSelected(order)">
                <td>{{order.date | dateFormat('DD.MM.YYYY.')}}</td>
                <td>{{order.price}}</td>
                <td>{{order.status}}</td>
                <div>
                <td><button type="button" class="btn btn-secondary" v-if="order.status == 'U_PRIPREMI'" v-on:click="changeStatus(order.id)" >Otkazi</button>
                </div>
            </tr>
            </tbody>
        </table>
    </div>
  
</div>
`,
methods:{
    changeStatus(id) {
        axios.post("/WebShopREST/rest/order/changeStatusManager", id)
        .then(response => {
            this.orders = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
     filterTypeOrders: function(type) {
        this.orders=null,
        axios.post("/WebShopREST/rest/order/filterOrdersManager", type)
        .then(response => {
           this.orders = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    sortOrders: function(type) {
        this.orders=null,
        axios.post("/WebShopREST/rest/order/sortOrdersManager", type)
        .then(response => {
           this.orders = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    }
    
},
mounted(){
    axios.get("/WebShopREST/rest/order/getOrdersForRestaurant")
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