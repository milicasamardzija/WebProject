Vue.component("izmeniProfil-administrator", {
   
    data:function(){
         mode: "INFORMACIJE"
        return{
           user: {}
        }
    
    },
template: 
`
 <div class="row content">
                <div class="col-sm-3 sidenav">
                    <h3><small>Vase informacije na profilu:</small> <hr> </h3>
                    <img class= "img-responsive"src="../pictures/korisnik.png">
                </div> 
                <div class="col-sm-9">
                        <div class="informations" >
                            <form @submit='changeProfile'>
                                    <table>
                                        <tr>
                                            <td> Ime: </td>
                                            <td> <input class="form-control" type="text" v-model="user.name" v-bind:value="name"/>{{name}} </td>
                                        </tr>
                                        <tr> 
                                            <td>Prezime: </td>
                                            <td> <input class="form-control" type="text"  v-model="user.surname" v-bind:value="surname"> </td>
                                        </tr>
                                        <tr> 
                                            <td> Korisnicko ime:</td>
                                            <td> <input class="form-control" type="text"  v-model="user.username" v-bind:value="username" > </td>
                                        </tr>
                                        <tr> 
                                            <td> Pol:</td>
                                            <td> <h6>pol nije moguce menjati</h6> </td>
                                        </tr>
                                        <tr> 
                                            <td>Datum rodjenja: </td>
                                            <td> <h6>datum rodjenja nije moguce menjati</h6> </td>
                                        </tr>
                                        <tr> 
                                            <td> Adresa:</td>
                                            <td> <input class="form-control" type="text" placeholder="ulica"  v-model="user.address.street" v-bind:value="street" > </td>
                                            <td> <input class="form-control" type="text" placeholder="broj" style="width:70px"  v-model="user.address.number" v-bind:value="number" ></td>
                                            <td> <input class="form-control" type="text" placeholder="grad" style="width:120px"  v-model="user.address.city" v-bind:value="city"></td>
                                            <td> <input class="form-control" type="text" placeholder="postanski broj" style="width:115px"  v-model="user.address.zipCode" v-bind:value="zipCode"></td>
                                        </tr>
                                     
                                        <tr> 
                                           <button type="button" class="btn btn-danger" v-on:click="changePassword"> Promeni sifru </button>
                                        </tr>
                                           <form id="izmena" v-bind:hidden="mode==='INFORMACIJE'">
                                           <table>
                                            <tr> 
                                                <td> Stara sifra:  </td>
                                                <td> <input class="form-control" type="password"></td> 
                                            </tr> 
                                            <tr> 
                                                <td> Nova sifra:  </td>
                                                <td> <input class="form-control" type="password"></td> 
                                            </tr>
                                            <tr> 
                                                <td> Ponovo unesite novu sifru:  </td>
                                                <td> <input class="form-control" type="password"></td> 
                                            </tr>
                                            <tr> 
                                                <td>Nova sifra: </td>
                                                <td> <input class="form-control" type="password"></td> 
                                             </tr>
                                            </table>
                                            </form>
                                       
                                    </table>
                                <button type="submit" class="btn btn-success" v-on:click="changeProfile">Sacuvaj izmene</button>
                            </form>
                            <button type="button" class="btn btn-success" v-on:click="otkazi">Otkazi</button>
                        </div>
                    </div>    
 </div>
        
           

`,
methods:{
    changeProfile: function(event){
      event.preventDefault()
      axios.post("/WebShopREST/rest/user/changeUser", {
      "username":''+ this.user.username,
      "name":''+ this.user.name, 
      "surname":''+ this.user.surname,  
      "street":''+ this.user.address.street, 
      "number":''+ this.user.address.number, 
      "city":''+ this.user.address.city, 
      "zipCode":''+ this.user.address.zipCode})
      .then(
        response => {
          router.push(`/profil`);
        } 
      )
      .catch(function(error){
        console.log(error)
    })
    },
    otkazi: function(event){
      event.preventDefault()
      router.push(`/profil`);
    }
},
mounted(){
    axios.get("/WebShopREST/rest/profile/profileUser")
    .then( response => {
        this.user = response.data
    })
    .catch(function(error){
        console.log(error)
    })

},
});