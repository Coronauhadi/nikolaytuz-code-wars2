<template>
  <div class="">
    <Home :nextpage="nextpage" v-if="pages == 'Home'"/>
    <Level1 :nextpage="nextpage" v-if="pages == 'Level1'"/>
    <Level2 :nextpage="nextpage" v-if="pages == 'Level2'"/>
  </div>
</template>

<style media="screen">

</style>

<script>
import Home from '@/views/Home.vue'
import Level1 from '@/views/Level1.vue'
import Level2 from '@/views/Level2.vue'

export default {
  name: 'proloj',
  components: {
    Home,
    Level1,
    Level2,
  },
  mounted (){

   },

   data(){
     return {
       pages: 'Home',
     }
   },
   methods:{
     nextpage: function(namepage){
       // alert(namepage)
       this.pages = namepage
     },
   },
  watch: {

  }
}
</script>
