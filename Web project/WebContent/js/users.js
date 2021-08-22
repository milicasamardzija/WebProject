var app = new Vue({
    el:'#users',
    data:{
        allUsers:[]
    },
    mounted(){
        axios.get("/WebShopREST/rest/user/getAllUsers")
        .then(response => {
            this.allUsers = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    methods:{
        
    }
})