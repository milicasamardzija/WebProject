Vue.component("profil-menadzer", {
    data(){
        return{
            menadzer:null
        }
    },
template: `
<section> 
            
            <div class="row content">
                    <div class="col-sm-3 sidenav" >
                        <h3><small>Vase informacije na profilu:</small> <hr> </h3>
                        <img class= "img-responsive"src="../pictures/korisnik.png">
                    </div> 
                    <div class="col-sm-9">
                            <div class="informations" >
                                
                                <table style="margin-top: 120px;">
                                <tr>
                                    <td> Ime: </td>
                                    <td> {{menadzer.name}}</td>
                                    </tr>
                                <tr> 
                                <td>Prezime: </td>
                                  <td> {{menadzer.surname}}</td>
                                </tr>
                                <tr> 
                                <td> Korisnicko ime:</td>
                                  <td> {{menadzer.username}}</td>
                                </tr>
                                <tr> 
                                <td> Pol:</td>
                                  <td> {{menadzer.gender}}</td>
                                </tr>
                                <tr> 
                                <tr> 
                                    <td>Datum rodjenja: </td>
                                    <td> {{menadzer.birthday | dateFormat('DD.MM.YYYY.')}} </td>
                                </tr>
                                <tr> 
                                <td> Adresa:</td>
                                <td> {{menadzer.address.street}} {{menadzer.address.number}}, grad {{menadzer.address.city}}  {{menadzer.address.zipCode}} </td>
                                </tr>
                                <tr> 
                                
                                </tr>
                                </table>
                                <button type="button" class="btn btn-success" v-on:click="editProfile">Izmeni podatke</button>
                            </div>
                    </div>
            </div>
           
</section>
`,
methods:{
    editProfile: function() {
        router.push(`/izmeniProfilMenadzer`)
    }
},
mounted(){
	  axios.get("/WebShopREST/rest/profile/profileUser")
        .then( response => {
            this.menadzer = response.data
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