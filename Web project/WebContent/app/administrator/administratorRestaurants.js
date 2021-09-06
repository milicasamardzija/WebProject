Vue.component("administrator-restaurants", {
    data(){
        return{
            restaurants:[]
        }
    },
template: `
<div class="containerInfo">

<!-- modal obrisi-->
        <div class="modal fade" id="brisanje" role="dialog" >
            <div class="modal-dialog" style="width: 300px;" >
                <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-header" style="padding:35px 50px;">
                <h5 class="modal-title" id="exampleModalLabel">Odjavi se</h5>
                </div>
                <div class="modal-body" id="brisanje" style="padding:40px 50px;">
                    <form role="form" method='get' @submit="delete">
                      <div> <p> Da li ste sigurni da zelite da obrisete?</p></div>
                        <button type="submit" class="btn btn-danger btn-block"><span class="glyphicon glyphicon-off"></span> Odjava</button>
                    </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-default pull-left"  data-dismiss="modal">Odustani</button>   
                </div>
            </div>
            </div>
        </div>

<!--pretraga-->
<div class="row" style="width:1400px !important; margin-left:30px;">
<div class="col-lg-12">
    <div class="row" style="width:1400px !important;">
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
            <div class="rest tab-pane container active">
                <div class="row-restaurants" v-for="restaurant in restaurants">
                    <div class = "col-with-picture">
                        <div class="col-picture">
                            <div class="imageRest"></div>
                        </div>
                    </div>
                    <div class="col-info">
                        <h4 class="text">Naziv {{restaurant.name}}</h4>
                        <h4 class="text">Tip {{restaurant.type}}</h4>
                        <h4 class="text">Lokacija {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}}</h4>
                        <h4 class="text">Procesna ocena</h4>
                    </div>
                    <div class="buttons">
                        <div class="buttons btn-group-vertical">
                            <button type="button" class="btn btn-secondary">Dodaj menazera</button>
                            <button type="button" class="btn btn-secondary">Izmeni</button>
                            <button type="button" class="btn btn-secondary"  >Izbrisi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>   
`,
methods:{

},
mounted(){
    axios.get("/WebShopREST/rest/restaurant/getAllRestaurants")
      .then( response => {
          this.restaurants = response.data
      })
      .catch(function(error){
          console.log(error)
      })
},
});