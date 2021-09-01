Vue.component("komentariRestoran-kupac", {
    data(){
        return{
            restaurants:[]
        }
    },
template: `
    <section>
    
        <div class="containerInfo" >

            <div class="row-restaurants">
                <div class = "col-with-picture">
                    <div class="col-picture">
                        <div class="imageRest"></div>
                    </div>
                </div>
                <div class="col-info">
                    <h4 class="text" style="color: black;">Naziv:</h4>
                    <h4 class="text"style="color: black;" >Tip:</h4>
                    <h4 class="text" style="color: black;">Lokacija:</h4>
                    <h4 class="text" style="color: black;">Status:</h4>
                    <h4 class="text" style="color: black;">Prosecna ocena:</h4>
                    <button type="button" class="btn btn-success " v-on:click="goBack"> Povratak na porucivanje  </button>
                </div>
        
            </div>
             <h4 style="margin-left: 15px;  font-weight: bold; "> KOMENTARI:  </h4> 

                        <div class="media" style="margin-left: 50px">
                                        <div class="media-left media-top">
                                            <img src="../pictures/korisnik.png" class="media-object" style="width:60px">
                                        </div>
                                            <div class="media-body">
                                                <h4 class="media-heading">Ciao</h4>
                                                <p style="font-weight: 300; font-style: italic;">pera123</p>
                                                <p>Sve je bilo super</p>
                                                <p>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star checked"></span>
                                                    <span class="fa fa-star"></span>
                                                    <span class="fa fa-star"></span>
                                                </p>
                                            </div>
                        </div>
                               
                        <hr>   

                        <div class="media" style="margin-left: 50px">
                            <div class="media-left media-top">
                                <img src="../pictures/korisnik.png" class="media-object" style="width:60px">
                            </div>
                                <div class="media-body">
                                        <h4 class="media-heading">Ciao</h4>
                                        <p style="font-weight: 300; font-style: italic;">pera123</p>
                                        <p>Sve je bilo super</p>
                                        <p>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                        </p>
                                </div>
                        </div>
                      
                        <hr>   
             
        </div>   
     
    </section>
`,
methods:{
goBack: function() {
    router.push(`/prikaziRestoran`);
}
},
mounted(){

},
});