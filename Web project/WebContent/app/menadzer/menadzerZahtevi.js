Vue.component("menadzer-requirement", {
    data: function() {  
        return {
        orders: []
        }
    },
template: `
<div class="container" style=" margin-top: 20px; margin-left: 40px; margin-right: 10px;">
  
    
        <h3 style=" margin-left: 30px;"> <small> Trenutno stanje svih Vasih porudzbina: </small> <hr></h3>
        <table class="table table-hover" >
            <thead v-if= "orders != null">
            <tr>
                <th scope="col">Datum kreiranja</th>
                <th scope="col">Ukupna cena</th>
                <th scope="col">Status porudzbine</th>
                <th scope="col">Dostavljac</th>
                <th scope="col"> </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in orders" v-on:click="getSelected(order)">
                <td>{{order.date | dateFormat('DD.MM.YYYY.')}}</td>
                <td>{{order.price}}</td>
                <td>{{order.status}}</td>
                <td>{{order.idDeliverer}}</td>
                <div>
                <td><button type="button" class="btn btn-secondary" v-if="order.status == 'CEKA_DOSTAVLJACA'" v-on:click="changeStatus(order.id)" >Odobri</button>
                </div>
            </tr>
            </tbody>
        </table>
 
  
</div>
`,
methods:{
    changeStatus(id) {
        axios.post("/WebShopREST/rest/order/changeDeliverer", id)
        .then(response => {
            this.orders = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    }
},
mounted(){
    axios.get("/WebShopREST/rest/order/getRequirements")
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