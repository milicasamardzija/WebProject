Vue.component("administrator-comments", {
    data:function(){
        return{
            allComments: null
        }
    },    
template: `
    <div class="containerInfo">
        <div class="media">
            <div class="media-left media-top">
            <img src="../pictures/korisnik.png" class="media-object" style="width:60px">
            </div>
            <div class="media-body">
            <h4 class="media-heading">Ciao</h4>
            <p style="font-weight: 300; font-style: italic;">pera123</p>
            <p>Sve je bilo super</p>
            <p>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            </p>
            </div>
        </div>
        <hr>
    </div>   
`,
    mounted() {
        axios.get("/WebShopREST/rest/comments/getAllComments")
        .then( response => {
            this.allComments = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    methods : {
		
	}
});