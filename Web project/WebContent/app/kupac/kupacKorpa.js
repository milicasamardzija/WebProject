Vue.component("korpa-kupac", {
    data(){
        return{
            proizvodi:null
        }
    },
template: `
<section> 
    <div class="container" style=" margin-top: 20px; margin-left: 20px; margin-right: 10px;">
            
                <h3 style=" margin-left: 60px;"> <small> Trenutno stanje Vase korpe: </small> <hr></h3> 
            <!--tabela-->
            <div>
                <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Logo</th>
                        <th scope="col">Artikal</th>
                        <th scope="col">Cena</th>
                        <th scope="col">Kolicina</th>
                        <th scope="col">Povecaj kolicinu</th>
                        <th scope="col">Smanji kolicinu</th>
                        <th scope="col"> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr >
                        <td>LOGO</td>
                        <td>IME</td>
                        <td>CENA</td>
                        <td>KOLICINA</td>
                        <td><button type="button" class="btn btn-success"> <span class="glyphicon glyphicon-plus"></span></button> </td>
                        <td><button type="button" class="btn btn-danger"> <span class="glyphicon glyphicon-minus"></span></button></td>
                        <div>
                         
                          <td><button type="button" class="btn btn-secondary">Izbrisi</button></td>
                        </div>
                      </tr>
                    </tbody>
                  </table>
                  <br/>
                  <button type="button" class="btn btn-success " style="margin-left:1050px; position: relative;"> PORUCI </button >
            </div>     
                    
            </div>
     </div>
</section>
`,
methods:{
    editProfile: function() {
        router.push(`/izmeniProfil`)
    }
},
mounted(){

},
});