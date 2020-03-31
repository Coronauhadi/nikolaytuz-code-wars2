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
      this.MyList = this.List1!=undefined? this.List1.split('\n') : {}
      this.ExternalList = this.List2!=undefined? this.List2.split('\n') : {}
    },
    getter: function(){
      return this.Ret()
    },
    sleep: function(ms) {
      ms += new Date().getTime();
      while (new Date() < ms){''}
    },
  },
  data: ()=>{
    return {
		MyList: [],
		ExternalList: [],
    iter: 0,
    }
  },
  watch: {
    Step: function(){
      console.log(this.Step)
      if(this.Step==0) { this.prepareList(); this.iter = 0; }
      if(this.MyList == undefined && this.ExternalList == undefined)
        return
      if(this.MyList[this.iter]==undefined && this.ExternalList[this.iter]==undefined){
        // Step -> -1
      }
      this.Step%2==0? this.MyList[this.iter]!=undefined? this.Api(this.MyList[this.iter],1):{}
      : this.ExternalList[this.iter]!=undefined? this.Api(this.ExternalList[this.Step],2) :{}
      this.iter++
    },
  },
}
</script>

<style scoped>

</style>
