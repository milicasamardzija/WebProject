Vue.component("profil-dostavljac", {
    data(){
        return{
            dostavljac:null
        }
    },
template: `
<div class="containerInfo"> 
 <div class="row content">
                    <div class="col-sm-3 sidenav " style="margin-left: 10%">
                        <h3 style="width: 200px;"><small>Vase informacije na profilu:</small> <hr> </h3>
                        <img src="../pictures/korisnik.png">
                    </div> 
                    <div class="col-sm-9">
                            <div class="informations" >
                                
                                <table style="margin-top: 120px;">
                                    <tr style="height: 25px;">
                                        <td style="width:11em;"> Ime: </td>
                                        <td> {{dostavljac.name}}</td>
                                        </tr>
                                    <tr style="height: 25px;"> 
                                    <td>Prezime: </td>
                                    <td> {{dostavljac.surname}} </td>
                                    </tr>
                                    <tr style="height: 25px;"> 
                                    <td> Korisnicko ime:</td>
                                    <td> {{dostavljac.username}} </td>
                                    </tr>
                                    <tr style="height: 25px;"> 
                                    <td> Pol:</td>
                                    <td> {{dostavljac.gender}} </td>
                                    </tr>
                                    <tr style="height: 25px;"> 
                                    <td>Datum rodjenja: </td>
                                    <td> {{dostavljac.birthday | dateFormat('DD.MM.YYYY.')}} </td>
                                    
                                    <tr style="height: 25px;"> 
                                    <td> Adresa:</td>
                                    <td> {{dostavljac.address.street}} {{dostavljac.address.number}}, {{dostavljac.address.city}}  {{dostavljac.address.zipCode}} </td>
                                    </tr>
                                <tr style="height: 25px;">  </tr> 
                                </table>
                                <button type="button" class="btn btn-success" v-on:click="editProfile">Izmeni podatke</button>
                            </div>
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
    },
filters: {
        dateFormat: function(value, format){
            var parsed = moment(value);
            return parsed.format(format)
        }
}
});
