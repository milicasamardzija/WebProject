Vue.component("cekaju-dostavljaca", {
    data: function() {  
        return {
        orders: []
        }
    },
template: `
<section> 
            
<div class="containerInfo">
       
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
                <tr v-for="order in orders" v-on:click="getSelected(order)">
                    <td>{{order.restaurantName}}</td>
                    <td>{{order.date}}</td>
                    <td>{{order.price}}</td>
                    <td>{{order.status}}</td>
                    <div>
                    <td><button type="button" class="btn btn-secondary" >Zahtev za porudzbinu</button></td>
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
    } 
},
mounted(){
    axios.get("/WebShopREST/rest/order/getAllOrdersForDelivererOnWait")
    .then( response => {
        this.orders = response.data
    })
    .catch(function(error){
        console.log(error)
    })
}
});