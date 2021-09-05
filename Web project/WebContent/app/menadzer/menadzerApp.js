const ProfilComponent = {template: '<profil-menadzer></profil-menadzer>'}
const IzmeniProfilComponent = {template: '<izmeniProfil-menadzer></izmeniProfil-menadzer>'}
const RestoranComponent = {template: '<restoran-menadzer></restoran-menadzer>'}
const DodajArtikalComponent = {template: '<dodajArtikal-menadzer></dodajArtikal-menadzer>'}


const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/profilMenadzer', component: ProfilComponent}, //profil
        {path : '/izmeniProfilMenadzer', component: IzmeniProfilComponent}, //izmena profila
        {path : '/restoranMenadzer', component: RestoranComponent},
        {path : '/dodajArtikal', component: DodajArtikalComponent},
    ]
})

var menadzerApp = new Vue({ 
    router,
    el: '#menadzer'
});