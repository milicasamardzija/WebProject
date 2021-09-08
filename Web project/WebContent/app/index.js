const IndexComponent = {template: '<indexRest></indexRest>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: IndexComponent}, //index
    ]
})

var App = new Vue({
    router,
    el: '#IDInd'
});