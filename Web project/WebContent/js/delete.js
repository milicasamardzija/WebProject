var app = new Vue({
    el: '#brisanje',
    data:{
        user: {} 
    },
    methods: {
        delete: function(event){
            event.preventDefault()
            axios.delete('/WebShopREST/rest/user/deleteUser', this.user.username)
            .then(response => {
                location.href=response.data 
            })
            .catch(function(error){
                console.log(error)
            })
        }
    }
})