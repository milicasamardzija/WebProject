Vue.component("izmeniProfil-dostavljac", {

    data:function(){
        return{
            mode: false,
            user:{}
        }
    },
template: `

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
                                            <td> <input class="form-control" type="text"  v-model="user.name" v-bind:value="name"/>{{name}} </td>
                                        </tr>
                                        <tr> 
                                            <td>Prezime: </td>
                                            <td> <input class="form-control" type="text"v-model="user.surname" v-bind:value="surname"> {{surname}}</td>
                                        </tr>
                                        <tr> 
                                            <td> Korisnicko ime:</td>
                                            <td> <input class="form-control" type="text"v-model="user.username" v-bind:value="username" >{{username}} </td>
                                        </tr>
                                        <tr> 
                                            <td> Pol:</td>
                                            <td> <input class="form-control" type="radio"v-model="user.gender" v-bind:value="gender" ></td>
                                        </tr>
                                        <tr> 
                                            <td>Datum rodjenja: </td>
                                            <td><input class="form-control" type="date"v-model="user.birtday" v-bind:value="birtday" > </td>
                                        </tr>
                                        <tr> 
                                        <td> Adresa:</td>
                                        <td> <input class="form-control" type="text" placeholder="ulica"  v-model="user.address.street" v-bind:value="street" >{{street}} </td>
                                        <td> <input class="form-control" type="text" placeholder="broj" style="width:70px"  v-model="user.address.number" v-bind:value="number" >{{number}}</td>
                                        <td> <input class="form-control" type="text" placeholder="grad" style="width:120px"  v-model="user.address.city" v-bind:value="city">{{city}}</td>
                                        <td> <input class="form-control" type="text" placeholder="postanski broj" style="width:115px"  v-model="user.address.zipCode" v-bind:value="zipCode">{{zipCode}}</td>
                                        </tr>
                                        <tr> 
                                           <button type="button" class="btn btn-danger" v-on:click="changePassword"> Promeni sifru </button>
                                        </tr>
                                           <form id="izmena" v-if="mode==true">
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
                                       
                                           <tr><td><button type="button" class="btn btn-success" v-on:click="changeProfile">Sacuvaj izmene</button> </td>
                                           <td style="width:15px"> </td>       
                                           <td>  <button type="button" class="btn btn-success" v-on:click="otkazi">Otkazi</button></td>
                                           </tr>  
                                    </table>

                            </form>
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
    },
    changePassword: function(){
        this.mode=true
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
}
});