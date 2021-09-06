Vue.component("administrator-addRestaurant", {
    data:function(){
        return{
          restaurant:{}
        }
    },    
  template: `
    <div class="containerInfo t"> 
        <div class="information">
            <form>
                <table class="t">
                    <tr>
                    <td class="labela">Naziv:</td>
                    <td><input class="form-control" type="text" placeholder="Naziv"></td>
                    </tr>
                    <tr>
                    <td class="labela">Tip:</td>
                    <td><select class="form-control">
                        <option>Izbaeri tip</option>
                    </select></td>
                    </tr>
                    <tr>
                    <td class="labela">Adresa:</td>
                    <td><input class="form-control" type="text" placeholder="Adresa"></td>
                    <td class="buttonMap"><button type="button" class="btn btn-success"><i></i>Choose on map</button></td>
                    </tr>
                    <tr>
                    <td class="labela">Broj:</td>
                    <td><input class="form-control" type="text" placeholder="Broj"></td>
                    </tr>
                    <tr>
                    <td class="labela">Grad:</td>
                    <td><input class="form-control" type="text" placeholder="Grad"></td>
                    </tr>
                    <tr>
                    <td class="labela">Postanski broj:</td>
                    <td><input class="form-control" type="text" placeholder="Postanski broj"></td>
                    </tr>
                    <tr>
                    <td class="labela">Logo:</td>
                    <td><input type="file"  onchange="encodeImageFileAsURL(this)"></td>
                    </tr>
                    <tr>
                    <td class="labela">Menadzer:</td>
                    <td><select class="form-control">
                        <option>Izaberi menadzera</option>
                    </select></td>
                    <td class="buttonMap"><button type="button" class="btn btn-success"><i></i>Kreiraj novog menadzera</button></td>
                    </tr>
                    <tr>
                    <td class="buttonForm"><button type="button" class="btn btn-success">Sacuvaj</button></td>
                    <td class="buttonForm"><button type="button" class="btn btn-success">Otkazi</button></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
  `,
    methods : {
      addRestaurant: function(event){
        event.preventDefault()
        axios.post("/WebShopREST/rest/user/addUser", {
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
            router.push(`/`);
          } 
        )
        .catch()
      },
      otkazi: function(event){
        event.preventDefault()
        router.push(`/`);
      }
  }
  });