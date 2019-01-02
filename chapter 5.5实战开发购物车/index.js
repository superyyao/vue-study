var app = new Vue({
  el: '#app',
  data:{
    list:[
      {
        name: 'iphone 7',
        price: 6188,
        num: 1,
        isCheck:true
      },
      {
        name: 'iphone pro',
        price: 5888,
        num: 1,
        isCheck:true
      },
      {
        name: 'mic book',
        price: 21488,
        num: 1,
        isCheck:true
      },
    ]
  },
  methods: {
    remove : function(index){
      this.list.splice(index,1);
    },
    reduce: function(index){
      if(this.list[index].num === 1){
        return;
      }
      this.list[index].num--;
    },
    add: function (index){
     this.list[index].num++;
    },
    select: function (index){
      this.list[index].isCheck = this.list[index].isCheck ? false : true;
    },
    selectAll: function (event){
      if(event.target.checked){
        for(var i =0; i < this.list.length; i++){
          this.list[i].isCheck = true;
        }
      }else{
        for(var i =0; i < this.list.length; i++){
          this.list[i].isCheck = false;
        }
      }
    }
  },
  computed: {
    totalPrice: function () {
      var total = 0;
      for(var i =0; i < this.list.length; i++){
        if(this.list[i].isCheck){
          total+=this.list[i].price * this.list[i].num;
        }
      }
      return total;
    },
    checkAllIsCheck: function () {
      for(var i =0; i < this.list.length; i++){
        if(!this.list[i].isCheck){
          return false;
        }
      }
      return true
    }
  }
})
