Vue.component("korpa-kupac", {
    data(){
        return{
            proizvodi:[],
            cena: 0.0,
            cenaBezPopusta: 0.0,
            korisnik: {}
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
                          <td><button type="button" class="btn btn-secondary" v-on:click="obrisi(proizvod)">Izbrisi</button></td>
                        </div>
                      </tr>
                    </tbody>
                  </table>
                  <br/>
                  <h4 style="margin-left: 30em"> Ukupna cena bez popusta:  <h4> {{this.cenaBezPopusta}} </h4> </h4>  
                  <h4 style="margin-left: 30em"> Ukupna cena sa korisnickim popustom:  <h4> {{this.cena}} </h4> </h4>  
                  
                  <button type="button" class="btn btn-success " style="margin-left:1050px; position: relative;" v-on:click="poruci()"> PORUCI </button >
            </div>     
                    
            </div>
     </div>
</section>
`,
methods:{
  poruci: function(){
    axios.post("/WebShopREST/rest/order/add/" + localStorage.getItem("userLogged"), this.proizvodi)
    .then( response => {
      alert("Uspesno ste izvrsili narudzbinu!"); 
      this.cenaBezPopusta = 0.0;
      this.cena = 0.0;
      
      //router.push(`/`);
      //ovde jos dodati poziv metode koja poziva metodu za brisanje svakog artikla iz korpe na beku
      this.proizvodi.forEach(element => {
        this.obrisi(element);
      });
      
    })
    .catch(function(error){
        console.log(error)
    })
  },
  
  obrisi(proizvod){
    this.proizvodi=null,
    axios.post("/WebShopREST/rest/articalChart/deleteArticalFromChart", proizvod.id)
    .then( response => {
        this.proizvodi = response.data; 
        this.obracunajCenuSabiranje(proizvod.price);
        this.obracunajCenuTrenutnu();
        this.obracunajCenuBezPopusta();
        
    })
    .catch(function(error){
        console.log(error)
    })
  },
  dodaj(proizvod){
    this.proizvodi=null,
    axios.post("/WebShopREST/rest/articalChart/plus", proizvod.id)
    .then( response => {
        this.proizvodi = response.data; 
        this.obracunajCenuSabiranje(proizvod.price);
        this.obracunajCenuTrenutnu();
        this.obracunajCenuBezPopusta();
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
        this.obracunajCenuTrenutnu();
        this.obracunajCenuBezPopusta();
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
    axios.get("/WebShopREST/rest/order/price/" + localStorage.getItem("userLogged"), this.proizvodi)
    .then( response => { this.cena = response.data;
      console.log(response.data);})
    .catch(function(error){
        console.log(error)
    })
  
  },
  obracunajCenuBezPopusta(){
    this.cenaBezPopusta=0;
    this.proizvodi.forEach(element => { this.cenaBezPopusta += element.price * element.quantity
    });
  }
},

mounted(){
 
  axios.get("/WebShopREST/rest/profile/profileUser")
  .then( response => {
      this.korisnik = response.data;
  })
  .catch(function(error){
      console.log(error)
  }),
 this.proizvodi = [];
  axios.get("/WebShopREST/rest/articalChart/getChart")
  .then( response => {
      this.proizvodi = response.data;
      this.obracunajCenuTrenutnu();
      this.obracunajCenuBezPopusta();
  })
  .catch(function(error){
      console.log(error)
  })
}
})
