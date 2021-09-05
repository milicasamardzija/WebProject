Vue.component("administrator-filtriranje", {  
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
                    <td style= "font-size: 16px; margin-left:10px;"> Filtrirajte registrovane korisnike po odgovarajucoj ulozi:  </td> 
                    <td> <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style= "margin-left:10%;" >
                            Uloga korisnika
                            </button>
            
                            <span class="dropdown-menu" aria-labelledby="dropdownMenu2" >
                            <button class="dropdown-item" type="button">KUPAC</button>
                            <button class="dropdown-item" type="button">MENADZER</button>
                            <button class="dropdown-item" type="button">DOSTAVLJAC</button>

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
                            <button class="dropdown-item" type="button">ZLATNI</button>
                            <button class="dropdown-item" type="button">SREBRNI</button>
                            <button class="dropdown-item" type="button">BRONZANI</button>
                          </span>
                        </td>
                    
                      
                </tr>

            </table> 
       
         <button style="margin-left: 90%;" class="btn btn-danger" type="button" v-on:click= "back">Vrati se nazad</button> 
        
         

            <h4 style="margin-left: 60px"><p> Korisnici koje odgovaraju kriterijumima filtriranja: </p> </h4>

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
        router.push(`/korisnici`)
    },
    show: function() {
      
    }
},
mounted(){

},
});