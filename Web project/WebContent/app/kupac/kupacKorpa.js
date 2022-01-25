Vue.component("korpa-kupac", {
    data(){
        return{
            proizvodi:[],
            cena: 0
        }
    },
template: `
<section> 
    <div class="container" style=" margin-top: 20px; margin-left: 20px; margin-right: 10px;">
            
                <h3 style=" margin-left: 60px;"> <small> Trenutno stanje Vase korpe: </small> <hr></h3> 
            <!--tabela-->
            <div>
                <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Logo</th>
                        <th scope="col">Artikal</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Kolicina</th>
                        <th scope="col">Povecaj kolicinu</th>
                        <th scope="col">Smanji kolicinu</th>
                        <th scope="col"> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="proizvod in proizvodi">
                        <td><div class="col-picture">
                        <div><img v-bind:src="'../pictures/'+ proizvod.link" style="height:60px !important; width:60px !important"></div>
                        </div></td>
                        <td>{{proizvod.name}}</td>
                        <td>{{proizvod.price}}</td>
                        <td>{{proizvod.quantity}}</td>
                        <td><button type="button" class="btn btn-success" v-on:click="dodaj(proizvod)"> <span class="glyphicon glyphicon-plus"></span></button> </td>
                        <td><button type="button" class="btn btn-danger"  v-on:click="oduzmi(proizvod)"> <span class="glyphicon glyphicon-minus"></span></button></td>
                        <div>
                          <td><button type="button" class="btn btn-secondary">Izbrisi</button></td>
                        </div>
                      </tr>
                    </tbody>
                  </table>
                  <br/>

                  <h4 style="margin-left: 45em"> Ukupna cena:  <h4> {{this.cena}} </h4> </h4>  
                  
                  <button type="button" class="btn btn-success " style="margin-left:1050px; position: relative;"> PORUCI </button >
            </div>     
                    
            </div>
     </div>
</section>
`,
methods:{
  dodaj(proizvod){
    this.proizvodi=null,
    axios.post("/WebShopREST/rest/articalChart/plus", proizvod.id)
    .then( response => {
        this.proizvodi = response.data; 
        this.obracunajCenuSabiranje(proizvod.price);
     
    })
    .catch(function(error){
        console.log(error)
    })
  },
  oduzmi(proizvod){
    this.proizvodi=null,
    axios.post("/WebShopREST/rest/articalChart/minus", proizvod.id)
    .then( response => {
        this.proizvodi = response.data; 
        this.obracunajCenuOduzimanje(proizvod.price);
    })
    .catch(function(error){
        console.log(error)
    })
  }, 
  obracunajCenuOduzimanje(price){
    this.cena -= price;
  }
  , 
  obracunajCenuSabiranje(price){;
    this.cena +=  price;
  }, 
  obracunajCenuTrenutnu(){
    this.proizvodi.forEach(element => { this.cena += element.price * element.quantity
      
    });
  }
},
mounted(){
  
  axios.get("/WebShopREST/rest/articalChart/getChart")
  .then( response => {
      this.proizvodi = response.data;
      this.obracunajCenuTrenutnu();
  })
  .catch(function(error){
      console.log(error)
  })
}
});