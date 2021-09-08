Vue.component("nedostavljene-dostavljac", {
    data: function() {  
        return {
        orders: [],
        selected:{}
        }
    },
template: `
<section> 
            
<div class="containerInfo">
       
    <button style=" margin-left: 38%;"class="btn btn-success" type="button" v-on:click="search">PRETRAGA</button>
    <button class="btn btn-success" type="button" v-on:click="filter">FILTRIRANJE</button>
    <button class="btn btn-success" type="button" v-on:click="sorth">SORTIRANJE</button>

    <!--tabela-->
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Ime restorana</th>
                    <th scope="col">Datum kreiranja</th>
                    <th scope="col">Ukupna cena</th>
                    <th scope="col">Status porudzbine</th>
                    <th scope="col"> </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders"  v-on:click="getSelected(order)">
                    <td>{{order.restaurantName}}</td>
                    <td>{{order.date}}</td>
                    <td>{{order.price}}</td>
                    <td>{{order.status}}</td>
                    <div>
                    <td><button type="button" class="btn btn-secondary" v-if="order.status == 'U_TRANSPORTU'" v-on:click="dostavi" >Dostavljeno</button></td>
                    </div>
                </tr>
            </tbody>
        </table>
    </div>  

</div>
           
</section>
`,
methods:{
    search: function(){
    router.push(`/dostavljacPretraga`);
    },
    filter: function(){
    router.push(`/dostavljacFiltriranje`);
    },
    sorth: function(){
        router.push(`/dostavljacSortiranje`);
    } ,
    dostavi: function(event){
        axios.post("/WebShopREST/rest/order/changeToDelivered", this.selected.id)
        .then( response => {
            this.orders = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    getSelected: function(order){
    this.selected = order;
    }
},
mounted(){
    axios.get("/WebShopREST/rest/order/getAllOrdersForDelivererNotDelivered")
    .then( response => {
        this.orders = response.data
    })
    .catch(function(error){
        console.log(error)
    })
}
});