Vue.component("administrator-changeRestaurant", {
    data:function(){
        return{
            
        }
    },    
  template: `
 
  `,
  methods : {
    changeUser: function(event){
      event.preventDefault()
      axios.post("/WebShopREST/rest/user/changeUser", {
      "username":''+ this.user.username,
      "name":''+ this.newUser.name, 
      "surname":''+ this.newUser.surname,  
      "street":''+ this.newUser.address.street, 
      "number":''+ this.newUser.address.number, 
      "city":''+ this.newUser.address.city, 
      "zipCode":''+ this.newUser.address.zipCode})
      .then(
        response => {
          router.push(`/korisnici`);
        } 
      )
      .catch(function(error){
        console.log(error)
    })
    },
    otkazi: function(event){
      event.preventDefault()
      router.push(`/`);
    }
  },
  mounted() {
      this.user = this.$route.query.username,
      axios.post("/WebShopREST/rest/user/getUser", {"username":''+this.user.username})
      .then( response => {
          this.newUser = response.data
      })
      .catch(function(error){
          console.log(error)
      })
  }
});