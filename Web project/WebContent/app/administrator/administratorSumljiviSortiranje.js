Vue.component("administratorSumnjivi-sortiranje", {  
    data:function(){
        return{
        allUsers : [],
        searchParameters : {}
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
                            <button class="dropdown-item" type="button">Imenu rastuce</button>
                            <button class="dropdown-item" type="button">Imenu opadajuce</button>
                            <button class="dropdown-item" type="button">Prezimenu rastuce</button>
                            <button class="dropdown-item" type="button">Prezimenu opadajuce</button>
                            <button class="dropdown-item" type="button">Korisnickom imenu rastuce</button>
                            <button class="dropdown-item" type="button">Korisnickom imenu opadajuce</button>

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
             
          </tbody>


        </div>


    </form>
         
  


`,
methods:{
    back: function() {
        router.push(`/sumnjiviKorisnici`)
    },
    show: function() {
      
    }
},
mounted(){

},
});