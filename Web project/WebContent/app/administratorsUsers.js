Vue.component("administrator-users", {
    data:function(){
        return{
            allUsers: null
        }
    },    
template: `
    <div>  
        <section class="search-bar">
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
                                  <div class="dropdown col-lg-1 col-md-3 col-sm-12 p-0 filt">
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
                                  <button type="button" class="btn btn-danger wrn-btn plusButton col-lg-1 col-md-3 col-sm-12" v-on:click = "addUser"><span class="glyphicon glyphicon-plus"></span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        <!--tabela-->
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
                  <tr v-for="(user,index) in allUsers">
                    <td>{{user.name}}</td>
                    <td>{{user.surname}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.points}}</td>
                    <td>{{user.role}}</td>
                    <td>{{user.role}}</td>
                    <div>
                      <td><button type="button" class="btn btn-secondary">Izmeni</button></td>
                      <td><button type="button" class="btn btn-secondary">Izbrisi</button></td>
                    </div>
                  </tr>
                </tbody>
              </table>
        </div>
        </section>
    </div>
`,
    mounted() {
        axios.get("/WebShopREST/rest/user/getAllUsers")
        .then( response => {
            this.allUsers = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    methods : {
		addUser : function () {
				router.push(`/dodajKorisnika`)
		}
	}
});