Vue.component("administrator-restaurantCommentsPocetna", {
    data(){
        return{
            comments:[],
            idRestaurant: null,
            restaurant: {}
        }
    },
    template: `
    <div class="containerInfo">

        <div class="row-restaurants">
            <div class = "col-with-picture">
                <div class="col-picture">
                    <div><img v-bind:src="'pictures/'+ restaurant.link" style="height:250px !important; width:300px !important"></div>
                </div>
            </div>
                <div class="col-info">
                    <h4 class="text" style="color: black;">Naziv: {{restaurant.name}}</h4>
                    <h4 class="text"style="color: black;" >Tip: {{restaurant.type}}</h4>
                    <h4 class="text" style="color: black;">Lokacija: {{restaurant.address.street}} {{restaurant.address.number}}, {{restaurant.address.city}} {{restaurant.address.zipCode}}</h4>
                    <h4 class="text" style="color: black;">Status: {{restaurant.status}}</h4>
                    <h4 class="text" style="color: black;">Prosecna ocena: {{restaurant.grade}}</h4>
                </div>
        </div>

        <h4 style="margin-left: 15px;  font-weight: bold; "> KOMENTARI:  </h4> 

        <div class="media" v-for="comment in comments">
            <div class="media-left media-top">
            <img src="pictures/korisnik.png" class="media-object" style="width:60px">
            </div>
            <div class="media-body">
                <h4 class="media-heading">{{comment.restaurantName}}</h4>
                <p style="font-weight: 300; font-style: italic;">{{comment.username}}</p>
                <p>{{comment.text}}</p>
                <span v-for="g in comment.grade">
                <span class="fa fa-star checked"></span>
                </span>
            </div>
        </div>

        <hr>
    
    </div>  
    `,
    methods:{
        showRestaurant: function() {
            this.$router.push({path: `/restoran`, query:{ id: thisidRestaurant}})
        }
    },
    mounted(){
            this.idRestaurant = this.$route.query.id,
            axios.post("/WebShopREST/rest/restaurant/getRestaurant", this.idRestaurant)
            .then( response => {
                this.restaurant = response.data
            })
            .catch(function(error){
                console.log(error)
            }),
            axios.post("/WebShopREST/rest/comments/getCommentsForRestaurant", this.idRestaurant)
            .then( response => {
                this.comments = response.data
            })
            .catch(function(error){
                console.log(error)
            })
    }
});