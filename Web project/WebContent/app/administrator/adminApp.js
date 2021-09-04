const RestaurantsAdminComponent = {template: '<administrator-restaurants></administrator-restaurants>'}
const UsersAdminComponent = {template: '<administrator-users></administrator-users>'}
const AddUserAdminComponent = {template: '<administrator-addUser></administrator-addUser>'}
const ChangeUserAdminComponent = {template: '<administrator-changeUser></administrator-changeUser>'}
const UsersSuspeciousAdminComponent = {template: '<administrator-usersSuspecious></administrator-usersSuspecious>'}
const CommentsAdminComponent = {template: '<administrator-comments></administrator-comments>'}
const ProfileAdminComponent = {template: '<administrator-profile></administrator-profile>'}
const PretragaAdminComponent = {template: '<administrator-pretraga></administrator-pretraga>'}
const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: RestaurantsAdminComponent}, //restorani
        {path : '/korisnici', component: UsersAdminComponent}, //korisnici
        {path : '/dodajKorisnika', component: AddUserAdminComponent}, //dodavanje korisnika
        {path : '/izmeniKorisnika', component: ChangeUserAdminComponent}, //izmena korisnika
        {path : '/sumnjivikorisnici', component:UsersSuspeciousAdminComponent}, //sumnjivi korisnici
        {path : '/komentari', component:CommentsAdminComponent}, //komentari
        {path : '/profil', component:ProfileAdminComponent}, //profil
        {path : '/pretraga', component:PretragaAdminComponent}, //pretraga korisnika
    ]
})

var adminApp = new Vue({
    router,
    el: '#administratorID'
});