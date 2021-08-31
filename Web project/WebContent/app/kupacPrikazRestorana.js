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
            
            <div class="row" style="margin-left: 50px;">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-2 col-md-3 col-sm-12 p-0 search">
                        <input type="text" class="form-control search-slt" placeholder="Naziv restorana">
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-12 p-0 search" >
                        <input type="text" class="form-control search-slt" placeholder="Lokacija restorana">
                    </div>
                    <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
                        Tip restorana
                        </button>
                        <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button class="dropdown-item" type="button">Action</button>
                        <button class="dropdown-item" type="button">Another action</button>
                        <button class="dropdown-item" type="button">Something else here</button>
                        </span>
                    </div>
                    <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                        <button class="btn btn-secondary dropdown-toggle filters" type="button" data-toggle="dropdown">
                        Ocena restorana
                        </button>
                        <div class="dropdown-menu">
                        <button class="dropdown-item" type="button">Action</button>
                        <button class="dropdown-item" type="button">Another action</button>
                        <button class="dropdown-item" type="button">Something else here</button>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-12 btn-search">
                        <button type="button" class="btn btn-danger wrn-btn">Pretrazi kombinovano</button>
                    </div>
                </div>
            </div>
        </div>
               




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