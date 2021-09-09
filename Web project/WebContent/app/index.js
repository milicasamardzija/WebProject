const IndexComponent = {template: '<index-rest></index-rest>'}

const router = new VueRouter({
    mode: 'hash',
    routes:[
        {path : '/', component: IndexComponent}, //index
    ]
})

var index = new Vue({
    router,
    el: '#IDInd'
});