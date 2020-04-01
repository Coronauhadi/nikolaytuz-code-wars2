<template>
  <div class="container-fluid elegant-color poln  " >
    <div class="row  " >
      <div class="col-12 h-100">
        <div class="text-center ">
          <img src="/res/katalog_woutgr.png" class="" style="height:200px" alt="">
          <!-- <img src="/res/katalog_woutgr.png" class="" style="height:200px" alt=""> -->
        </div>
        <div class="text-center h-100 mx-auto white bor py-5"  style="">
          <h1><b>CODE-WARS</b> </h1>

          <div class=" mt-5">
            <button  class="btn btn-elegant w-50" @click="nextpage('Level1')" name="button">Начать</button>
          </div>
          <div class=" " v-if="prodshow">
            <button  class="btn btn-elegant w-50" @click="nextpage(hlevel)" name="button">Продолжить</button>
          </div>
          <!-- <div class=" ">
            <a  class="btn btn-white w-25" href="/#/" name="button">Об игре</a>
          </div>
          <div class=" ">
            <a  class="btn btn-white w-25" href="/#/" name="button">Выход</a>
          </div> -->
        </div>
        <!-- <div class="text-center">
          <img src="/res/katalog_woutgr.png" class="" style="height:200px" alt="">
          <img src="/res/katalog_woutgr.png" class="" style="height:200px" alt="">
        </div> -->
      </div>
    </div>
  </div>
</template>

<style media="screen" scoped="">
  .poln{
    height: 100vh;
  }
  .bor{
    border-radius: 5px;
  }
</style>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  props: {
    nextpage: Function,
  },
  mounted (){
    if (localStorage.level) {
      this.level = localStorage.level
      this.prodshow = true
      this.hlevel = "Level"+this.level
    }
   },
   data(){
     return {
       level: 1,
       prodshow: false,
       hlevel: "Level2"
     }
   },
  watch: {
    level: function(newval) {
      localStorage.level = newval
    }
  }
}
</script>
