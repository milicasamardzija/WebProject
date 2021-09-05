var app = new Vue({
    el: '#odjava',

    methods: {
        logout: function(event){
            event.preventDefault()
            axios.get('/WebShopREST/rest/logout/userLogout')
            .then(response => {
                location.href=response.data 
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
})