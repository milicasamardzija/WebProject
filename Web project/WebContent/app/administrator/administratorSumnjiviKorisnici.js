Vue.component("administrator-usersSuspecious", {
    data:function(){
        return{
            allUsers: null
        }
    },    
template: `
<div class="containerInfo">

	    <div class="container">
        <button style=" margin-left: 38%;"class="btn btn-success" type="button" v-on:click="search">PRETRAGA</button>
        <button class="btn btn-success" type="button" v-on:click="filter">FILTRIRANJE</button>
        <button class="btn btn-success" type="button" v-on:click="sort">SORTIRANJE</button>

    </div>

<div>
    <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Ime</th>
            <th scope="col">Prezime</th>
            <th scope="col">Korisnicko ime</th>
            <th scope="col">Broj sakupljenih bodova</th>
            <th scope="col">Uloga</th>
            <th scope="col">Tip korisnika</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>moto</td>
            <td>5000</td>
            <td>kupac</td>
            <td>zlatni</td>
            <td><button type="button" class="btn btn-secondary">Blokiraj</button></td>
          </tr>
        </tbody>
      </table>
</div>
`,
    mounted() {
        axios.get("/WebShopREST/rest/user/getAllUsersSuspecious")
        .then( response => {
            this.allUsers = response.data
        })
        .catch(function(error){
            console.log(error)
        })
    },
    methods : {
		search() {
		router.push(`/sumnjiviPretraga`)
	},
		filter() {
		router.push(`/sumnjiviFilter`)
	},
		sort() {
		router.push(`/sumnjiviSort`)
	}
	}
});