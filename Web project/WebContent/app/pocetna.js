function checkType(type){
    this.restaurants=null,
    axios.post("/WebShopREST/rest/restaurant/filterType", type)
    .then( response => {
        this.allUsers = response.data
    })
    .catch(function(error){
        console.log(error)
    })
}
