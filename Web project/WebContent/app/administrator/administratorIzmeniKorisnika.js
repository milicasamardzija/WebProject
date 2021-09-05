Vue.component("administrator-changeUser", {
    data:function(){
        return{
            newUser: {},
            user: {}
        }
    },    
  template: `
  <div class="containerInfo t"> 
  <div class="information">
    <form @submit="addUser" method="POST">
      <table  >
        <tr >
          <td class="labela">Uloga:</td>
          <td><input class="form-check-input" type="radio" id="exampleRadios2" value="MANAGER" v-model="newUser.role" >
              <label class="form-check-label" for="exampleRadios2">
                Menadzer
              </label>
          </td>
          <td><input class="form-check-input" type="radio" id="exampleRadios2" value="DELIVERER"  v-model="newUser.role">
              <label class="form-check-label" for="exampleRadios2">
                Dostavljac
              </label>
          </td>
        </tr>
        <tr>
          <td class="labela">Ime:</td>
          <td><input class="form-control" type="text" placeholder="Ime" v-model="newUser.name"></td>
        </tr>
        <tr>
            <td class="labela">Prezime:</td>
            <td><input class="form-control" type="text" placeholder="Prezime" v-model="newUser.surname"></td>
        </tr>
        <tr>
            <td class="labela">Pol:</td>
            <td><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="MALE" v-model="newUser.gender" checked>
                <label class="form-check-label" for="exampleRadios1">
                  Muski
                </label>
            </td>
            <td><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="FEMALE"  v-model="newUser.gender" checked>
                <label class="form-check-label" for="exampleRadios1">
                  Zenski
                </label>
            </td>
        </tr>
        <tr>
            <td class="labela">Datum rodjenja:</td>
            <td><div class="form-group"> 
                <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="date" v-model="newUser.birthday"/>
              </div></td>
        </tr>
        <tr>
          <td class="labela">Adresa:</td>
          <td><input class="form-control" type="text" placeholder="Adresa" v-model="newUser.street"></td>
          <td class="buttonMap"><button type="button" class="btn btn-success"><i></i>Choose on map</button></td>
        </tr>
        <tr>
          <td class="labela">Broj:</td>
          <td><input class="form-control" type="text" placeholder="Broj" v-model="newUser.number"></td>
        </tr>
        <tr>
          <td class="labela">Grad:</td>
          <td><input class="form-control" type="text" placeholder="Grad" v-model="newUser.city"></td>
        </tr>
        <tr>
          <td class="labela">Postanski broj:</td>
          <td><input class="form-control" type="text" placeholder="Postanski broj" v-model="newUser.zipCode"></td>
        </tr>
        <tr>
          <td class="buttonForm"><button type="button" v-on:click="changeUser" class="btn btn-success" >Sacuvaj</button></td>
        
        </tr>
   </table>
    </form>     <td class="buttonForm"><button type="button" class="btn btn-success">Otkazi</button></td>
  </div>
  </div>
  `,
  methods : {
    changeUser: function(event){
      event.preventDefault()
      axios.post("/WebShopREST/rest/user/changeUser", {
      "name":''+ this.newUser.name, 
      "surname":''+ this.newUser.surname, 
      "gender":''+ this.newUser.gender, 
      "birthday":''+ this.newUser.birthday, 
      "role":''+ this.newUser.role, 
      "street":''+ this.newUser.street, 
      "number":''+ this.newUser.number, 
      "city":''+ this.newUser.city, 
      "zipCode":''+ this.newUser.zipCode})
      .then(
        response => {
          router.push(`/korisnici`);
        } 
      )
      .catch(function(error){
        console.log(error)
    })
    }
  },
  mounted() {
      this.user = this.$route.query.username,
      axios.post("/WebShopREST/rest/user/getUser", {
                  "deleted": this.user.deleted, 
                  "blocked": this.user.blocked, 
                  "username": this.user.username, 
                  "password": this.user.password, 
                  "name": this.user.name, 
                  "surname": this.user.surname, 
                  "gender": this.user.gender, 
                  "birthday": this.user.birthday, 
                  "role": this.user.role,
                  "address": this.user.address,
                  "orderIds": this.user.orderIds, 
                  "chartId": this.user.chartId, 
                  "points":  this.user.points,
                  "typeCustomer":  this.user.typeCustomer,
                  "idRestaurant":  this.user.idRestaurant
                  })
      .then( response => {
          this.newUser = response.data
      })
      .catch(function(error){
          console.log(error)
      })
  }
})