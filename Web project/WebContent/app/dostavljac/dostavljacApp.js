const ProfilComponent = {template: '<profil-dostavljac></profil-dostavljac>'}
const IzmeniProfilComponent = {template: '<izmeniProfil-dostavljac></izmeniProfil-dostavljac>'}
const PrikaziNedostavljeneComponent = {template: '<nedostavljenePorudzbine-dostavljac></nedostavljenePorudzbine-dostavljac>'}
const CekajuDostavljacaComponent = {template: '<cekaju-dostavljaca></cekaju-dostavljaca>'}
const MojePorudzbineComponent = {template: '<porudzbine-dostavljac></porudzbine-dostavljac>'}


const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/profilDostavljac', component: ProfilComponent}, //profil
        {path : '/izmeniProfilDostavljac', component: IzmeniProfilComponent}, //izmena profila
        {path : '/nedostavljenePorudzbine', component: PrikaziNedostavljeneComponent},//prikaz svih restorana
        {path : '/cekajuDostavljaca', component: CekajuDostavljacaComponent}, //moja korpa 
        {path : '/', component: MojePorudzbineComponent},//prethodne porudzbine
 

    ]
})

var dostavljacApp = new Vue({
    router,
    el: '#dostavljac'
});

