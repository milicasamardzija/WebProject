const RestaurantsComponent = {template: '<restaurants></restaurants>'}
const PocetnaComponent = {template: '<administrator-pocetna></administrator-pocetna>'}
const RestaurantCommentsAdminComponentPocetna = {template: '<administrator-restaurantCommentsPocetna></administrator-restaurantCommentsPocetna>'}


const router = new VueRouter({

    mode: 'hash',
    routes:[
        {path : '/', component: RestaurantsComponent}, //restoran pocetna
        {path : '/restoran', component: PocetnaComponent}, //restoran artikli
        {path : '/prikaziKomentareRestoranaAdminPocetna', component: RestaurantCommentsAdminComponentPocetna}, //restoran komentari pocetna
    ]
})

var adminApp = new Vue({
    router,
    el: '#pocetnaID'
});