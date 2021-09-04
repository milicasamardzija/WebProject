const PretragaComponent = {template: '<pretraga-restaurants></pretraga-restaurants>'}
const FiltriranjeComponent = {template: '<filtriranje-restaurants></filtriranje-restaurants>'}
const SortiranjeComponent = {template: '<sortiranje-restaurants></sortiranje-restaurants>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/filtriranje', component:  FiltriranjeComponent},
        {path : '/sortiranje', component: SortiranjeComponent}, 
        {path : '/pretraga', component: PretragaComponent}, 
       
    ]
})

var pocetnaApp = new Vue({
    router,
    el: '#pocetna'
});