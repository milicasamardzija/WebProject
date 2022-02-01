Vue.component("menadzer-users", {
    data:function(){
        return{
            allUsers: []
        }
    },    
  template: `
  <div class="containerInfo">
   
  
    <!--tabela-->
    <div id="users" style="margin-left:6%">
      <table class="table table-hover" style="width: 70%">
          <thead> 
           <h3 style="margin-top: 1em !important; margin-bottom: 1.2em;" ><small>Ovo su korisnici koji porucuju iz Vaseg restorana:</small></h3> 
            <tr>
              <th scope="col">Ime</th>
              <th scope="col">Prezime</th>
              <th scope="col">Korisnicko ime</th>
              <th scope="col">Broj sakupljenih bodova</th>
              <th scope="col">Tip korisnika</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in allUsers">
              <td>{{user.name}}</td>
              <td>{{user.surname}}</td>
              <td>{{user.username}}</td>
              <td>{{user.points}}</td>
              <td>{{user.typeCustomer.type}}</td>
            </tr>
          </tbody>
      </table>
    </div>
  
  
  </div>
  `,
    mounted() {
        axios.get("/WebShopREST/rest/user/getAllUsersForRestaurant")
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
  