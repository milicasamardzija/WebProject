//ovo je js fajl u kome ce se implementirati metode da se na klik menija menja prikaz
var app = new Vue({
    el:'#admin',
    data:{

    },
    mounted(){
        
    },
    methods:{
        addUsers : function() {
    		router.push(`/korisnici`);
    	},
        addRestaurants : function() {
    		router.push(`/`);
    	}
    }
})