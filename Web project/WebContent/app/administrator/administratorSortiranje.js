Vue.component("administrator-sortiranje", {  
    data:function(){
        return{
        allUsers : [],
        selected : {}
    }
},
template: `

<form action="#" >
        <div class="containerInfo" > 
           
      <table style= " margin-left:60px;">
                <tr> 

                    <td>  </td> 
                    <td style= "font-size: 16px; margin-left:10px;"> Sortiranje registrovanih korisnika po nekom od zadatih kriterijuma:  </td> 
                    <td> <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style= "margin-left:10%;" >
                            Sortiraj
                            </button>
            
                            <span class="dropdown-menu" aria-labelledby="dropdownMenu2" >
                            <button class="dropdown-item" type="button" v-on:click="sortUser('imeRastuce')">Imenu rastuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortUser('imeOpadajuce')">Imenu opadajuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortUser('prezimeRastuce')">Prezimenu rastuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortUser('prezimeOpadajuce')">Prezimenu opadajuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortUser('korisnickoImeRastuce')">Korisnickom imenu rastuce</button>
                            <button class="dropdown-item" type="button" v-on:click="sortUser('korisnickoImeOpadajuce')">Korisnickom imenu opadajuce</button>

                            </span>
                        </td> 
      
                </tr>

            </table> 
       
         <button style="margin-left: 90%;" class="btn btn-danger" type="button" v-on:click= "back">Vrati se nazad</button> 
        
         

            <h4 style="margin-left: 60px"><p> Korisnici koje odgovaraju zadatom kriterijumu sortiranja: </p> </h4>

          <!--tabela-->
          <table class="table table-hover" style="width:95%">
          <thead>
              <tr>
              <th scope="col">Ime</th>
              <th scope="col">Prezime</th>
              <th scope="col">Korisnicko ime</th>
             
              <th scope="col">Uloga</th>
              <th scope="col">Tip korisnika</th>
              <th scope="col"></th>
              </tr>
          </thead>
          <tbody>
          <tr v-for="user in allUsers" >
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

    </form>
         
  


`,
methods:{
    back: function() {
        router.push(`/korisnici`)
    },
     
    deleteUser: function(){
        axios.post('/WebShopREST/rest/user/deleteUser', this.selected.username)
        .then(response => {
            router.push(`/korisnici`);
        })
        .catch(function(error){
            console.log(error)
        })
    },
sortUser(type) {
    this.allUsers = null,
    axios.post("/WebShopREST/rest/user/sortUser", type)
    .then( response => {
        this.allUsers = response.data
    })
    .catch(function(error){
        console.log(error)
    })

}
 
},
mounted(){

},
});