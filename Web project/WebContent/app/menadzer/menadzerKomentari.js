Vue.component("menadzer-comments", {
    data:function(){
        return{
            allComments: null
        }
    },    
template: `
    <div class="containerInfo">
        <div class="media" v-for="comment in allComments">
            <div class="media-left media-top">
            <img src="../pictures/korisnik.png" class="media-object" style="width:60px">
            </div>
            <div class="media-body">
            <p style="font-weight: 300; font-style: italic;">{{comment.username}}</p>
            <p>{{comment.text}}</p>
                <span v-for="g in comment.grade">
                <span class="fa fa-star checked"></span>
                </span>
            </div>
            <button type="button" class="btn btn-secondary" v-if="!comment.approved" v-on:click="changeStatus(comment.id)" >Odbori</button>
        </div>
        <hr>
    </div>   
`,
    mounted() {
        axios.get("/WebShopREST/rest/comments/getAllCommentsManager")
        .then( response => {
            this.allComments = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    methods : {
		changeStatus(id){
            axios.post("/WebShopREST/rest/comments/approveComment", id)
            .then( response => {
                this.allComments = response.data
            })
            .catch(function(error){
                console.log(error)
            })  
        }
	}
});