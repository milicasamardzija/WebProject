//ovo je js fajl u kome ce se implementirati metode da se na klik menija menja prikaz
var app = new Vue({
    el:'#kupac',
    data:{

    },
    mounted(){
        
    },
    methods:{
        editProfile : function() {
    		router.push(`/izmeniProfil`);
    	}, 
        openProfile: function() {
            router.push('/profil');
        }
    }
})