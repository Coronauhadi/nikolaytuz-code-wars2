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
      console.log(this.MyList)
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
      if(this.Step==0) { this.prepareList(); this.iter = 0; }
      if(this.MyList == undefined && this.ExternalList == undefined)
        return
      //this is the real iterator, because we need to add only a half by 1 step because of 2 lists
      let intIter = Math.round(this.iter)
      if(this.MyList[intIter]==undefined && this.ExternalList[intIter]==undefined){
        this.Api('end',1)
      }
      console.log(intIter)
      this.Step%2==0? this.MyList[intIter]!=undefined? this.Api(this.MyList[intIter],1):{}
      : this.ExternalList[intIter]!=undefined? this.Api(this.ExternalList[this.intIter],2) :{}
      this.iter += 0.499
    },
  },
}
</script>

<style scoped>

</style>
