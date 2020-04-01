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
      this.MyList = this.makeFors(this.MyList)
      this.ExternalList = this.makeFors(this.ExternalList)
    },
    getter: function(){
      return this.Ret()
    },
    sleep: function(ms) {
      ms += new Date().getTime();
      while (new Date() < ms){''}
    },
    makeFors: function(List){
    let saveData = []
    let arg = 0
    let repeatIt = ''
    let forData = []
    for(let i=0;i<List.length;i++){
    if(List[i].substring(0,3)=='for'){
        saveData = (i+1!=List.length)? List.slice(i+1,List.length) : [];
        //getting 'x' from 'for(x)'
        arg = Number(List[i].substring(4,List[i].indexOf(')')))
        //getting command name after 'for(x)'
        repeatIt = List[i].substring(List[i].indexOf(')')+1,List[i].length)
        forData = []
        for(let k=0;k<arg;k++) forData.push(repeatIt)
        List = List.slice(0,i)
        List = forData != undefined? List.concat(forData) : {}
        List = saveData!=undefined? List.concat(saveData) : {}
    }

    }
    return List
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
