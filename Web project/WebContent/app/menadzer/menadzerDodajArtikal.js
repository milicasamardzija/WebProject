Vue.component("dodajArtikal-menadzer", {
    data(){
        return{
            artical:{},
            idRest: null
        }
    },
template: `


<section> 
            
        <div class="row content">
                <div class="row-sm-6 sidenav">
                    <h3><small>Dodavanje novog artikla:</small> <hr> </h3>   
                </div> 
                <div class="col-sm-9">
                        <div class="informations" >
                            
                                    <table>
                                        <tr>
                                            <td> Naziv: </td>
                                            <td> <input class="form-control" type="text" v-model="artical.name" > </td>
                                        </tr>
                                        <tr> 
                                            <td>Cena: </td>
                                            <td> <input class="form-control" type="text" v-model="artical.price"> </td>
                                            <td><h6>*cena u dinarima </h6></td>
                                        </tr>
                                        <tr> 
                                            <td> Tip:</td>
                                            <td> <select class="selectKolicina" id="tipArtikla" v-model="artical.type" placeholder="Kliknite za izbor tipa"> 
                                           <option value="1"> Jelo </option>
                                           <option value="0"> Pice </option>
                                            </td>
                                        </tr>
                                        <tr> 
                                            <td>Kolicina: </td>
                                            <td> <input class="form-control" type="text" v-model="artical.quantity"> </td>
                                            <td><h6>*ako je pice kolicina je u ml, a za hranu u g </h6></td>
                                        </tr>
                                        <tr> 
                                            <td> Opis:</td> 
                                            <td> <input class="form-control" type="text" v-model="artical.description" ></td>
                                        </tr>
                                        <tr>
                                        <td class="labela">Slika:</td>
                                        <td><input type="file" onchange="encodeImageFileAsURL(this)" v-model="artical.link"></td>
                                        </tr>
                                        <tr>  
                                    </table>

                            <button type="button" class="btn btn-success" v-on:click="dodaj">Sacuvaj artikal</button>
                            <button type="button" class="btn btn-success" v-on:click="otkazi">Otkazi</button>
                        </div>
                </div>    
        </div>
        
           
</section>
`,
methods:{
    dodaj: function() {
            this.idRest = this.$route.query.id,
            axios.post("/WebShopREST/rest/artical/addArtical", {
            "name":''+ this.artical.name, 
            "price":''+ this.artical.price, 
            "type":''+ this.artical.type, 
            "quantity":''+ this.artical.quantity, 
            "description":''+ this.artical.description, 
            "link":''+ this.artical.link,
            "idRestaurant": this.idRest,
            })
            .then(
              response => {
               router.push(`/`), 
                this.$router.go()
                Swal.fire({
                  position: 'top-end',
                  title: 'Uspesno dodat artikal',
                  showConfirmButton: false,
                  timer: 1500
                })
               
              }, error => {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Artikal vec postoji!',
                    
                  })

              }
            )
            .catch()    
    },
    otkazi: function(s){
      router.push(`/`);
      this.$router.go()
    },
},
mounted(){

},
});