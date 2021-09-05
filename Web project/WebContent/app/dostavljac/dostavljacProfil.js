Vue.component("profil-dostavljac", {
    data(){
        return{
            dostavljac:null
        }
    },
template: `
<section> 
            
            <div class="row content">
                    <div class="col-sm-3 sidenav">
                        <h3><small>Vase informacije na profilu:</small> <hr> </h3>
                        <img class= "img-responsive"src="../pictures/korisnik.png">
                    </div> 
                    <div class="col-sm-9">
                            <div class="informations" >
                                
                                <table>
                                <tr>
                                    <td> Ime: </td>
                                    <td> {{dostavljac.name}}</td>
                                    </tr>
                                <tr> 
                                <td>Prezime: </td>
                                <td> {{dostavljac.surname}} </td>
                                </tr>
                                <tr> 
                                <td> Korisnicko ime:</td>
                                <td> {{dostavljac.username}} </td>
                                </tr>
                                <tr> 
                                <td> Pol:</td>
                                <td> {{dostavljac.gender}} </td>
                                </tr>
                                <tr> 
                                <td>Datum rodjenja: </td>
                                <td> {{dostavljac.birthday}} </td>
                                </tr>
                                <tr> 
                                <td> Adresa:</td>
                                <td> {{menadzer.address.street}} {{menadzer.address.number}}, grad {{menadzer.address.city}}  {{menadzer.address.zipCode}} </td>
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
        router.push(`/izmeniProfilDostavljac`)
    }
},
mounted(){
    axios.get("/WebShopREST/rest/profile/profileUser")
        .then( response => {
            this.dostavljac = response.data
        })
        .catch(function(error){
            console.log(error)
        })
},
});