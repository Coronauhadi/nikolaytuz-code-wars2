<template>
  <div class="container-fluid poln  text-white">
    <div class="row">
      <div class="col ">
        <div class="text-center mt-5 w-50 mx-auto elegant-color bor py-5"  style="height:40vh">
          <h1><b>Code wars</b> </h1>

          <div class=" mt-5">
            <a  class="btn btn-white w-25" href="/#/Level1/" name="button">Начать</a>
          </div>
          <div class=" " v-if="prodshow">
            <a  class="btn btn-white w-25" :href="hlevel" name="button">Продолжить</a>
          </div>
          <!-- <div class=" ">
            <a  class="btn btn-white w-25" href="/#/" name="button">Об игре</a>
          </div>
          <div class=" ">
            <a  class="btn btn-white w-25" href="/#/" name="button">Выход</a>
          </div> -->
        </div>
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
  mounted (){
    if (localStorage.level) {
      this.level = localStorage.level
      this.prodshow = true
      this.hlevel = "/#/Level"+this.level+"/"
    }
   },
   data(){
     return {
       level: 1,
       prodshow: false,
       hlevel: "/#/Level1/"
     }
   },
  watch: {
    level: function(newval) {
      localStorage.level = newval
    }
  }
}
</script>
