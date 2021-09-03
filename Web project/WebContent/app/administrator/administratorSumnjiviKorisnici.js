Vue.component("administrator-usersSuspecious", {
    data:function(){
        return{
            allUsers: null
        }
    },    
template: `
<div class="containerInfo">
<div class="search-bar">
    <div class="container">
        <form action="#" >
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-2 col-md-3 col-sm-12 p-0 search">
                            <input type="text" class="form-control search-slt" placeholder="Ime">
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-12 p-0 search" >
                            <input type="text" class="form-control search-slt" placeholder="Prezime">
                        </div>
                        <div class="col-lg-2 col-md-3 col-sm-12 p-0 search" >
                          <input type="text" class="form-control search-slt" placeholder="Korisnicko ime">
                        </div>
                        <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                            <button class="btn btn-secondary dropdown-toggle filters" type="button" data-toggle="dropdown">
                              Uloga
                            </button>
                            <div class="dropdown-menu">
                              <button class="dropdown-item" type="button">Action</button>
                              <button class="dropdown-item" type="button">Another action</button>
                              <button class="dropdown-item" type="button">Something else here</button>
                            </div>
                          </div>
                          <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
                              Tip korisnika
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                              <button class="dropdown-item" type="button">Action</button>
                              <button class="dropdown-item" type="button">Another action</button>
                              <button class="dropdown-item" type="button">Something else here</button>
                            </div>
                          </div>
                        <div class="col-lg-2 col-md-3 col-sm-12 btn-search">
                            <button type="button" class="btn btn-danger wrn-btn">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
<div>
    <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">Korisnicko ime</th>
            <th scope="col">Broj sakupljenih bodova</th>
            <th scope="col">Uloga</th>
            <th scope="col">Tip korisnika</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>moto</td>
            <td>5000</td>
            <td>kupac</td>
            <td>zlatni</td>
            <td><button type="button" class="btn btn-secondary">Blokiraj</button></td>
          </tr>
        </tbody>
      </table>
</div>
`,
    mounted() {
        axios.get("/WebShopREST/rest/user/getAllUsersSuspecious")
        .then( response => {
            this.allUsers = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    methods : {
		
	}
});