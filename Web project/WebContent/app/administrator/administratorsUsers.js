Vue.component("administrator-users", {
  data:function(){
      return{
          allUsers: [],
          selected:{}
      }
  },    
template: `
<div class="containerInfo">
 

    <div class="container">
        <button style=" margin-left: 38%;"class="btn btn-success" type="button" v-on:click="search">PRETRAGA</button>
        <button class="btn btn-success" type="button" v-on:click="filter">FILTRIRANJE</button>
        <button class="btn btn-success" type="button" v-on:click="sort">SORTIRANJE</button>
        <button v-on:click= "addUser" style= "margin-left: 20px;" type="button" class="btn btn-danger wrn-btn  col-lg-1 col-md-3 col-sm-12"><span class="glyphicon glyphicon-plus"></span></button>
    </div>
 

  


  <!--tabela-->
  <div id="users">
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
          <tr v-for="user in allUsers" v-on:click="getSelected(user)">
            <td>{{user.name}}</td>
            <td>{{user.surname}}</td>
            <td>{{user.username}}</td>
            <td>{{user.points}}</td>
            <td>{{user.role}}</td>
            <td>{{user.role}}</td>
            <div>
              <td><button type="button" class="btn btn-secondary" v-on:click="changeUser">Izmeni</button></td>
              <td><button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#brisanje" >Izbrisi</button></td>
            </div>
          </tr>
        </tbody>
    </table>
  </div>

  <!-- modal obrisi-->
  <div class="modal fade" id="brisanje" role="dialog" >
          <div class="modal-dialog" style="width: 300px;" >
              <!-- Modal content -->
              <div class="modal-content">
                  <div class="modal-header" style="padding:35px 50px;">
                  <h5 class="modal-title" id="exampleModalLabel">Odjavi se</h5>
                  </div>
                  <div class="modal-body"  style="padding:40px 50px;">
                      <form role="form" @submit="deleteUser">
                        <div> <p> Da li ste sigurni da zelite da obrisete?</p></div>
                          <button type="submit" class="btn btn-danger btn-block" v-on:click="deleteUser"><span class="glyphicon glyphicon-off"></span> Obrisi</button>
                      </form>
                  </div>
                  <div class="modal-footer">
                  <button type="button" class="btn btn-danger btn-default pull-left"  data-dismiss="modal">Odustani</button>   
                  </div>
              </div>
          </div>
  </div>

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
  }, 
  changeUser : function () {
    this.$router.push({path: `/izmeniKorisnika`, query:{ username: this.selected}})
  },
    search: function(){
    router.push(`/pretraga`);
    },
    filter: function(){
    router.push(`/filtriranje`);
    },
    getSelected: function(user){
      this.selected = user;
    },
    sort: function(){
        router.push(`/sortiranje`);
    }, 
    deleteUser: function(){
            axios.post('/WebShopREST/rest/user/deleteUser', this.selected.username)
            .then(response => {
                router.push(`/korisnici`);
            })
            .catch(function(error){
                console.log(error)
            })
        }
  }
  });
