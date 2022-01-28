Vue.component("nedostavljene-kupac", {
    data: function() {  
        return {
        kupac:{},
        orders: [],  
        selected:{}
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
          <tr v-for="order in orders">
            <td>{{order.restaurantName}}</td>
            <td>{{order.date | dateFormat('DD.MM.YYYY.')}}</td>
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
    axios.get("/WebShopREST/rest/profile/profileUser")
    .then( response => {
        this.kupac = response.data
    })
    .catch(function(error){
        console.log(error)
    }), 
    axios.get("/WebShopREST/rest/order/getUndeliveredOrders")
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