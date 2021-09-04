Vue.component("administrator-users", {
  data:function(){
      return{
          allUsers: null
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
        <tr v-for="user in allUsers">
          <td>{{user.name}}</td>
          <td>{{user.surname}}</td>
          <td>{{user.username}}</td>
          <td>{{user.points}}</td>
          <td>{{user.role}}</td>
          <td>{{user.role}}</td>
          <div>
            <td><button type="button" class="btn btn-secondary" v-on:click="changeUser">Izmeni</button></td>
            <td><button type="button" class="btn btn-secondary">Izbrisi</button></td>
          </div>
        </tr>
      </tbody>
  </table>
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
    router.push(`/izmeniKorisnika`)
  },
  search: function(){
    router.push(`/pretraga`);
    },
    filter: function(){
    router.push(`/filtriranje`);
    },
    sort: function(){
        router.push(`/sortiranje`);
    }
}
});