Vue.component("administrator-profile", {
    data:function(){
        return{
            user:{}
        }
    },    
template: `
    <div class="containerInfo">
    <div class="row content">
    <div class="col-sm-3 sidenav" style="margin-left: 8%;">
        <h3 style="width: 200px;"><small>Vase informacije na profilu:</small> <hr> </h3>
        <img class= "img-responsive"src="../pictures/korisnik.png">
    </div> 
    <div class="col-sm-9">
        <div class="informations">
            <h4 style="margin-top: 90px">Ime: {{user.name}}</h4> 
            <h4> Prezime: {{user.surname}}</h4>
            <h4>Korisnicko ime: {{user.username}}</h4>
            <h4>Pol: {{user.gender}}</h4>
            <h4> Datum rodjenja:  {{user.birthday | dateFormat('DD.MM.YYYY.')}} </h4> 
            <h4>Adresa: {{user.address.street}}  {{user.address.number}}  {{user.address.city}}  {{user.address.zipCode}}</h4>
            <button type="button" class="btn btn-success" v-on:click= "editProfile" >Izmeni podatke</button>
        </div>
    </div>
    </div>
`,
    methods : {
		editProfile() {
            router.push(`/izmeniProfil`)
        }
	},
    mounted(){
        axios.get("/WebShopREST/rest/profile/profileUser")
        .then( response => {
            this.user = response.data 
        })
        .catch(function(error){
            console.log(error)
        })
    },
    filters: {
        dateFormat: function(value, format){
            var parsed = moment(value);
            return parsed.format(format)
        }
    }
});