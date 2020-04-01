<template>
  <div class="container-fluid">
    <div class="row  ">

					<!-- <div class="col-4 p-0 " style="height:100vh;"> -->
							<!-- <textarea v-model='List' id="my-textarea" class="h-100 w-100 elegant-color-dark border-none text-white p-3" style="border:none"   name="text" placeholder="// поехали!"> -->
							<!-- </textarea> -->
							<!-- <button type="button" class="sub" @click="exec" name="button">√</button> -->
					<!-- </div> -->
          <button type="button" class="sub-debug btn btn-black" @click="execDebug()" name="button-debug"> |> </button>
          <button type="button" class="sub-stop btn btn-black" @click="terminate()" name="button-stop"> stop </button>
          <button type="button" class="sub-pom btn btn-black " @click="info=!info" name=""> Помощь </button>

          <Iterator :List1='List' :Api="Api" :Step='step' :List2='EnemyList'/>

					<div class="col-12 ">
            <div class="divtextar" :style="fokus?'height:80vh; width:80%':''">
              <textarea v-model='List' id="my-textarea" @focus="fokus=true" @blur="fokus=false" class=" h-100 w-100 elegant-color-dark border-none text-white p-3 " style="border:none "   name="text" placeholder="// поехали!"></textarea>
            </div>

						<div class="" style="margin-top:110px;">

							<div class="container-fluid">
								<div class="row">
									<div class="col-12 text-right">
										<small>Уровень 2-й</small>
									</div>
									<div class="col-12 pb-2 text-center">
										<h2>  </h2>
									</div>

								</div>
							</div>

							<table id="fields" class="mx-auto ">
								<tr v-for="table in tables" :key="table.message">
									<th v-for="th in table" :key="th.message" :id="'x'+th.x+'y'+th.y" :title="'x'+th.x+';y'+th.y" class="cell razm" :style="th.style">  </th>
								</tr>
							</table>


							<div :class="'pers1 razm '+pers1.animated" :style="pers1.pos" >
                <img src="/res/sprites/characters/shrek/shrek_idle.png" class="w-100 " alt="">
							</div>

              <div :class="'pers1 razm '+  pers2.animated" :style="pers2.pos" >
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

        <div class="info elegant-color-dark  " v-if="info">
          <div class="container py-5">
            <div class="row">
              <div class="col-10 white mx-auto p-5 ">
                <h1>#Команды для управления персонажем</h1>
                <p class="lead"> Давайте посмотрим, что такого особенного в программировании, чего можно достичь с его помощью.</p>
                <p class=""><b>makestep()</b> - Эта команда позволит сделать шаг в том направлении, в котором смотрит персонаж</p>
                <p class=""><b>rotate(r)</b> или <b>rotate(l)</b> - Эта команда повзволит вашему персонажу повернуться. В зависимости от параметра l или r, персонаж повернет влево или вправо</p>
                <p class=""><b>for(х)</b> - А что если надо сделать несколько шагов. Эта функция говорит сколько раз выполнить следующую команду.
                  <br>Например: for(5)makestep() заставит персонажа пройти 5 шагов. </p>
                <p><b>conquer()</b> - Цель игры захватить шаг. Сделать это можно с помощью данной команды. </p>
                <button type="button" class="btn btn-elegant w-100" @click="info=!info" name="button">Вернуться на поле боя</button>
              </div>
            </div>
          </div>
        </div>

          <div class="win" v-if="winer">
            <div  class="windiv rgba-black-strong border text-white text-center py-5">
              <h2>Поздравляем вы прошли игру</h2>
              <a href="/#/" class="btn btn-white" >Поздавить себя</a>
            </div>
          </div>
        <div class="win" v-if="loss">
          <div  class="windiv rgba-black-strong border text-white text-center py-5">
            <h2>Вы проиграли</h2>
            <button @click="terminate()" class="btn btn-white" >Начать сначала</button>
          </div>
        </div>
      </div>
  <!-- </div> -->
</template>


<style media="screen">
.info{
  top:0;
  left: 0;
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 9999;
  overflow: auto;


}
.divtextar{
  position: absolute;
  left:0;
  height: 100px;
  width: 100%;
  z-index: 1000;
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

  .sub-pom{
    position: fixed;
    bottom: 12px;
    right: 360px;
    z-index: 99;
    border-radius: 10px;
  }

  .sub-debug{
    bottom: 12px;
    right: 120px;
    position: fixed;
    font: 17px Arial;
    border-radius: 10px;
    z-index: 99;
  }

  .sub-stop{
    bottom: 12px;
    right: 230px;
    position: fixed;
    border-radius: 10px;
    z-index: 99;
  }

  .pers1{
    position: fixed;
    z-index: 999;
  }

  .razm{
    height: 30px!important;
    width: 30px!important;
  }

  .winbox{
    position: fixed;
    z-index: 999;
  }
  .anim{
    transition: all 0.5s ease-in-out;
  }
  .cell{
    height: 4vh;
    width: 4vh;
  }

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
import Iterator from '@/components/Iterator.vue'

export default {
  name: 'Level1',
  components: {
    Iterator
  },
  created: function() {
    this.createWalls()
    this.addtables()
  },
  mounted: function() {
    this.setcoor()
    // this.pers1.animated.push("anim")
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
   };
  },
  methods:{
    execDebug: function(){
      this.step++
    },
    terminate: function(){
      this.step = -1
      this.setstartcoor()
      this.setstartDirection()
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
        if(arg=='r'||arg=='right')
          this.rotate('r',id)
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
          let isWall = this.isAllowed(i+1,j+1)
          let color = isWall? '#3f729b' : '#92000a'
          a.push({"x": i+1, "y": j+1, "isWall": isWall, "style":{ "border":"1px solid white" , "background-color": color}, })
        }
        this.tables.push(a)
      }
    },
    createWalls: function(){
      let arr = {
        x: [],
        y: [],
        length: 0,
      }
      for(let i=0;i<this.walls.length;i++){
        let str = this.walls[i].split(';')
        arr.x.push(str[0])
        arr.y.push(str[1])
        ++arr.length
      }
      this.walls = arr
    },
    getCoords: function(elem) {
      var box = elem.getBoundingClientRect();
      return  {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    },
    setstartcoor: function(){
      this.pers1.cor.x = this.pers1.startcoords.x
      this.pers1.cor.y = this.pers1.startcoords.y
      this.pers2.cor.x = this.pers2.startcoords.x
      this.pers2.cor.y = this.pers2.startcoords.y
      this.setcoor()
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
      let x = this["pers"+id].cor.x; let y = this["pers"+id].cor.y;
      if(this["pers"+id].direction == 0 && this["pers"+id].cor.y < this.y){
        if(this.isAllowed(x,y+1)) this["pers"+id].cor.y++
      }
      else if(this["pers"+id].direction == 1 && this["pers"+id].cor.x < this.x){
        if(this.isAllowed(x+1,y)) this["pers"+id].cor.x++
      }
      else if(this["pers"+id].direction == 2 && this["pers"+id].cor.y > 0){
        if(this.isAllowed(x,y-1)) this["pers"+id].cor.y--
      }
      else if(this["pers"+id].direction == 3 && this["pers"+id].cor.x > 0){
        if(this.isAllowed(x-1,y)) this["pers"+id].cor.x--
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
  setstartDirection: function(){
    this.pers1.direction = this.pers1.startDirection
    this.pers2.direction = this.pers2.startDirection
    this.rotate(' ',1)
    this.rotate(' ',2)
  },
  isAllowed: function(x,y){
    //prohibit to move through the walls
    let allowed = true
    for(let i=0;i<this.walls.length;i++){
      if(x==this.walls.x[i] && y==this.walls.y[i])
        allowed = false
    }
    return allowed
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
                cor:{'x': 3, 'y': 3},
                startcoords:{'x':3, 'y': 3},
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
              pers2: {
                animated: ["anim"],
                cor:{'x': 16, 'y': 4},
                startcoords:{'x': 16, 'y': 4},
                pos: {"top": "1px", "left":"1px", "transform": "rotate(0 deg)",},
                direction: 0,
                startDirection: 0,
              },
              info: false,
              winer: false,
              fokus: false,
              loss: false,
              x: 17,
              y: 17,
              winbox: {
                cor:{'x': 10, 'y': 10},
                pos: {"top": "1px", "left":"1px",},
              },
              winCounter: 0,
              winner: 0,
              tables: [],
              walls: ['1;5', '1;17', '2;5', '2;6', '3;6', '4;6', '5;6', '6;6', '7;6', '8;7', '8;8', '8;9', '9;9', '9;10', '10;11', '15;1' , '15;2' , '15;3', '15;4', '14;5', '13;6', '13;7', '13;8','13;10','13;11','16;6','17;6','16;3','17;5', '7;4','7;3','7;2','4;2','4;3','4;4','8;6','10;6','11;6', '5;12', '5;15', '7;11','7;16','8;12','8;13','8;14','8;15'],
              List: '',
              EnemyList:'makestep()\nrotate(l)\nmakestep()\nrotate(r)\nmakestep()\nrotate(l)\nmakestep()\nrotate(r)\nfor(3)makestep()\nrotate(l)\nfor(4)makestep()\nrotate(r)\nmakestep()\nconquer()',
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
