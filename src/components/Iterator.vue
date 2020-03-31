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
      this.Api('makestep()')
      // console.log(val)
    }
  },
}
</script>

<style scoped>

</style>
