var app = new Vue({
    el: '#logovanje',
    data:{
        user:{}
    },
    methods: {
        login: function(event){
            event.preventDefautl()
            axios.post('/WebShopREST/rest/user/login', user)
            .then(response => {
                location.href=response.data 
            })
            .cath(function(error){
                console.log(error)
            })
        }
    }
})