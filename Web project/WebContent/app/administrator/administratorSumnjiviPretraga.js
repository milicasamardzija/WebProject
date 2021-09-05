Vue.component("administratorSumnjivi-pretraga", {  
    data:function(){
        return{
        allUsers : [],
        searchParameters : {}
    }
},
template: `

<form action="#" >
        <div class="containerInfo" > 
           

        
                <table class="tableSearch" style="margin-top: 30px;">
                    <tr> 
                    <td> </td>
                    <td><input type="text" placeholder="Ime" v-model="searchParameters.name" style="margin-left: 30px; height: 40px; width: 200px;" >  </td>
                    
                    <td style="width: 70px;"> </td>

                    <td>  <input type="text" placeholder="Prezime" v-model="searchParameters.surname" style="margin-left: 30px; height: 40px; width: 200px;"></td>  
                    <td style="width: 70px;"> </td>
                   
                
                    <td > <input  type="text" placeholder="Korisnicko ime" v-model="searchParameters.username" style="margin-left: 30px; height: 40px; width: 200px; "> </td>  

                    <td style="width: 70px;"> </td>
                    
                    <td> <button style=" margin-left: 70%;" class="btn btn-danger" type="button" v-on:click= "show" >Pronadji</button> </td>  

               
                    <td style="width: 200px;"> </td> 
                    <td><button class="btn btn-danger" type="button" v-on:click= "back" >Vrati se nazad</button>  </td>
               
                    </tr>
                </table> 


         

            <h4 style="margin-left:70px"><p> Korisnici koje odgovaraju kriterijumima pretrage: </p> </h4>

          <!--tabela-->
          <table class="table table-hover" style="width:95%">
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
     
          </tbody>


        </div>


    </form>
         
  


`,
methods:{
    back: function() {
        router.push(`/sumnjiviKorisnici`)
    },
    show: function() {
        axios.post("/WebShopREST/rest/user/searchUsers", {
            "name":''+ this.searchParameters.name, 
            "surname":''+ this.searchParameters.surname, 
            "username":''+ this.searchParameters.username})
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