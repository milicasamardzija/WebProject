const ProfilKupacComponent = {template: '<profil-kupac></profil-kupac>'}
const IzmeniProfilComponent = {template: '<izmeniProfil-kupac></izmeniProfil-kupac>'}
const PrikaziRestoraneComponent = {template: '<restorani-kupac></restorani-kupac>'}
const KorpaComponent = {template: '<korpa-kupac></korpa-kupac>'}
const PorudzbineComponent = {template: '<porudbine-kupac></porudzbine-kupac>'}
const NedostavljeneComponent= {template: '<nedostavljene-kupac></nedostavljne-kupac>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/profil', component: ProfilKupacComponent}, //profil
        {path : '/izmeniProfil', component: IzmeniProfilComponent}, //izmena profila
        {path : '/restorani', component: PrikaziRestoraneComponent},//prikaz svih restorana
        {path : '/korpa', component: KorpaComponent}, //moja korpa 
        {path : '/porudzbine', component: PorudzbineComponent},//prethodne porudzbine
        {path : '/nedostavljene', component: NedostavljeneComponent}, //nedostavjnee porudzbine
    ]
})

var kupacApp = new Vue({
    router,
    el: '#kupacGlavniPrikaz'
});