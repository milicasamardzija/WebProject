Vue.component("pretraga-restaurants", {
    data: {
        
    },   
  template: `
  <!-- PRIKAZ PRETRAGE-->
  <div class="col-lg-2 col-md-4 col-sm-12">
      <div class="row">
          <!-- ovo su polja za pretragu-->
         <div class="col-lg-2 col-md-2 col-sm-12 p-0 search">
              <input type="text" class="form-control search-slt" placeholder="Naziv">
          </div>
           <div class="col-lg-2 col-md-3 col-sm-12 p-0 search" >
              <input type="text" class="form-control search-slt" placeholder="Lokacija">
          </div>
          <!-- ovo su polja za filtriranje-->
          <div class="dropdown col-lg-1 col-md-3 col-sm-12 p-0 filt">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
                  Tip
              </button>
              <span class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item" type="button">Action</button>
              <button class="dropdown-item" type="button">Another action</button>
              <button class="dropdown-item" type="button">Something else here</button>
              </span>
          </div>
           <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
              <button class="btn btn-secondary dropdown-toggle filters" type="button" data-toggle="dropdown">
              Ocena
              </button>
          <div class="dropdown-menu">
              <button class="dropdown-item" type="button">Action</button>
              <button class="dropdown-item" type="button">Another action</button>
              <button class="dropdown-item" type="button">Something else here</button>
          </div>
          </div>
          <div class="dropdown col-lg-2 col-md-3 col-sm-12 p-0 filt">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" >
              Otvoreni
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item" type="button">Action</button>
              <button class="dropdown-item" type="button">Another action</button>
              <button class="dropdown-item" type="button">Something else here</button>
              </div>
         </div>
          <!-- dugme za pretragu-->
          <div class="col-lg-1 col-md-3 col-sm-12 btn-search">
              <button type="button" class="btn btn-danger wrn-btn btn-search">Search</button>
          </div>
      </div>
  </div>
  `,
    methods: {
     
  }
  });