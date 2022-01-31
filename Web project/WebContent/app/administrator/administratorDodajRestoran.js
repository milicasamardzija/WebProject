Vue.component("administrator-addRestaurant", {
    data:function(){
        return{
          restaurant:{},
          managers:[]
        }
    },    
  template: `
    <div class="containerInfo t"> 
        <div class="information">
            <form>
                <table class="t">
                    <tr>
                    <p style="margin-left: 5px;">Ovde unesite podatke o restoranu:</p>
                    </tr>
                    <tr>
                    <td class="labela">Menadzer:</td>
                    <td><select class="form-control" v-model="restaurant.managerId" placeholder="Kliknite za izbor menadzera">
                        <option v-for="m in managers" v-bind:value="m.id">{{m.name}} {{m.surname}}</option>
                    </select></td>
                    <td class="buttonMap"><button type="button" class="btn btn-success" v-on:click="dodajMenadzera">Kreiraj novog menadzera</button></td>
                    <td><p style="margin-left: 15px;margin-top: 8px;">*Ukoliko ne postoje slobodni menadzeri klikom na ovo dugme kreirajte novog menadzera.</p></td>
                    </tr>
                    <tr>
                    <td class="labela">Naziv:</td>
                    <td><input class="form-control" type="text" placeholder="Naziv" v-model="restaurant.name"></td>
                    </tr>
                    <tr>
                    <td class="labela">Tip:</td>
                    <td><select class="form-control" v-model="restaurant.type" placeholder="Kliknite za izbor tipa">
                        <option value="ITALIJANSKI">Italijanski</option>
                        <option value="KINESKI">Kineski</option>
                        <option value="PIZZA">Pica</option>
                        <option value="ROSTILJ">Rostilj</option>
                        <option value="RIBLJI">Riblji</option>
                        <option value="VEGE">Veganski</option>
                    </select>
                    </td>
                    </tr>
                    <tr>
                    <td class="labela">Ulica:</td>
                    <td><input class="form-control" type="text" placeholder="Ulica" v-model="restaurant.street"></td>
                    <td class="buttonMap"><button type="button" class="btn btn-success"><i></i>Choose on map</button></td>
                    </tr>
                    <tr>
                    <td class="labela">Broj:</td>
                    <td><input class="form-control" type="text" placeholder="Broj" v-model="restaurant.number"></td>
                    </tr>
                    <tr>
                    <td class="labela">Grad:</td>
                    <td><input class="form-control" type="text" placeholder="Grad" v-model="restaurant.city"></td>
                    </tr>
                    <tr>
                    <td class="labela">Postanski broj:</td>
                    <td><input class="form-control" type="text" placeholder="Postanski broj" v-model="restaurant.zipCode"></td>
                    </tr>
                    <tr>
                    <td class="labela">Logo:</td>
                    <td><input type="file" onchange="encodeImageFileAsURL(this)" v-model="restaurant.link"></td>
                    </tr>
                    <tr>
                    <td class="buttonForm"><button type="button" class="btn btn-success" v-on:click="addRestaurant">Sacuvaj</button></td>
                    <td class="buttonForm"><button type="button" class="btn btn-success" v-on:click="otkazi">Otkazi</button></td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
  `,
    methods : {
      addRestaurant: function(event){
        event.preventDefault()
        axios.post("/WebShopREST/rest/restaurant/addRestaurant", {
        "name":''+ this.restaurant.name, 
        "type":''+ this.restaurant.type, 
        "street":''+ this.restaurant.street, 
        "number":''+ this.restaurant.number, 
        "city":''+ this.restaurant.city, 
        "zipCode":''+ this.restaurant.zipCode,
        "link":''+ this.restaurant.link, 
        "managerId":''+ this.restaurant.managerId})
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
      },
      dodajMenadzera: function(event){
        event.preventDefault()
        router.push(`/dodajMenadzera`);
      }
    },
    mounted(){
        axios.get("/WebShopREST/rest/user/getAvailableManagers")
        .then( response => {
            this.managers = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    }
  });