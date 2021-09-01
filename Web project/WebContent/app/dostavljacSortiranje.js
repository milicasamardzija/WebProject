Vue.component("sortiranje-dostavljac", {
   
    data: {
        
    },
template: `
<section> 
            
<div class="containerInfo" >
       
    <form action="#" >
   
    <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" style="margin-left:38%; margin-top:20px;margin-bottom:20px;" >
   SORTIRANJE
    </button>
   
    <span class="dropdown-menu" aria-labelledby="dropdownMenu2" >
    <button class="dropdown-item" type="button">Naziv restorana rastuce</button>
    <button class="dropdown-item" type="button">Naziv restorana opadajuce</button>
    <button class="dropdown-item" type="button">Datum rastuce</button>
    <button class="dropdown-item" type="button">Datum opadajuce</button>
    <button class="dropdown-item" type="button">Ceni rastuce</button>
    <button class="dropdown-item" type="button">Ceni opadajuce</button>

    </span>

    <button style="margin-left: 90%;" class="btn btn-danger" type="button" v-on:click= "back">Vrati se nazad</button>
</form>
<h4 style="font-weight: bold;">
            <p> PORUDZBINE KOJE ODGOVARAJU IZABRANOM KRITERIJUMU SORTIRANJA: </p> </h4>


</div>
           
</section>
`,
methods:{
    back: function() {
        router.push(`/cekajuDostavljaca`)
    }
   
},
mounted(){

},
});