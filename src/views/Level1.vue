<template>
  <div class="container-fluid">
    <div class="row  ">

					<div class="col-4 p-0 " style="height:100vh;">
							<textarea v-model='List' id="my-textarea" class="h-100 w-100 elegant-color-dark border-none text-white p-3" style="border:none"   name="text" placeholder="// поехали!">
							</textarea>
							<!-- <button type="button" class="sub" @click="exec" name="button">√</button> -->
              <button type="button" class="sub-debug" @click="execDebug()" name="button-debug"> |> </button>
              <button type="button" class="sub-stop" @click="terminate()" name="button-stop"> stop </button>
					</div>

          <Iterator :List1='List' :Api="Api" :Step='step' :List2='EnemyList'/>

					<div class="col-8 ">
						<div class="">

							<div class="container-fluid">
								<div class="row">
									<div class="col-12 text-right">
										<small>Уровень 1-й</small>
									</div>
									<div class="col-12 pb-2 text-center">
										<h2>  </h2>
									</div>

								</div>
							</div>

							<table id="fields" class="mx-auto ">
								<tr v-for="table in tables" :key="table.message">
									<th v-for="th in table" :key="th.message" :id="'x'+th.x+'y'+th.y" :title="'x'+th.x+';y'+th.y" class="unique-color text-white  border" style="height:4vh;width:4vh;"></th>
								</tr>
							</table>

							<div :class="'pers1 '+pers1.animated" :style="pers1.pos" >
                <img src="/res/sprites/characters/kpoper/kpoper_idle.png" class="w-100 " alt="">
							</div>

              <div :class="'pers1 '+  pers2.animated" :style="pers2.pos" >
                <img src="/res/sprites/characters/biker/bike_aim.png" class="w-100 " alt="">
              </div>

              <div :class="'winbox'" :style="winbox.pos" >
                <img src="/res/sprites/other/flag.png" class="flag " alt="">
              </div>

							<div class="row ">
								<div class="col">
									<hr class="mb-1 elegant-color-dark">
                  <h3>{{this.step+1}} шаг</h3>
								</div>
							</div>
						</div>
					</div>


				</div>

        <div  class="windiv rgba-black-strong border text-white text-center py-5">
          <h2>Поздравляем вы прошли уровень</h2>
          <a href="/#/Level2" class="btn btn-white" >Перейти на следующий</a>
        </div>
      </div>
        
        <div class="win" v-if="loss">
          <div  class="windiv rgba-black-strong border text-white text-center py-5">
            <h2>Вы проиграли</h2>
            <button @click="terminate()" class="btn btn-white" >Начать сначала</button>
          </div>
        </div>

        <div class="info" v-show="info">

        </div>
  </div>
</template>


<style media="screen">
  .info{
    position: fixed;

  }
/*
    .sub{
    bottom: 12px;
    padding: 12px 24px;
    position: fixed;
    font: 16px Arial;
    text-align: center;
    background-color: #112;
    color: #6F6;
    right: 6px;
    border: solid #111 6px;
    border-radius: 10px;
    z-index: 99;
  }
*/

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

  .sub-debug{
    bottom: 12px;
    right: 120px;
    padding: 12px 24px;
    position: fixed;
    font: 16px Arial;
    text-align: center;
    background-color: #112;
    color: red;
    border: solid #111 6px;
    border-radius: 10px;
    z-index: 99;
  }

  .sub-stop{
    bottom: 12px;
    right: 240px;
    padding: 12px 24px;
    position: fixed;
    font: 16px Arial;
    text-align: center;
    background-color: #112;
    color: red;
    border: solid #111 6px;
    border-radius: 10px;
    z-index: 99;
  }

  .pers1{
    position: fixed;
    height:4vh;
    width: 4vh;
    z-index: 999;
  }

  .winbox{
    position: fixed;
    height: 4vh;
    width: 4vh;
    z-index: 999;
  }
  .anim{
    transition: all 0.5s ease-in-out;
  }

</style>


<script>
// @ is an alias to /src
import Iterator from '@/components/Iterator.vue'

export default {
  name: 'Level1',
  components: {
    Iterator
  },
  created: function() {
    this.addtables()
  },
  mounted: function() {
    localStorage.level = 1

    this.setcoor()
    // this.pers1.animated.push("anim")
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
   };
  },
  methods:{
    exec: function(){
      //do this.step++ while step!=-1 or something?
    },
    execDebug: function(){
      this.step++
    },
    terminate: function(){
      this.step = -1
      this.pers1.cor.x = this.pers1.startcoords.x
      this.pers1.cor.y = this.pers1.startcoords.y
      this.pers2.cor.x = this.pers2.startcoords.x
      this.pers2.cor.y = this.pers2.startcoords.y
      this.setcoor()
      this.pers1.direction = this.pers1.startDirection
      this.pers1.pos.transform = 'rotate(' + String(Math.round(this.pers1.direction * 90)) + 'deg)'
      this.pers2.direction = this.pers2.startDirection
      this.pers2.pos.transform = 'rotate(' + String(Math.round(this.pers2.direction * 90)) + 'deg)'
      this.winCounter = 0
      this.loss = false
    },
    Api: function(command,id){
      let arg = 0
      let enemyId = (id==1)? 2 : 1
      if(this.winCounter>0){


        if(this.whoIs(this.winbox.cor.x,this.winbox.cor.y)==1){
          this.winer = true
          localStorage.level = 2
        }else{
          this.loss = true
        }
        // alert('Player' + this.whoIs(this.winbox.cor.x,this.winbox.cor.y) + ' has won')
        return
      }
      command.substring(0,8)=='makestep'? this.addshg(id) : {}
      if(command.substring(0,6)=='rotate'){
        arg = command.substring(7,command.length-1)
        if(arg=='r'||arg=='right'){
        this.rotate('r',id);}
        else if(arg=='l' || arg=='left')
        this.rotate('l',id)
      }
      command.substring(0,3)=='aim'? this.aim(id,enemyId) : {}
      if(command.substring(0,7)=='conquer'){
        if(this.whoIs(this.winbox.cor.x,this.winbox.cor.y) == id) this.winCounter++
        else this.winCounter = 0
      }
      command.substring(0,3)=='end'? this.terminate() : {}
    },
    addtables: function() {
      for (var i = 0; i < this.y; i++) {
        let a = []
        for (var j = 0; j < this.y; j++) {
          a.push({"x": i+1, "y": j+1})
        }
        this.tables.push(a)
      }
    },
    getCoords: function(elem) {
      var box = elem.getBoundingClientRect();
      return  {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    },
    setcoor: function() {
      let cor1 = this.getCoords(document.getElementById("x"+this.pers1.cor.x+"y"+this.pers1.cor.y))
      let cor2 = this.getCoords(document.getElementById("x"+this.pers2.cor.x+"y"+this.pers2.cor.y))
      this.pers1.pos.top = cor1.top+'px'
      this.pers1.pos.left = cor1.left+'px'
      this.pers2.pos.top = cor2.top+'px'
      this.pers2.pos.left = cor2.left+'px'
      let cor3 = this.getCoords(document.getElementById("x"+this.winbox.cor.x+"y"+this.winbox.cor.y))
      this.winbox.pos.top = cor3.top + 'px'
      this.winbox.pos.left = cor3.left+'px'
    },
    addshg: function(id) {
      if(this["pers"+id].direction == 0){
        this["pers"+id].cor.y+1 < this.y? this["pers"+id].cor.y++ : {}
      }
      else if(this["pers"+id].direction == 1){
        this["pers"+id].cor.x+1 < this.x? this["pers"+id].cor.x++ : {}
      }
      else if(this["pers"+id].direction == 2){
        this["pers"+id].cor.y-1 > 0? this["pers"+id].cor.y-- : {}
      }
      else if(this["pers"+id].direction == 3){
        this["pers"+id].cor.x-1 > 0? this["pers"+id].cor.x-- : {}
      }
      else{
        return;
    }

    this.setcoor()
  },
  rotateByAngle: function(angle, id){
     this["pers"+id].pos.transform = 'rotate(' + String(angle-90) + 'deg)'
     //TODO: rotate on the last angle (by 'direction' variable) after shooting
  },
  aim: function(idCaller,idEnemy){
    let Vector = []
    Vector.push(this["pers" + idEnemy].cor.x - this["pers" + idCaller].cor.x)
    Vector.push(this["pers" + idEnemy].cor.y - this["pers" + idCaller].cor.y)
    let angle = Math.atan(Vector[0]/Vector[1]) * 180 / Math.PI
    if(Vector[1]>0){ angle += 90;  }
    else{ angle -= 90}
    this.rotateByAngle(angle,idCaller)
  },
	rotate: function(dir,id){
		if(dir == 'l'){
			this["pers"+id].direction = (this["pers"+id].direction == 0)? 3 : (this["pers"+id].direction-1) % 4
		}
		else if(dir == 'r'){
			this["pers"+id].direction = Math.abs((this["pers"+id].direction +1) % 4)
		}
		this["pers"+id].pos.transform = 'rotate(' + String(Math.round(this["pers"+id].direction * 90)) + 'deg)'
	},
  whoIs: function(x,y){
    if(this.pers1.cor.x == x && this.pers1.cor.y == y)
      return 1
    else if(this.pers2.cor.x == x && this.pers2.cor.y == y)
      return 2
    else
      return 0
  },
  },
  data: ()=>{
    return {
              windowWidth: window.innerWidth,
              windowHeight: window.innerHeight,
              pers1: {
                animated: ["anim"],
                cor:{'x': 2, 'y': 2},
                startcoords:{'x':2, 'y': 2},
                pos: {"top": "1px", "left":"1px", "transform": "rotate(0 deg)",},
                  /*
            	  direction = 0 -> look right
            	  direction = 1 -> look bottom
            	  direction = 2 -> look left
            	  direction = 3 -> look look top
            	  */
                direction: 0,
                startDirection: 0,
              },
              winer: false,
              loss: false,
              info: false,
              pers2: {
                animated: ["anim"],
                cor:{'x': 8, 'y': 8},
                startcoords:{'x': 8, 'y': 8},
                pos: {"top": "1px", "left":"1px", "transform": "rotate(0 deg)",},
                direction: 0,
                startDirection: 0,
              },
              x: 17,
              y: 17,
              winbox: {
                cor:{'x': 5, 'y': 5},
                pos: {"top": "1px", "left":"1px",},
              },
              winCounter: 0,
              winner: 0,
              tables: [],
              List: '',
              EnemyList:'rotate(l)\nfor(4)makestep()\nrotate(r)\nmakestep()\nrotate(r)\nmakestep()\nrotate(r)\nfor(4)makestep()\nconquer()',
              step: -1,
            }
  },
  watch: {
    windowHeight: function (val) {
      val
      this.setcoor()
    },
    windowWidth: function (val) {
      val
      this.setcoor()
    }
  }
}
</script>
