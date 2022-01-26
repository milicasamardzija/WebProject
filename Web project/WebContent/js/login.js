var app = new Vue({
    el: '#logovanje',
    data:{
        user: {},
        log : {"username":"", "password":""} 
    },
    methods: {
        login: function(event){
            event.preventDefault()
            axios.post('/WebShopREST/rest/user/login', {"username":''+ this.user.username, "password":''+this.user.password})
            .then(response => {
                this.log = this.user;
                localStorage.setItem("userLogged", this.log.username);
                console.log(localStorage.getItem("userLogged"));
                location.href=response.data;
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
})