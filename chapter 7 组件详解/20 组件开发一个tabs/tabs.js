// 标签页外层组件tabs
Vue.component('tabs', {
    // <!-- 标签页标题，用 v-for -->\
    template: '\
    <div class="tabs">\
        <div class="tabs-tar">\
            <div :class="tabCls(item)" v-for="(item, index) in navList" \
              @click="handleChange(index)">\
              {{ item.label }}\
              </div>\
        </div>\
        <div class="tabs-content">\
            <slot></slot>\
        </div>\
        </div>',
    props: {
        value: {
            type: [String,Number]
        }
    }, 
    data: function () {
        return {
            //因为不能修改value，所以copy 一份自己维护
            currentValue: this.value,
            //用于渲染 tabs 标题
            navList: []
        }
    },
    methods: {
        tabCls (item) {
            return [
                'tabs-tab',{
                    'tabs-tab-active':item.name === this.currentValue
                }
            ]
        },
        // 点击tab 标题时触发
        handleChange: function (index) {
            var nav = this.navList[index];
            var name = nav.name;
            this.currentValue = name;
            // 更新value
            this.$emit('input',name);
            // 触发一个自定义事件，供父级使用
            this.$emit('on-click',name);
        },
        getTabs () {
            // 遍历子组件 得到所有pane组件
            return this.$children.filter(function (item) {
                return item.$options.name === 'pane';
            })
        },
        updateNav () {
            this.navList = [];
            var _this = this;
            this.getTabs().forEach( (pane, index) => {
                _this.navList.push({
                    label: pane.label,
                    name: pane.name || index,
                    closable:pane.closable
                });
                // 如果没有给pane设置name， 默认设置它的索引
                if(!pane.name) pane.name = index;
                // 设置当前选中的tab的索引
                if(index === 0) {
                    if(!_this.currentValue){
                        _this = pane.name || index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus () {
            var tabs = this.getTabs();
            var _this = this;
            // 显示当前选中tab 对应的pane组件，隐藏没有选中的
            tabs.forEach(function (tab) {
              return tab.show = tab.name === _this.currentValue;
            });
        }
    },
    watch: {
        value: function (val) {
            this.currentValue = val;
        },
        currentValue: function () {
            //在当前选中的tab发生变化时，更新pane的显示状态
            this.updateStatus();
        }
    }
});