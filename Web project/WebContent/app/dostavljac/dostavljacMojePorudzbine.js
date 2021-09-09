Vue.component("porudbine-moje", {
    data: function() {  
        return {
        orders: [],
        selected: {}
        }
    },
template: `
<div class="container" style=" margin-top: 20px; margin-left: 20px; margin-right: 10px;">

    <button style=" margin-left: 38%;"class="btn btn-success" type="button" v-on:click="search">PRETRAGA</button>
    <button class="btn btn-success" type="button" v-on:click="filter">FILTRIRANJE</button>
    <button class="btn btn-success" type="button" v-on:click="sorth">SORTIRANJE</button>

    <h3 style=" margin-left: 60px;"> <small> Trenutno stanje svih Vasih porudzbina: </small> <hr></h3>             
    <!--tabela-->
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Ime restorana</th>
                    <th scope="col">Datum kreiranja</th>
                    <th scope="col">Ukupna cena</th>
                    <th scope="col">Status porudzbine</th>
                  
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" v-on:click="getSelected(order)">
                    <td>{{order.restaurantName}}</td>
                    <td>{{order.date}}</td>
                    <td>{{order.price}}</td>
                    <td>{{order.status}}</td>
                </tr>
            </tbody>
        </table>
    </div>  
</div>
`,
methods:{
    getSelected: function(order){
        this.selected = order;
      }
},
mounted(){
    axios.get("/WebShopREST/rest/order/getAllOrdersForDeliverer")
    .then( response => {
        this.orders = response.data
    })
    .catch(function(error){
        console.log(error)
    })
},
});