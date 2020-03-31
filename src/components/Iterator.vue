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
    myIter: 0,
    extIter: 0,
    }
  },
  watch: {
    Step: function(){
      if(this.Step==0) { this.prepareList(); this.myIter = 0; this.extIter = 0; }
      if(this.MyList == undefined && this.ExternalList == undefined)
        return
      if(this.MyList[this.myIter]==undefined && this.ExternalList[this.extIter]==undefined){
        this.Api('end',1)
      }

      if(this.Step%2==0){
        this.MyList[this.myIter]!=undefined? this.Api(this.MyList[this.extIter],1) : {}
        this.myIter++
      }
      else{
        this.ExternalList[this.myIter]!=undefined? this.Api(this.ExternalList[this.extIter],2) : {}
        this.extIter++
      }
    },
  },
}
</script>

<style scoped>

</style>
