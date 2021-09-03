Vue.component("administrator-profile", {
    data:function(){
        return{
            user:{}
        }
    },    
template: `
    <div class="containerInfo">
    <div class="row content">
    <div class="col-sm-3 sidenav">
        <h3><small>Vase informacije na profilu:</small> <hr> </h3>
        <img class= "img-responsive"src="../pictures/korisnik.png">
    </div> 
    <div class="col-sm-9">
        <div class="informations">
            <h4>Ime: {{user.name}}</h4> 
            <h4> Prezime: {{user.surname}}</h4>
            <h4>Korisnicko ime: </h4>
            <h4>Pol: </h4>
            <h4>Datum rodjenja: </h4>
            <h4>Adresa: </h4>
            <h4>Broj telefona: </h4>
            <button type="button" class="btn btn-success">Izmeni podatke</button>
        </div>
    </div>
    </div>
`,
    methods : {
		
	},
    mounted(){
        axios.get("/WebShopREST/rest/profile/profileUser")
        .then( response => {
            this.user = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    }
});