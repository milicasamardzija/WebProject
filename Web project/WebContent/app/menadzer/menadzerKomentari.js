Vue.component("menadzer-comments", {
    data:function(){
        return{
            allComments: null
        }
    },    
template: `
    <div class="containerInfo">
    <div style="height: 3em;"> </div> 

        <div class="media" v-for="comment in allComments" style=" margin-left: 12%">
        <table> 
        <tr>
           <td> <div class="media-left media-top">
            <img src="../pictures/korisnik.png" class="media-object" style="width:80px; height: 80px; margin-right: 2em;">
            </div>
            <div class="media-body" style="width: 20%; margin-left: 3em;">
            
            <p style="font-weight: 300; font-style: italic; font-weight: bold; width: 800px;">{{comment.username}}</p>
            <p>{{comment.text}}</p>
                <span v-for="g in comment.grade">
                <span class="fa fa-star checked"></span>
                </span>
            </div>
            <hr/>
           
          
        </td> 
        <td>  <button style="margin-left: -30%; width: 100px;" type="button" class="btn btn-secondary" v-if="!comment.approved" v-on:click="changeStatus(comment.id)" >Odobri</button> </td> 
         </div>
        </tr> 
        </table> 
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