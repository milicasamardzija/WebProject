Vue.component("filtriranje-dostavljac", {
   
    data: {
        
    },
template: `
<section> 
            
<div >
       
    <form action="#" >
        <div class="containerInfo" > 

            <table style= " margin-left:10px;">
                <tr> 

                    <td>  </td> 
                    <td style= "font-size: 16px; margin-left:10px;"> Filtrirajte po tipu restorana:  </td> 
                    <td> <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style= "margin-left:10%;" >
                            Tip restorana
                            </button>
            
                            <span class="dropdown-menu" aria-labelledby="dropdownMenu2" >
                            <button class="dropdown-item" type="button">Naziv restorana rastuce</button>
                            <button class="dropdown-item" type="button">Naziv restorana opadajuce</button>
                            <button class="dropdown-item" type="button">Datum rastuce</button>
                            <button class="dropdown-item" type="button">Datum opadajuce</button>
                            <button class="dropdown-item" type="button">Ceni rastuce</button>
                            <button class="dropdown-item" type="button">Ceni opadajuce</button>
                        
                            </span>
                        </td> 


                        <td>  </td> 
                        <td>  </td> 
                        <td>  </td> 
                        <td  style= "font-size: 16px; padding-left:20px;"> ili filtrirajte po statusu porudzbine:  </td> 
                        <td> <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style="margin-left:20%; margin-top:20px;margin-bottom:20px;" >
                            Status porudzbine
                            </button>
            
                            <span class="dropdown-menu" aria-labelledby="dropdownMenu2" >
                            <button class="dropdown-item" type="button">Naziv restorana rastuce</button>
                            <button class="dropdown-item" type="button">Naziv restorana opadajuce</button>
                            <button class="dropdown-item" type="button">Datum rastuce</button>
                            <button class="dropdown-item" type="button">Datum opadajuce</button>
                            <button class="dropdown-item" type="button">Ceni rastuce</button>
                            <button class="dropdown-item" type="button">Ceni opadajuce</button>
                        
                            </span>
                        </td>
                    
                      
                </tr>

            </table> 
       
         <button style="margin-left: 90%;" class="btn btn-danger" type="button" v-on:click= "back">Vrati se nazad</button>  

            <h4>
            <p> Porudzbine koje odgovaraju zadatom kriterijumu filtriranja: </p> </h4>

        </div>

</div>
           
</section>
`,
methods:{
    back: function() {
        router.push(`/cekajuDostavljaca`)
    },
    show: function() {
        
    }
   
},
mounted(){

},
});