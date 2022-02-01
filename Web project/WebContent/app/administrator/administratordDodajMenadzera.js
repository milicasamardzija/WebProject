Vue.component("administrator-addManager", {
    data:function(){
        return{
          user:{},
            newUser:{},
            manager: null
        }
    },    
  template: `
  <div class="containerInfo t"> 
  <div class="information">
    <form @submit='addUser'>
      <table class="t">
        
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
            <td><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="MUSKI" v-model="newUser.gender" checked>
                <label class="form-check-label" for="exampleRadios1">
                  Muski
                </label>
            </td>
            <td><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="ZENSKI"  v-model="newUser.gender" checked>
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
          <td class="labela">Ulica:</td>
          <td><input class="form-control" type="text" placeholder="Adresa" v-model="newUser.street"></td>
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
          <td class="buttonForm"><button type="button" v-on:click="addUser" class="btn btn-success" >Nastavi</button></td>
          <td class="buttonForm"><button type="button" v-on:click="otkazi" class="btn btn-success">Otkazi</button></td> 
        </tr>
   </table>
    </form>     
  </div>
  </div>
  `,
    methods : {
      addUser: function(event){
        event.preventDefault()
        axios.post("/WebShopREST/rest/user/addUser", {
        "name":''+ this.newUser.name, 
        "surname":''+ this.newUser.surname, 
        "gender":''+ this.newUser.gender, 
        "birthday":''+ this.newUser.birthday, 
        "role":''+ 1, 
        "street":''+ this.newUser.street, 
        "number":''+ this.newUser.number, 
        "city":''+ this.newUser.city, 
        "zipCode":''+ this.newUser.zipCode})
        .then(
          response => {
            this.manager = this.newUser.name + this.newUser.surname;
            this.$router.push({path: `/dodajRestoranSaMenadzerom`, query:{ id: this.manager}})
          } 
        )
        .catch()
      },
      otkazi: function(event){
        event.preventDefault()
        router.push(`/dodajRestoran`);
      }
  }
  });