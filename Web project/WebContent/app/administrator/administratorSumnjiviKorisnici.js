Vue.component("administrator-usersSuspecious", {
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

    </div>

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
        <td>{{user.typeCustomer.type}}</td>
        <div>
          <td><button type="button" class="btn btn-secondary" v-on:click="blockUser(user.username)">Blokiraj</button></td>
        </div>
      </tr>
        </tbody>
      </table>

</div>
`,
    mounted() {
        axios.get("/WebShopREST/rest/user/getAllSuspiciousUsers")
        .then( response => {
            this.allUsers = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    methods : {
		search() {
		router.push(`/sumnjiviPretraga`)
	  },
		filter() {
		router.push(`/sumnjiviFilter`)
	  },
		sort() {
		router.push(`/sumnjiviSort`)
	  },
    getSelected: function(user){
      this.selected = user;
    },
    blockUser: function(username){
      axios.post('/WebShopREST/rest/user/blockUser', username)
            .then(response => {
              this.$router.go()
              router.push(`/sumnjivikorisnici`);
              
            })
            .catch(function(error){
                console.log(error)
            })
    }
	}
});