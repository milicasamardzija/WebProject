const RestaurantsAdminComponent = {template: '<administrator-restaurants></administrator-restaurants>'}
const UsersAdminComponent = {template: '<administrator-users></administrator-users>'}
const AddUserAdminComponent = {template: '<administrator-addUser></administrator-addUser>'}
const UsersSuspeciousAdminComponent = {template: '<administrator-usersSuspecious></administrator-usersSuspecious>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: RestaurantsAdminComponent}, //restorani
        {path : '/korisnici', component: UsersAdminComponent}, //korisnici
        {path : '/dodajKorisnika', component: AddUserAdminComponent}, //dodavanje korisnika
        {path : '/sumnjivikorisnici', component:UsersSuspeciousAdminComponent}, //sumnjivi korisnici
    ]
})

var adminApp = new Vue({
    router,
    el: '#administratorID'
});