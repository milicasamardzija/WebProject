const RestaurantsAdminComponent = {template: '<administrator-restaurants></administrator-restaurants>'}
const UsersAdminComponent = {template: '<administrator-users></administrator-users>'}
const AddUserAdminComponent = {template: '<administrator-addUser></administrator-addUser>'}
const ChangeUserAdminComponent = {template: '<administrator-changeUser></administrator-changeUser>'}
const UsersSuspeciousAdminComponent = {template: '<administrator-usersSuspecious></administrator-usersSuspecious>'}
const CommentsAdminComponent = {template: '<administrator-comments></administrator-comments>'}
const ProfileAdminComponent = {template: '<administrator-profile></administrator-profile>'}
const PretragaAdminComponent = {template: '<administrator-pretraga></administrator-pretraga>'}
const FiltriranjeAdminComponent = {template: '<administrator-filtriranje></administrator-filtriranje>'}
const SortiranjeAdminComponent = {template: '<administrator-sortiranje></administrator-sortiranje>'}
const SortiranjeAdminSumnjiviComponent = {template: '<administratorSumnjivi-sortiranje></administratorSumnjivi-sortiranje>'}
const FiltriranjeAdminSumnjiviComponent = {template: '<administratorSumnjivi-filtriranje></administratorSumnjivi-filtriranje>'}
const PretragaAdminSumnjiviComponent = {template: '<administratorSumnjivi-pretraga></administratorSumnjivi-pretraga>'}
const ChangeRestaurantAdminComponent = {template: '<administrator-changeRestaurant></administrator-changeRestaurant>'}
const AddRestaurantAdminComponent = {template: '<administrator-addRestaurant></administrator-addRestaurant>'}
const AddManagerAdminComponent = {template: '<administrator-addManager></administrator-addManager>'}
const AddRestaurantWithManagerAdminComponent = {template: '<administrator-addRestaurantWithManager></administrator-addRestaurantWithManager>'}

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
        {path : '/filtriranje', component:FiltriranjeAdminComponent}, //filtriranje korisnika
        {path : '/sortiranje', component:SortiranjeAdminComponent}, //sortiranje korisnika
        {path : '/sumnjiviPretraga', component:PretragaAdminSumnjiviComponent},
        {path : '/sumnjiviSort', component:SortiranjeAdminSumnjiviComponent},
        {path : '/sumnjiviFilter', component:FiltriranjeAdminSumnjiviComponent}, 
        {path : '/izmeniRestoran', component: ChangeRestaurantAdminComponent}, //izmena restorana
        {path : '/dodajRestoran', component: AddRestaurantAdminComponent}, //dodaj restoran
        {path : '/dodajMenadzera', component: AddManagerAdminComponent}, //dodaj menadzera
        {path : '/dodajRestoranSaMenadzerom', component: AddRestaurantWithManagerAdminComponent}, //dodaj restoran sa menadzerom
    ]
})

var adminApp = new Vue({
    router,
    el: '#administratorID'
});