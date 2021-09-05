Vue.component("cekaju-dostavljaca", {
   
    data: {
        
    },
template: `
<section> 
            
<div class="containerInfo">
       
    <button style=" margin-left: 38%;"class="btn btn-success" type="button" v-on:click="search">PRETRAGA</button>
    <button class="btn btn-success" type="button" v-on:click="filter">FILTRIRANJE</button>
    <button class="btn btn-success" type="button" v-on:click="sorth">SORTIRANJE</button>

</div>
           
</section>
`,
methods:{
    search: function(){
    router.push(`/dostavljacPretraga`);
    },
    filter: function(){
    router.push(`/dostavljacFiltriranje`);
    },
    sorth: function(){
        router.push(`/dostavljacSortiranje`);
    }
  
   
},
mounted(){

}
});