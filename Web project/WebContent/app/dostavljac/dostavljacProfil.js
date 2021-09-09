Vue.component("profil-dostavljac", {
    data(){
        return{
            dostavljac:null
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
                                <td> <input type="date" :value=" && new Date(myDate.getTime()-(myDate.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]"
                                @input="myDate = $event.target.valueAsDate"> </td>
                                </tr>
                                <tr> 
                                <td> Adresa:</td>
                                <td> {{dostavljac.address.street}} {{dostavljac.address.number}}, grad {{dostavljac.address.city}}  {{dostavljac.address.zipCode}} </td>
                                </tr>
                               
                                </table>
                                <button type="button" class="btn btn-success" v-on:click="editProfile">Izmeni podatke</button>
                            </div>
                    </div>
            </div>
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
    }
});