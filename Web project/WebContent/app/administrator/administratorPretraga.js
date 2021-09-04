Vue.component("administrator-pretraga", {
   
    data: {
        
    },
template: `
<section> 
            
<div >
       
    <form action="#" >
        <div class="containerInfo" > 
           

        
                <table class="tableSearch" style="margin-top: 30px;">
                    <tr> 
                    <td> </td>
                    <td><input input  type="text" placeholder="Ime" style="margin-left: 60px; height: 40px; width: 200px;" >  </td>
                    
                    <td style="width: 70px;"> </td>

                    <td>  <input input type="text" placeholder="Prezime" style="margin-left: 60px; height: 40px; width: 200px;"></td>  
                    <td style="width: 70px;"> </td>
                   
                
                    <td > <input  type="text" placeholder="Korisnicko ime" style="margin-left: 60px; height: 40px; width: 200px; "> </td>  

                    <td style="width: 70px;"> </td>
                    
                    <td> <button style=" margin-left: 70%;" class="btn btn-danger" type="button" v-on:click= "show" >Pronadji</button> </td>  

               
                    <td style="width: 200px;"> </td> 
                    <td><button class="btn btn-danger" type="button" v-on:click= "back" >Vrati se nazad</button>  </td>
               
                    </tr>
                </table> 


         

            <h4>
            <p> Korisnici koje odgovaraju kriterijumima pretrage: </p> </h4>

        

        </div>

</div>
           
</section>
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