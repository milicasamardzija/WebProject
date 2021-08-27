Vue.component("izmeniProfil-kupac", {
   
    data: {
        
        mode: 'INFORMACIJE'
      
    
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
                            <form>
                                    <table>
                                        <tr>
                                            <td> Ime: </td>
                                            <td> <input class="form-control" type="text"  > </td>
                                        </tr>
                                        <tr> 
                                            <td>Prezime: </td>
                                            <td> <input class="form-control" type="text" > </td>
                                        </tr>
                                        <tr> 
                                            <td> Korisnicko ime:</td>
                                            <td> <input class="form-control" type="text" > </td>
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
                                            <td> <input class="form-control" type="text" placeholder="ulica" ></td>
                                            <td> <input class="form-control" type="text" placeholder="broj" style="width:70px" ></td>
                                            <td> <input class="form-control" type="text" placeholder="grad" style="width:120px"></td>
                                            <td> <input class="form-control" type="text" placeholder="postanski broj" style="width:115px" ></td>
                                        </tr>
                                        <tr> 
                                            <td>Broj telefona: </td>
                                            <td> <input class="form-control" type="text"></td> 
                                        </tr>
                                        <tr> 
                                           <button type="button" class="btn btn-danger" v-on:click="changePassword"> Promeni sifru </button>
                                        </tr>
                                           <form id="izmena" v-bind:hidden="mode=='INFORMACIJE'">
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

                            </form>
                            <button type="button" class="btn btn-success" v-on:click="openProfile">Sacuvaj izmene</button>
                        </div>
                    </div>    
            </div>
        
           
</section>
`,
methods:{
    openProfile: function() {
        router.push(`/profil`)
    }, 
    changePassword: function(){
       this.mode='PASSWORD'
    }
},
mounted(){

},
});