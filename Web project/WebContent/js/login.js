var app = new Vue({
    el: '#logovanje',
    data:{
        user: {} 
    },
    methods: {
        login: function(event){
            event.preventDefault()
            axios.post('/WebShopREST/rest/user/login', {"username":''+ this.user.username, "password":''+this.user.password})
            .then(response => {
                location.href=response.data 
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
})