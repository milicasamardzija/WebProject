Vue.component("administrator-changeUser", {
    data:function(){
        return{
            newUser: {},
            user: {},
            name:"",
            surname:"",
            city:"",
            number:"",
            street:"",
            zipCode:""
        }
    },    
  template: `
  <div class="containerInfo t"> 
    <div class="information" >
      <form @submit='changeUser'>
        <table>
          <tr>
            <td class="labela">Ime:</td>
            <td><input class="form-control" type="text" placeholder="Ime"  v-model="newUser.name" v-bind:value="name"/>{{name}}</td>
          </tr>
          <tr>
              <td class="labela">Prezime:</td>
              <td><input class="form-control" type="text" placeholder="Prezime" v-model="newUser.surname" v-bind:value="surname"/>{{surname}}</td>
          </tr>
          <tr>
            <td class="labela">Ulica:</td>
            <td><input class="form-control" type="text" placeholder="Ulica" v-model="newUser.address.street" v-bind:value="street">{{street}}</td>
          </tr>
          <tr>
            <td class="labela">Broj:</td>
            <td><input class="form-control" type="text" placeholder="Broj" v-model="newUser.address.number" v-bind:value="number">{{number}}</td>
          </tr>
          <tr>
            <td class="labela">Grad:</td>
            <td><input class="form-control" type="text" placeholder="Grad" v-model="newUser.address.city" v-bind:value="city">{{city}}</td>
          </tr>
          <tr>
            <td class="labela">Postanski broj:</td>
            <td><input class="form-control" type="text" placeholder="Postanski broj" v-model="newUser.address.zipCode" v-bind:value="zipCode">{{zipCode}}</td>
          </tr>
          <tr>
            <td class="buttonForm"><button type="button" v-on:click="changeUser" class="btn btn-success">Sacuvaj</button></td> 
            <td class="buttonForm"><button type="button" v-on:click="otkazi" class="btn btn-success">Otkazi</button></td> 
          </tr>
        </table>
      </form> 
    </div>
  </div>
  `,
  methods : {
    changeUser: function(event){
      event.preventDefault()
      axios.post("/WebShopREST/rest/user/changeUser", {
      "username":''+ this.user.username,
      "name":''+ this.newUser.name, 
      "surname":''+ this.newUser.surname,  
      "street":''+ this.newUser.address.street, 
      "number":''+ this.newUser.address.number, 
      "city":''+ this.newUser.address.city, 
      "zipCode":''+ this.newUser.address.zipCode})
      .then(
        response => {
          router.push(`/korisnici`);
        } 
      )
      .catch(function(error){
        console.log(error)
    })
    },
    otkazi: function(event){
      event.preventDefault()
      router.push(`/korisnici`);
    }
  },
  mounted() {
      this.user = this.$route.query.username,
      axios.post("/WebShopREST/rest/user/getUser", {"username":''+this.user.username})
      .then( response => {
          this.newUser = response.data
      })
      .catch(function(error){
          console.log(error)
      })
  }
});