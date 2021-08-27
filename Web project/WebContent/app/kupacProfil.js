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
                                    <td> </td>
                                    </tr>
                                <tr> 
                                <td>Prezime: </td>
                                </tr>
                                <tr> 
                                <td> Korisnicko ime:</td>
                                </tr>
                                <tr> 
                                <td> Pol:</td>
                                </tr>
                                <tr> 
                                <td>Datum rodjenja: </td>
                                </tr>
                                <tr> 
                                <td> Adresa:</td>
                                </tr>
                                <tr> 
                                <td>Broj telefona: </td>
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
        router.push(`/izmeniProfil`)
    }
},
mounted(){

},
});