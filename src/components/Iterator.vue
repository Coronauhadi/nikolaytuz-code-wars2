<template>
  <div class="iter">

  </div>
</template>

<script>
export default {
  name: 'Iterator',
  props: {
     Step: Number,
     List1: String,
     List2: String,
     Api: Function,
  },
  methods: {
    prepareList: function(){
      this.MyList = this.List1.split('\n').replace(' ','')
      this.ExternalList = this.List2.split('\n').replace(' ','')
    },
    getter: function(){
      return this.Ret()
    },

    getlog: function(){
       console.log(this.List1)
    },
  },
  data: ()=>{
    return {
		MyList: [],
		ExternalList: [],
    }
  },
  watch: {
    Step: function(val){
      val
<<<<<<< HEAD
      this.Api('aim()',2)
=======
<<<<<<< HEAD
      // this.Api('rotate(1)')
      this.Api('makestep()')
=======
      this.Api('aim()',2)
>>>>>>> 1fce2772282d41862fd3e85ed013d1f5b42fedcb
>>>>>>> 705b120fa2ed8a0dac749ac31ee6b7a15bb7388a
      // console.log(val)
    }
  },
}
</script>

<style scoped>

</style>
