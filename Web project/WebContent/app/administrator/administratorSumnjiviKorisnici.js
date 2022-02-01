Vue.component("administrator-usersSuspecious", {
    data:function(){
        return{
          allUsers: [],
          selected:{}, 
          searchParameters: {}
        }
    },    
template: `
<div class="containerInfo">


  <div class="container">
    
    
       <!--pretraga-->
                <table  style="margin-top: 30px; margin-left: -60px;">
                    <tr> 
                    <td> </td>
                    <td><input type="text" placeholder="Ime" v-model="searchParameters.name" style="margin-left: 40px; height: 40px; width: 200px; " class="form-control search-slt" >  </td>
                    <td style="width: 70px;"> </td>
                    <td>  <input type="text" placeholder="Prezime" v-model="searchParameters.surname" style="margin-left: 60px; height: 40px; width: 200px; " class="form-control search-slt"></td>  
                    <td style="width: 70px;"> </td>
                    <td > <input  type="text" placeholder="Korisnicko ime" v-model="searchParameters.username" style="margin-left: 60px; height: 40px; width: 200px;  " class="form-control search-slt"> </td>  
                    <td style="width: 70px;"> </td>
                    <td> <button style=" margin-left: 70%;" class="btn btn-danger" type="button" v-on:click= "" >Pronadji</button> </td>  
                    <td style="width: 200px;"> </td> 
                  
                    </tr>
                </table> 
                
                <!-- filtriranje -->
                  <table style= " margin-left:-20px;">
                <tr> 

                    <td>  </td> 
                    <td style= "font-size: 16px;"> Filtrirajte registrovane korisnike po odgovarajucoj ulozi:  </td> 
                    <td> <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style= "margin-left:10%;" >
                            Uloga korisnika
                            </button>
            
                            <span class="dropdown-menu" aria-labelledby="dropdownMenu2" >
                            <button class="dropdown-item" type="button" v-on:click="filterType('CUSTOMER')">KUPAC</button>
                            <button class="dropdown-item" type="button" v-on:click="filterType('MANAGER')">MENADZER</button>
                            <button class="dropdown-item" type="button" v-on:click="filterType('DELIVERER')">DOSTAVLJAC</button>

                            </span>
                        </td> 


                        <td>  </td> 
                        <td>  </td> 
                        <td>  </td> 
                        <td  style= "font-size: 16px; padding-left:20px;"> ili po tipu korisnika:  </td> 
                        <td> <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style="margin-left:20%; margin-top:20px;margin-bottom:20px;" >
                            Tip korisnika (kupaca)
                            </button>
            
                            <span class="dropdown-menu" aria-labelledby="dropdownMenu2" >
                            <button class="dropdown-item" type="button" v-on:click="filterTypeCustomer('GOLD')">ZLATNI</button>
                            <button class="dropdown-item" type="button" v-on:click="filterTypeCustomer('SILVER')">SREBRNI</button>
                            <button class="dropdown-item" type="button" v-on:click="filterTypeCustomer('BRONZE')">BRONZANI</button>
                          </span>
                        </td>
                      <td style="width:50px;"> </td>
        <td><button class="btn btn-secondary" type="button"  v-if="check" v-on:click="reset()">x</button> </td> 
                      
                </tr>

            </table> 
            
            
            <!-- sortiranje --> 
               <table style= " margin-left:-20px; margin-bottom: 3em;">
                <tr> 

                    <td>  </td> 
                    <td style= "font-size: 16px;"> Sortiranje registrovanih korisnika po nekom od zadatih kriterijuma:  </td> 
                    <td> <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style= "margin-left:10%;" >
                            Sortiraj
                            </button>
            
                            <span class="dropdown-menu" aria-labelledby="dropdownMenu2" >
                            <button class="dropdown-item" type="button" v-on:click="sortNameAsc()">Imenu rastuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortNameDesc()">Imenu opadajuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortSurnameAsc()">Prezimenu rastuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortSurnameDesc()">Prezimenu opadajuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortUsernameAsc()">Korisnickom imenu rastuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortUsernameDesc()">Korisnickom imenu opadajuce</button>

                            </span>
                        </td> 
      
                </tr>
				<tr> </tr>
            </table> 
    

        </div>
 


    <table class="table table-hover" style="width: 70%; margin-left: 14%">
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

    getSelected: function(user){
      this.selected = user;
    },
    
     filterTypeCustomer: function (type){
        this.allUsers = this.allUsers.filter(order => order.typeCustomer.type === type);
        
        this.check = true
    },
    
    filterType: function (type){
        this.allUsers = this.allUsers.filter(user => user.role === type);
        
        this.check = true
    },
    sortNameAsc: function() {
        function compare(a, b) {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        }

        return this.allUsers.sort(compare);
    }, 
    sortNameDesc: function() {
        function compare(a, b) {
          if (a.name < b.name)
            return 1;
          if (a.name > b.name)
            return -1;
          return 0;
        }
        
        return this.allUsers.sort(compare);
    },
        sortSurnameAsc: function() {
        function compare(a, b) {
          if (a.surname < b.surname)
            return -1;
          if (a.surname > b.surname)
            return 1;
          return 0;
        }

        return this.allUsers.sort(compare);
    }, 
    sortSurnameDesc: function() {
        function compare(a, b) {
          if (a.surname < b.surname)
            return 1;
          if (a.surname > b.surname)
            return -1;
          return 0;
        }
        
        return this.allUsers.sort(compare);
    },
        sortUsernameAsc: function() {
        function compare(a, b) {
          if (a.username < b.username)
            return -1;
          if (a.username > b.username)
            return 1;
          return 0;
        }

        return this.allUsers.sort(compare);
    }, 
    sortUsernameDesc: function() {
        function compare(a, b) {
          if (a.username < b.username)
            return 1;
          if (a.username > b.username)
            return -1;
          return 0;
        }
        
        return this.allUsers.sort(compare);
    },
    reset: function(){
        axios.get("/WebShopREST/rest/user/getAllSuspiciousUsers")
      .then( response => {
          this.allUsers = response.data,
          this.check = false;
      })
      .catch(function(error){
          console.log(error)
      })
    
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