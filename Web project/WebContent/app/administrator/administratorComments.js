Vue.component("administrator-comments", {
    data:function(){
        return{
            allComments: null
        }
    },    
template: `
    <div class="containerInfo">
    
     <div style="height: 3em;"> </div> 
        <div class="media" v-for="comment in allComments"  style=" margin-left: 12%">
             <table> 
        <tr>
           <td> 
            
            <div class="media-left media-top">
            <img src="../pictures/korisnik.png" class="media-object" style="width:100px; height: 95px; margin-right: 1.2em;">
            </div>
            <div class="media-body">
            <h4 class="media-heading">{{comment.restaurantName}}</h4>
            <p style="font-weight: 300; font-style: italic; font-weight:bold">{{comment.username}}</p>
            <p>{{comment.text}}</p>
            <span v-for="g in comment.grade">
                <span class="fa fa-star checked"></span>
                </span>
            </div>  <hr style="width:70%; "/>
        </div>
      
        
          </td> 
             </tr> 
        </table> 
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