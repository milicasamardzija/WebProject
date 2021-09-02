Vue.component("dodajArtikal-menadzer", {
   
    data: {
        
       
    },
template: `
<section> 
            
            <div class="row content">
                <div class="row-sm-6 sidenav">
                    <h3><small>Dodavanje novog artikla:</small> <hr> </h3>
                    
                </div> 
                <div class="col-sm-9">
                        <div class="informations" >
                            <form>
                                    <table>
                                        <tr>
                                            <td> Naziv: </td>
                                            <td> <input class="form-control" type="text"  > </td>
                                        </tr>
                                        <tr> 
                                            <td>Cena: </td>
                                            <td> <input class="form-control" type="text" > </td>
                                            <td><h6>*cena u dinarima </h6></td>
                                        </tr>
                                        <tr> 
                                            <td> Tip:</td>
                                            <td> <select class="selectKolicina" id="tipArtikla" > 
                                           <option value="0"> Jelo </option>
                                           <option value="1"> Pice </option>
                                            </td>
                                        </tr>
                                      
                                        <tr> 
                                            <td>Kolicina: </td>
                                            <td> <input class="form-control" type="text"> </td>
                                            <td><h6>*ako je pice kolicina je u ml, a za hranu u g </h6></td>
                                        </tr>
                                        <tr> 
                                            <td> Opis:</td>
                                            
                                            <td> <input class="form-control" type="text"  ></td>
                                        </tr>
                                        <tr> 
                                        <td> Slika:</td>
                                        
                                        <td> </td>
                                    </tr>
                                    

                                           </form>
                                       
                                        
                                    </table>

                            </form>
                            <button type="button" class="btn btn-success" v-on:click="save">Sacuvaj artikal</button>
                        </div>
                    </div>    
            </div>
        
           
</section>
`,
methods:{
    save: function() {
        router.push(`/restoranMenadzer`)
    }
},
mounted(){

},
});