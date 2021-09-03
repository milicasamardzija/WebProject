Vue.component("administrator-addUser", {
    data:function(){
        return{
            newUser:{}
        }
    },    
template: `
<div class="containerInfo t"> 
  <div class="information">
    <form>
      <table class="t">
        <tr>
          <td class="labela">Ime:</td>
          <td><input class="form-control" type="text" placeholder="Ime"></td>
        </tr>
        <tr>
            <td class="labela">Prezime:</td>
            <td><input class="form-control" type="text" placeholder="Prezime"></td>
        </tr>
        <tr>
            <td class="labela">Pol:</td>
            <td><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                <label class="form-check-label" for="exampleRadios1">
                  Muski
                </label>
            </td>
            <td><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
                <label class="form-check-label" for="exampleRadios1">
                  Zenski
                </label>
            </td>
        </tr>
        <tr>
            <td class="labela">Datum rodjenja:</td>
            <td><div class="form-group"> <!-- Date input -->
                <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text"/>
              </div></td>
        </tr>
        <tr>
          <td class="labela">Adresa:</td>
          <td><input class="form-control" type="text" placeholder="Adresa"></td>
          <td class="buttonMap"><button type="button" class="btn btn-success"><i></i>Choose on map</button></td>
        </tr>
        <tr>
          <td class="labela">Broj:</td>
          <td><input class="form-control" type="text" placeholder="Broj"></td>
        </tr>
        <tr>
          <td class="labela">Grad:</td>
          <td><input class="form-control" type="text" placeholder="Grad"></td>
        </tr>
        <tr>
          <td class="labela">Postanski broj:</td>
          <td><input class="form-control" type="text" placeholder="Postanski broj"></td>
        </tr>
        <tr>
          <td class="buttonForm"><button type="button" class="btn btn-success">Sacuvaj</button></td>
          <td class="buttonForm"><button type="button" class="btn btn-success">Otkazi</button></td>
        </tr>
      </table>
    </form>
  </div>
</div>
`,
    methods : {
		
	}
});