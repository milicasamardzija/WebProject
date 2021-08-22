const RestaurantsAdminComponent = {template: '<administrator-restaurants></administrator-restaurants>'}
const UsersAdminComponent = {template: '<administrator-users></administrator-users>'}
const AddUserAdminComponent = {template: '<administrator-addUser></administrator-addUser>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: RestaurantsAdminComponent},
        {path : '/korisnici', component: UsersAdminComponent},
        {path : '/dodajKorisnika', component: AddUserAdminComponent},
    ]
})

var adminApp = new Vue({
    router,
    el: '#administratorID'
});