Vue.component("porudbine-kupac", {
    data: function() {  
        return {
        kupac:{},
        orders: [],
        idKupca: null, 
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
          <tr v-for="order in orders" v-on:click="getSelected(order)">
            <td>{{order.restaurantName}}</td>
            <td>{{order.date}}</td>
            <td>{{order.price}}</td>
            <td>{{order.status}}</td>
        
            <div>

              <td><button type="button" class="btn btn-secondary" v-if="order.status == 'OBRADA'" v-on:click="changeStatus()" >Otkazi</button>
               <button type="button" class="btn btn-secondary" v-if="order.status != 'OBRADA'" v-on:click="getSelected(order)" data-toggle="modal" data-target="#brisanje" >Izbrisi</button>  </td>
            </div>
          </tr>
        </tbody>
    </table>
  </div>
   
  
  <!-- modal obrisi-->
  <div class="modal fade" id="brisanje" role="dialog" >
          <div class="modal-dialog" style="width: 300px;" >
              <!-- Modal content -->
              <div class="modal-content">
                  <div class="modal-header" style="padding:35px 50px;">
                  <h5 class="modal-title" id="exampleModalLabel">Odjavi se</h5>
                  </div>
                  <div class="modal-body"  style="padding:40px 50px;">
                      <form role="form" @submit="deleteOrder">
                        <div> <p> Da li ste sigurni da zelite da obrisete?</p></div>
                          <button type="submit" class="btn btn-danger btn-block" v-on:click="deleteOrder"><span class="glyphicon glyphicon-off"></span> Obrisi</button>
                      </form>
                  </div>
                  <div class="modal-footer">
                  <button type="button" class="btn btn-danger btn-default pull-left"  data-dismiss="modal">Odustani</button>   
                  </div>
              </div>
          </div>
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
            router.push(`/porudzbine`);
        })
        .catch(function(error){
            console.log(error)
        })
    }, 
    changeStatus() {
        axios.post("/WebShopREST/rest/order/changeStatus", this.selected.id)
        .then(response => {
            router.push(`/porudzbine`);
        })
        .catch(function(error){
            console.log(error)
        })
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
    axios.get("/WebShopREST/rest/order/getOrders")
    .then( response => {
        this.orders = response.data
    })
    .catch(function(error){
        console.log(error)
    })

},
});