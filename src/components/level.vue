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
										<small>Уровень 2-й</small>
									</div>
									<div class="col-12 pb-2 text-center">
										<h2>  </h2>
									</div>

								</div>
							</div>

							<table id="fields" class="mx-auto ">
								<tr v-for="table in tables" :key="table.message">
									<th v-for="th in table" :key="th.message" :id="'x'+th.x+'y'+th.y" :title="'x'+th.x+';y'+th.y" class="cell" :style="th.style">  </th>
								</tr>
							</table>


							<div :class="'pers1 '+pers1.animated" :style="pers1.pos" >
                <img src="/res/sprites/characters/shrek/shrek_idle.png" class="w-100 " alt="">
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
                  <h3></h3>
									<ul>
										<li></li>
									</ul>
								</div>
							</div>
						</div>
					</div>


				</div>
  </div>
</template>


<style media="screen">
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
  .cell{
    height: 4vh;
    width: 4vh;
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
  props: {
    level: Object,
    win: Function,
  },
  created: function() {
    this.createWalls()
    this.addtables()
  },
  mounted: function() {

    this.updLvlInfo()

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
    },
    updLvlInfo: function(){
      console.log("уровень подгрулся")
      this.pers1.startcoords = this.level.pers1Startcor
      this.pers2.startcoords = this.level.pers2Startcor
      this.pers1.startDirection = this.level.pers1Startdir
      this.pers2.startDirection = this.level.pers2Startdir
      this.winbox.cor = this.level.flagCor
      this.enemyList = this.level.enemyList
      console.log(this.level)
      this.setstartcoor()
      this.setstartDirection()
    },
    Api: function(command,id){
      let arg = 0
      let enemyId = (id==1)? 2 : 1
      if(this.winCounter>0){
        // alert('Player' + this.whoIs(this.winbox.cor.x,this.winbox.cor.y) + ' has won')
        this.win()
        this.updLvlInfo()
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
          a.push({"x": i+1, "y": j+1, "isWall": isWall, "style":{"height": "4vh", "width":"4vh", "border":"1px solid white" , "background-color": color}, })
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
      console.log(this.pers1);
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
              x: 17,
              y: 17,
              winbox: {
                cor:{'x': 10, 'y': 10},
                pos: {"top": "1px", "left":"1px",},
              },
              winCounter: 0,
              winner: 0,
              tables: [],
              walls: [],
              List: '',
              EnemyList:' ',
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
