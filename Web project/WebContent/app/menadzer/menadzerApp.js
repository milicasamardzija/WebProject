const ProfilComponent = {template: '<profil-menadzer></profil-menadzer>'}
const IzmeniProfilComponent = {template: '<izmeniProfil-menadzer></izmeniProfil-menadzer>'}
const RestoranComponent = {template: '<restoran-menadzer></restoran-menadzer>'}
const DodajArtikalComponent = {template: '<dodajArtikal-menadzer></dodajArtikal-menadzer>'}
const IzmeniArtikalComponent = {template: '<izmeniArtikal-menadzer></izmeniArtikal-menadzer>'}


const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: RestoranComponent},
        {path : '/profilMenadzer', component: ProfilComponent}, //profil
        {path : '/izmeniProfilMenadzer', component: IzmeniProfilComponent}, //izmena profila
        {path : '/dodajArtikal', component: DodajArtikalComponent},
        {path : '/izmeniArtikal', component: IzmeniArtikalComponent},
    ]
})

var menadzerApp = new Vue({ 
    router,
    el: '#menadzer'
});