Vue.component("restorani-kupac", {
    data(){
        return{
            restaurants:[]
        }
    },
template: `
    <section>
        <div class="containerInfo">
            <form action="#" >
            
                <div class="row-restaurants">
                    <div class = "col-with-picture">
                        <div class="col-picture">
                            <div class="imageRest"></div>
                        </div>
                    </div>
                    <div class="col-info">
                        <h4 class="text">Naziv</h1>
                        <h4 class="text">Tip</h1>
                        <h4 class="text">Lokacija</h1>
                        <h4 class="text">Procesna ocena</h1>
                    </div>
                    <div class="buttons">
                
                    </div>
                </div>
            </form>
        </div>   
    </section>
`,
methods:{

},
mounted(){

},
});