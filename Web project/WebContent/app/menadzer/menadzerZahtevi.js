Vue.component("menadzer-requirement", {
    data: function() {  
        return {
        orders: []
        }
    },
template: `
<div class="containerInfo">
<div class="container" style=" margin-top: 20px; margin-left: 7%; margin-right: 10px;">
  
    
        <h3 style=" margin-left: 6%;"> <small> Trenutno stanje svih Vasih porudzbina: </small> <hr></h3>
        <table class="table table-hover" >
            <thead >
            <tr>
                <th scope="col">Datum kreiranja</th>
                <th scope="col">Ukupna cena</th>
                <th scope="col">Status porudzbine</th>
                <th scope="col">Dostavljac potencijalni</th>
                <th scope="col"> </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in orders" v-on:click="getSelected(order)">
                <td>{{order.date | dateFormat('DD.MM.YYYY.')}}</td>
                <td>{{order.price}}</td>
                <td>{{order.status}}</td>
                <td>{{order.potencialDeliverer}}</td>
                <td><button type="button" class="btn btn-secondary" v-if="order.status == 'CEKA_DOSTAVLJACA'" v-on:click="changeStatus(order.id)" >Odobri</button></td>
            </tr>
            </tbody>
        </table>
 
  </div>
</div>
`,
methods:{
    changeStatus(id) {
        axios.post("/WebShopREST/rest/order/changeDeliverer", id)
        .then(response => {
            router.push(`/zahtevi`)
            this.$router.go()
        })
        .catch(function(error){
            console.log(error)
        })
    }
},
mounted(){
    axios.get("/WebShopREST/rest/order/getRequirements")
    .then( response => {
       this.orders=response.data
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