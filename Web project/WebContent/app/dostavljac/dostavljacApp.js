const ProfilComponent = {template: '<profil-dostavljac></profil-dostavljac>'}
const IzmeniProfilComponent = {template: '<izmeniProfil-dostavljac></izmeniProfil-dostavljac>'}
const PrikaziNedostavljeneComponent = {template: '<nedostavljenePorudzbine-dostavljac></nedostavljenePorudzbine-dostavljac>'}
const CekajuDostavljacaComponent = {template: '<cekaju-dostavljaca></cekaju-dostavljaca>'}
const MojePorudzbineComponent = {template: '<porudzbine-dostavljac></porudzbine-dostavljac>'}
const PretragaComponent = {template: '<pretraga-dostavljac></pretraga-dostavljac>'}
const FiltriranjeComponent = {template: '<filtriranje-dostavljac></filtriranje-dostavljac>'}
const SortiranjeComponent = {template: '<sortiranje-dostavljac></sortiranje-dostavljac>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/profilDostavljac', component: ProfilComponent}, //profil
        {path : '/izmeniProfilDostavljac', component: IzmeniProfilComponent}, //izmena profila
        {path : '/nedostavljenePorudzbine', component: PrikaziNedostavljeneComponent},//prikaz svih restorana
        {path : '/cekajuDostavljaca', component: CekajuDostavljacaComponent}, //moja korpa 
        {path : '/porudzbineDostavljac', component: MojePorudzbineComponent},//prethodne porudzbine
        {path : '/dostavljacPretraga', component: PretragaComponent},
        {path : '/dostavljacFiltriranje', component: FiltriranjeComponent},
        {path : '/dostavljacSortiranje', component: SortiranjeComponent},

    ]
})

var dostavljacApp = new Vue({
    router,
    el: '#dostavljac'
});