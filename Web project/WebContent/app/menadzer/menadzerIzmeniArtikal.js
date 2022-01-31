Vue.component("izmeniArtikal-menadzer", {
    data(){
        return{
            artical:{name: "", price: 0, type:0, quantity: 0, description: "", link: "", idArtic: 0},
            idArtic: null
        }
    },
template: `
  
        <div class="row content">
                <div class="row-sm-6 sidenav">
                    <h3><small>Dodavanje novog artikla:</small> <hr> </h3>   
                </div> 
                <div class="col-sm-9">
                        <div class="informations" >
                            
                                    <table>
                                        <tr>
                                            <td> Naziv: </td>
                                            <td> <input class="form-control" type="text" v-model="artical.name" v-bind:value="name"> {{name}} </td>
                                        </tr>
                                        <tr> 
                                            <td>Cena: </td>
                                            <td> <input class="form-control" type="text" v-model="artical.price" v-bind:value="price"> {{price}} </td>
                                            <td><h6>*cena u dinarima </h6></td>
                                        </tr>
                                        <tr> 
                                            <td> Tip:</td>
                                            <td> <select class="selectKolicina" id="tipArtikla" v-model="artical.type" placeholder="Kliknite za izbor tipa"> 
                                           <option value="JELO"> Jelo </option>
                                           <option value="PICE"> Pice </option>
                                           </select>
                                            </td>
                                        </tr>
                                        <tr> 
                                            <td>Kolicina: </td>
                                            <td> <input class="form-control" type="text" v-model="artical.quantity" v-bind:value="quantity"> {{quantity}}</td>
                                            <td><h6>*ako je pice kolicina je u ml, a za hranu u g </h6></td>
                                        </tr>
                                        <tr> 
                                            <td> Opis:</td> 
                                            <td> <input class="form-control" type="text" v-model="artical.description" v-bind:value="description">{{description}}</td>
                                        </tr>
                                        <tr>
                                        <td class="labela">Slika:</td>
                                        <td><input type="file" onchange="encodeImageFileAsURL(this)" v-model="artical.link" v-bind:value="link">{{link}}</td>
                                        </tr>
                                        <tr>  
                                    </table>

                            <button type="button" class="btn btn-success" v-on:click="izmeni">Sacuvaj</button>
                            <button type="button" class="btn btn-success" v-on:click="otkazi">Otkazi</button>
                        </div>
                </div>    
        </div>

`,
methods:{
    izmeni: function() {
            this.idArtic= this.$route.query.id,
            axios.post("/WebShopREST/rest/artical/changeArtical", {
            "name":''+ this.artical.name, 
            "price":''+ this.artical.price, 
            "type":''+ this.artical.type, 
            "quantity":''+ this.artical.quantity, 
            "description":''+ this.artical.description, 
            "link":''+ this.artical.link,
            "id":''+ this.idArtic
            })
            .then(
              response => {
                router.push(`/`)
                this.$router.go()
              } 
            )
            .catch()    
    },
    otkazi: function(){
      router.push(`/`);
      this.$router.go()
    },
},
mounted(){
      this.idArtic = this.$route.query.id,
      axios.post("/WebShopREST/rest/artical/getArtical", this.idArtic)
      .then( response => {
          this.artical = response.data
      })
      .catch(function(error){
          console.log(error)
      })
},
});