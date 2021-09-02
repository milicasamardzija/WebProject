Vue.component("restoran-menadzer", {
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
                        <button type="button" class="btn btn-success " v-on:click="addArticle"> Dodaj artikal </button>
                    </div>
            
                </div>
               
            <h4 style="margin-left: 15px;  font-weight: bold; "> ARTIKLI:  </h4> 

            
    <div id="artikli" class="tab-pane fade in active">
    <div class="containerInfo">
   <div class="tab-content">
        <div class="panel">
           <div class="row-artical">


            <div class="column">
                <div class="card">
                 <img src="../pictures/pizza.jpg" alt="Jane" style="width:70%; margin-left: 30px;">
                  <div class="container">
                     <h2>Margarita</h2>
                      <p class="title">Pizza</p>
                      <p>Cena: 780,00 din</p>
                      <p>Grmaza: 500g</p>
                      <p><button class="button">Izmeni</button></p>
                      <p><button class="button">Izbrisi</button></p>
                   </div>
                </div>
            </div>

            <div class="column">
            <div class="card">
            <img src="../pictures/domaca.png" alt="Jane" style="margin-top: 25px;">
            <div class="container">
                <h2>Domaca</h2>
                <p class="title">Pizza</p>
                <p>Cena: 600,00 din</p>
                <p>Grmaza: 500g</p>
                <p><button class="button">Izmeni</button></p>
                <p><button class="button">Izbrisi</button></p>
                 </div>
                </div>
             </div>
            
        </div>   
     
    </section>
`,
methods:{
addArticle: function() {
    router.push(`/dodajArtikal`)
}
},
mounted(){

},
});