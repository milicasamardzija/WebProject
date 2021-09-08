Vue.component("porudbine-kupac", {
    data: function() {  
        return {
        kupac:{},
        orders: [],
        idKupca: null
        }
    },
template: `
<div class="container" style=" margin-top: 20px; margin-left: 20px; margin-right: 10px;">
  <h3 style=" margin-left: 60px;"> <small> Trenutno stanje svih Vasih porudzbina: </small> <hr></h3>          
       
  
  <!--tabela-->
  <div >
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

              <td><button type="button" class="btn btn-secondary" >Izbrisi</button></td>
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
      }
},
mounted(){
    axios.get("/WebShopREST/rest/profile/profileUser")
    .then( response => {
        this.kupac = response.data
    })
    .catch(function(error){
        console.log(error)
    }),
    axios.post("/WebShopREST/rest/order/getOrders")
    .then( response => {
        this.orders = response.data
    })
    .catch(function(error){
        console.log(error)
    })

},
});