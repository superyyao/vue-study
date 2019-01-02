Vue.component('input-number',{
    template:'\
        <div class="input-number">\
            <input type="type" :value="currentValue" @change="handleChange" @keyup.enter.up="handleKeyUp" @keyup.enter.down="handleKeyDown">\
            <button @click="handleDown" :disabled="currentValue <= min">- {{step}}</button>\
            <button @click="handleUp" :disabled="currentValue >= max">+ {{step}}</button>\
        </div>',
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default:0
        },
        step: {
            type: Number,
            default:0
        }
    },
    data(){
        return {
            currentValue: this.value
        }
    },
    watch:{
        currentValue: function (val) {
            this.$emit('input',val);
            this.$emit('on-change',val);
        },
        value: function (val) {
            this.updateValue(val);
        }
    },
    methods: {
        handleDown: function () {
            if (this.currentValue - this.step <= this.min) {
                this.currentValue = this.min
            } else {
                this.currentValue -= this.step;
            }
            
        },
        handleUp: function(){
            if (this.currentValue + this.step >= this.max) {
                this.currentValue = this.max
            } else {
                this.currentValue += this.step;
            }
        },
        handleChange: function (event) {      
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                }
            } else {
                event.target.value = this.currentValue;
            }
        },
        handleKeyUp: function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                } else if (val < min) {
                    this.currentValue = min;
                } else {
                    this.currentValue += this.step;
                }
            } else {
                event.target.value = this.currentValue;
            }

        },
        handleKeyDown: function (event) {
            var val = event.target.value.trim();
            var max = this.max;
            var min = this.min;

            if (isValueNumber(val)) {
                val = Number(val);
                this.currentValue = val;
                if (val > max) {
                    this.currentValue = max;
                }else if (val < min) {
                    this.currentValue = min;
                } else {
                    this.currentValue -= this.step;
                }
            } else {
                event.target.value = this.currentValue;
            }
        },
        updateValue: function (val) {
            if (val > this.max){
                val = this.max;
            }
            if(val < this.min){
                val = this.min
            }
            this.currentValue = val;
        }
    },    
    mounted: function (){
        this.updateValue(this.value);
    }
});


function isValueNumber(value){
    var reg = new RegExp(/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/);
    return reg.test(value + '');
}