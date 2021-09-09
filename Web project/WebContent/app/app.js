
var appIndex = new Vue({
    el:'#restoraniPrikaz',
    data:{
        restaurants:[],
        selected:{},
        mode:true
    },
    methods:{
        getSelected: function(restaurant){
            this.selected= restaurant;
        },
        goToRestaurant : function () {
            this.mode = false,
            router.push({path: `/pocetna`, query:{ id: this.selected.id}})
        }
    },
    mounted(){
        axios.get("/WebShopREST/rest/restaurant/getAllRestaurants")
          .then( response => {
              this.restaurants = response.data
          })
          .catch(function(error){
              console.log(error)
          })
    }
})