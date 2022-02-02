Vue.component("porudbine-menadzer", {
    data: function() {  
        return {
        orders: [],
        check: false, 
        searchParameters: {},
        }
    },
template: `
<div class="containerInfo">
<div class="container" style=" margin-left:7%; margin-right: 10px;">
  
    <div  style="  margin-left:5%;">
        <table  style=" margin:25px 25px; font-size:1.1 em;"> 
        <tr>
            <td style=" width: 115px;"> <p style=" width: 70px; margin-top: 7px; margin-left: -4px"> Cena od: </p></td> 
           
            <td style="padding: 12px;"> <input type="text" v-model="searchParameters.priceFrom" placeholder="Pocetni iznos" style="height:32px;"></td> 
            <td style="padding: 12px;"> do: </td> 
            <td style="padding: 12px;"> <input type="text" v-model="searchParameters.priceTo" placeholder="Krajnji iznos" style="height:32px;"></td> 
            <td style="padding: 12px;"> <p style=" width: 80px; margin-top: 7px; margin-left: -4px"> datum od: </p> </td>
            <td style="padding: 12px;"> <input type="date" style="height:32px;" v-model="searchParameters.dateFrom"></td> 
            <td style="padding: 12px;"> do: </td> 
            <td style="padding: 12px;"> <input type="date" style="height:32px;" v-model="searchParameters.dateTo"></td> 
            <td> <button class="btn btn-danger" type="button" v-on:click= "search">Nadji</button> </td>

        </tr>

        </table>

        <table style=" margin:25px 25px; font-size:1.1 em;"> 
        <tr> 
        <td style="width:450px !important;"><p> Ukoliko zelite da filtrirate prikaz, odaberite odgovarajuci kriterijum  </p></td>  
            <td > <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style="width: 155px;" > Tip porudzbine </button>                  
                    <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button class="dropdown-item" type="button" v-on:click="filterStatus('OTKAZANA')">Otkazana</button>
                    <button class="dropdown-item" type="button" v-on:click="filterStatus('OBRADA')">Obradjuje se</button>
                    <button class="dropdown-item" type="button" v-on:click="filterStatus('CEKA_DOSTALJACA')">Ceka dostavljaca</button>
                    <button class="dropdown-item" type="button" v-on:click="filterStatus('U_TRANSPORTU')">U transportu</button>
                    <button class="dropdown-item" type="button" v-on:click="filterStatus('DOSTAVLJENA')">Dostavljena</button>
                    <button class="dropdown-item" type="button" v-on:click="filterStatus('U_PRIPREMI')">U pripremi</button>
                    </span>
                </td>
                 <td style="width:50px;"> </td>
        <td><button class="btn btn-secondary" type="button"  v-if="check" v-on:click="reset()">x</button> </td> 
                
            </tr>
        </table>

        <table style=" margin:25px 25px; font-size:1.1 em;"> 
        <tr> 
                <td style="width:450px !important;"><p> Ukoliko zelite da sortirate prikaz, odaberite odgovarajuci kriterijum  </p></td>  
            
                <td > <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" > Sortiraj porudzbine  </button>                  
                    <span class="dropdown-menu" aria-labelledby="dropdownMenu2">

                    <button class="dropdown-item" type="button" v-on:click="sortPriceAsc()">Ceni porudzbine rastuce</button>
                    <button class="dropdown-item" type="button" v-on:click="sortPriceDesc()">Ceni porudzbine opadajuce</button>
                    <button class="dropdown-item" type="button" v-on:click="sortDateAsc()" >Datumu porudzbine rastuce</button>
                    <button class="dropdown-item" type="button" v-on:click="sortDateDesc()">Datumu porudzbine opadajuce</button>
                    </span>
                </td>
                
            </tr>
        </table>
    </div>



   
    <div v-if= "orders != []" > 
    <h3 style=" margin-left:3.5em;"> <small> Trenutno stanje svih porudzbina za  Vas restoran: </small> <hr></h3>
        <table class="table table-hover"  style=" margin-left:5.2em;">
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
</div>
`,
methods:{
    changeStatus(id) {
        axios.post("/WebShopREST/rest/order/changeStatusManager", id)
        .then(response => {
            this.orders = response.data
            this.$router.go()
        })
        .catch(function(error){
            console.log(error)
        })
    },
    
       
    filterStatus: function (type){
        this.orders = this.orders.filter(order => order.status === type);
        
        this.check = true
    },
    
  
    
    sortPriceDesc: function() {
        function compare(a, b) {
          if (a.price < b.price)
            return 1;
          if (a.price > b.price)
            return -1;
          return 0;
        }
        
        return this.orders.sort(compare);
    },
    sortPriceAsc: function() {
        function compare(a, b) {
          if (a.price < b.price)
            return -1;
          if (a.price > b.price)
            return 1;
          return 0;
        }

        return this.orders.sort(compare);
    },
    
    sortDateDesc: function() {
        function compare(a, b) {
          if (a.date < b.date)
            return 1;
          if (a.date > b.date)
            return -1;
          return 0;
        }
        
        return this.orders.sort(compare);
    },
    sortDateAsc: function() {
        function compare(a, b) {
          if (a.price < b.price)
            return -1;
          if (a.price > b.price)
            return 1;
          return 0;
        }

        return this.orders.sort(compare);
    },
    search: function(){
    	axios.post("/WebShopREST/rest/order/searchOrderForManager", {
    		"restaurantName": '' + this.searchParameters.restaurantName,
            "priceFrom":''+ this.searchParameters.priceFrom, 
            "priceTo":''+ this.searchParameters.priceTo, 
            "dateFrom":''+ this.searchParameters.dateFrom, 
            "dateTo":''+ this.searchParameters.dateTo}).then(response => {
        this.orders = response.data;
        
    }).catch(function(error){
        console.log(error)
    })
    
    },
    
    reset:function() {
            axios.get("/WebShopREST/rest/order/getOrdersForRestaurant")
    .then( response => {
        this.orders = response.data;
        this.check= false;
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