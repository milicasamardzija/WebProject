Vue.component("pretraga-dostavljac", {
   
    data: {
        
    },
template: `
<section> 
            
<div >
       
    <form action="#" >
        <div class="containerInfo" > 
            <table class="contentTable"> 
                <tr>
                    <td  > <input type="text" placeholder="naziv restorana" > </td>
                    <td class="td"> Cena od: </td> 
                    <td class="td"> <input type="text" placeholder="pocetni iznos" ></td> 
                    <td class="td"> do: </td> 
                    <td class="td"> <input type="text" placeholder="krajnji iznos" ></td> 
                    <td class="td"> Datum od: </td>
                    <td class="td"> <input type="date" ></td> 
                    <td class="td"> do: </td> 
                    <td class="td"> <input type="date" ></td> 
                    <td> <button class="btn btn-danger" type="button" v-on:click= "show">Nadji</button> </td>

                </tr>
                <tr>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                    <td> <button class="btn btn-danger" type="button" v-on:click= "back">Vrati se nazad</button> </td>
                </tr>

                


            </table>

            <h3>
            <p> PORUDZBINE KOJE ODGOVARAJU PRETRAZI: </p> </h3>

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