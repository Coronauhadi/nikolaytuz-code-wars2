<template >
  <div class="gams">
    <lev :level="level"  :win="win()"  />

    <div class="win" v-if="winer">
      <div  class="windiv rgba-black-strong border text-white text-center py-5">
        <h2>Поздравляем вы прошли уровень</h2>
        <button type="button" class="btn btn-white" name="button">Перейти на следующий</button>
      </div>
    </div>
  </div>
</template>


<style media="screen">
  .win{
    position: fixed;
    top: 0;
    right: 0%;
    width: 100%;
    height: 100vh;
    z-index: 99;
  }
  .windiv{
    position: fixed;
    top: 25%;
    right: 25%;
    width: 50%;
    z-index: 999;
  }
</style>

<script>
// @ is an alias to /src
import lev from '@/components/level.vue'

export default {
  name: 'gamel',
  components: {
    lev
  },
  mounted(){
    if (localStorage.levcont) {
      this.levcont = localStorage.levcont;
    }
    this.level = this.levels[this.levcont-1]
  },
  data: ()=>{
    return {
      levcont: 1,
      winer: false,
      index: -1,
      level:{
        walls: [],
        pers1Startcor :  {'x':2, 'y': 2},
        pers1Startdir : 0,
        pers2Startcor : {'x': 8, 'y': 8},
        pers2Startdir : 0,
        flagCor : {'x': 5, 'y': 5},
        enemyList :  'rotate(l)\nfor(4)makestep()\nrotate(r)\nmakestep()\nrotate(r)\nmakestep()\nrotate(r)\nfor(4)makestep()\nconquer()',
      },
      levels: [
        {
          walls: [],
          pers1Startcor :  {'x':2, 'y': 2},
          pers1Startdir : 0,
          pers2Startcor : {'x': 8, 'y': 8},
          pers2Startdir : 0,
          flagCor : {'x': 5, 'y': 5},
          enemyList :  'rotate(l)\nfor(4)makestep()\nrotate(r)\nmakestep()\nrotate(r)\nmakestep()\nrotate(r)\nfor(4)makestep()\nconquer()',
        },
        {
          walls: ['1;5', '1;17', '2;5', '2;6', '3;6', '4;6', '5;6', '6;6', '7;6', '8;7', '8;8', '8;9', '9;9', '9;10', '10;11', '15;1' , '15;2' , '15;3', '15;4', '14;5', '13;6', '13;7', '13;8','13;10','13;11','16;6','17;6','16;3','17;5', '7;4','7;3','7;2','4;2','4;3','4;4','8;6','10;6','11;6', '5;12', '5;15', '7;11','7;16','8;12','8;13','8;14','8;15'],
          pers1Startcor :  {'x':3, 'y': 3},
          pers1Startdir :  0,
          pers2Startcor :  {'x': 16, 'y': 4},
          pers2Startdir :  0,
          flagCor : {'x': 10, 'y': 10},
          enemyList : 'makestep()\nrotate(l)\nmakestep()\nrotate(r)\nmakestep()\nrotate(l)\nmakestep()\nrotate(r)\nfor(3)makestep()\nrotate(l)\nfor(4)makestep()\nrotate(r)\nmakestep()\nconquer()',
        }
      ]
    }
  },
  methods: {
    win: function(){
      this.updLevel()
    },
    updLevel: function(){
      ++this.index
      this.level = this.levels[this.index]
    }
  },
}


</script>
