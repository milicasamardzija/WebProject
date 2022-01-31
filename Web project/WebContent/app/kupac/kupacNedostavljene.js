Vue.component("nedostavljene-kupac", {
    data: function() {  
        return {
        kupac:{},
        orders: [],  
        selected:{}
        }
    },
template: `

<div class="containerInfo" >
<div class="container" style=" margin-top: 20px; margin-left: 8%; margin-right: 10px;">
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
            <td ><button type="button" class="btn btn-secondary" v-if="order.status == 'OBRADA' "  v-on:click="getSelected(order)" data-toggle="modal" data-target="#otkazi">Otkazi</button></td>
          </tr>
        </tbody>
    </table>
  </div>
   
  <!-- modal otkazi-->
  <div class="modal fade" id="otkazi" role="dialog" >
          <div class="modal-dialog" style="width: 400px;" >
              <!-- Modal content -->
              <div class="modal-content">
                  <div class="modal-header" style="padding:35px 50px;">
                  <h5 class="modal-title" id="exampleModalLabel">Otkazi porudzbinu</h5>
                  </div>
                  <div class="modal-body"  style="padding:40px 50px;">
                      <form role="form">
                        <div> <p> Da li ste sigurni da zelite da otkazete porudzbinu?</p></div>
                          <button type="submit" class="btn btn-danger btn-block" v-on:click="cancel()"><span class="glyphicon glyphicon-off"></span> Potvrdi</button>
                      </form>
                  </div>
                  <div class="modal-footer">
                  <button type="button" class="btn btn-danger btn-default pull-left"  data-dismiss="modal">Odustani</button>   
                  </div>
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
    cancel(id){
      axios.get("/WebShopREST/rest/order/cancelOrder/" + localStorage.getItem("userLogged") + "/" + this.selected.id)
      .then(
        response => this.orders = response.data
      )
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