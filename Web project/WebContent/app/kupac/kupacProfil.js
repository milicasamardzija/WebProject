Vue.component("profil-kupac", {
    data(){
        return{
            kupac:null
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
                                    <td> {{kupac.name}} </td>
                                    </tr>
                                <tr> 
                                <td>Prezime: </td>
                                <td> {{kupac.surname}} </td>
                                </tr>
                                <tr> 
                                <td> Korisnicko ime:</td>
                                <td> {{kupac.username}} </td>
                                </tr>
                                <tr> 
                                <td> Pol:</td>
                                <td> {{kupac.gender}} </td>
                                </tr>
                                <tr> 
                                <td>Datum rodjenja: </td>
                                <td> {{kupac.birthday | dateFormat('DD.MM.YYYY.')}} </td>
                                </tr>
                                <tr> 
                                    <td> Adresa:</td>
                                    <td> {{kupac.address.street}} {{kupac.address.number}}, grad {{kupac.address.city}}  {{kupac.address.zipCode}} </td>
                                </tr>
                                <tr> 
                                <td>Broj bodova: </td>
                                <td> {{kupac.points}} </td>
                                </tr>
                                <tr> 
                                <td>Tip kupca </td>
                                <td> {{kupac.typeCustomer.type}}, za Gold potrebno: {{kupac.typeCustomer.points}} bodova </td>
                                </tr>
                                <tr style="height: 10px;"> </tr>
                                </table>
                                <button type="button" class="btn btn-success" v-on:click="editProfile">Izmeni podatke</button>
                            </div>
                    </div>
            </div>
           
</section>
`,
methods:{
    editProfile: function() {
        router.push(`/izmeniProfil`)
    }
},
mounted(){
    axios.get("/WebShopREST/rest/profile/profileUser")
        .then( response => {
            this.kupac = response.data
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