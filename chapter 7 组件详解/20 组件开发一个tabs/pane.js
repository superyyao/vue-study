// 标签页嵌套的组件 pane
Vue.component('pane',{
    name: 'pane',
    props:{
        name:{
            type: String
        },
        label: {
            type: String,
            default: ''
        },
        closable:{
            type:String
        }
    },
    template:'\
        <div class="pane" v-show="show">\
        <button v-if="type === '1'">remove</button>\
            <slot></slot>\
        </div>\
    ',
    data(){
        return {
            show: true
        }
    },
    methods: {
        updateNav () {
            this.$parent.updateNav();
        }
    },
    watch: {
        label () {
            this.updateNav();
        }
    },
    //初始化时候调用一遍
    mounted () {
        this.updateNav();
    }
});