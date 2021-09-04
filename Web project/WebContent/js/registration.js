var app = new Vue({
    el: '#registracija',
    data:{
        user: {} 
    },
    methods: {
        registration: function(event){
            event.preventDefault()
            axios.post('/WebShopREST/rest/user/registration', {"name":''+ this.user.name,"surname":''+ this.user.surname,
             "gender":''+ this.user.gender,"birthday":''+ this.user.birthday,"street":''+ this.user.street,"number":''+ this.user.number,
             "city":''+ this.user.city,"zipCode":''+ this.user.zipCode,
             "username":''+ this.user.username, "password":''+this.user.password})
            .then(response => {
                location.href=response.data 
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
})