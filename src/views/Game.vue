<template>
  <div class="container-fluid">
    <div class="row  ">

					<div class="col-4 p-0 " style="height:100vh;">
							<textarea v-model='List' id="my-textarea" class="h-100 w-100 elegant-color-dark border-none text-white p-3" style="border:none"   name="text" placeholder="// поехали!">
							</textarea>
							<button type="button" class="sub" @click="exec" name="button">√</button>
              <button type="button" class="sub-debug" @click="execDebug()" name="button-debug"> |> </button>
              <button type="button" class="sub-stop" @click="terminate()" name="button-stop"> stop </button>
					</div>

          <Iterator :List1='List' :Api="Api" :Step='step'/>

					<div class="col-8 ">
						<div class="">

							<div class="container-fluid">
								<div class="row">
									<div class="col-12 text-right">
										<small>Уровень 1</small>
									</div>
									<div class="col-12 pb-2 text-center">
										<h2>2:00</h2>
									</div>

								</div>
							</div>

							<table id="fields" class="mx-auto ">
								<tr v-for="table in tables" :key="table.message">
									<th v-for="th in table" :key="th.message" :id="'x'+th.x+'y'+th.y" class="unique-color text-white  border" style="height:4vh;width:4vh;"></th>
								</tr>
							</table>

							<div :class="'pers1 '+pers1.animated" :style="pers1.pos" >
                <img src="/res/sprites/characters/amazonka/amazonka_idle.png" class="w-100 " alt="">
								<img src="/res/sprites/weapon/pistol/bullet.png" class="w-25 bul" style="" alt="">
							</div>

              <div :class="'pers1 '+  pers2.animated" :style="pers2.pos" >
                <img src="/res/sprites/characters/biker/bike_aim.png" class="w-100 " alt="">
              </div>

							<div class="row ">
								<div class="col">
									<hr class="mb-1 elegant-color-dark">
									<h3>Инвентарь:</h3>
									<ul>
										<li>Пистолет</li>
									</ul>
								</div>
							</div>
						</div>
					</div>


				</div>
  </div>
</template>


<style media="screen">
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

<<<<<<< HEAD
  .bul{
    position: absolute;
    top: 69%;
    right: 38%;
=======
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
>>>>>>> a244e99fb05f9bac115c0d9f87eb3085f0654fa5
  }

  .pers1{
    position: fixed;
    height:4vh;
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
  name: 'Game',
  components: {
    Iterator
  },
  created: function() {
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
<<<<<<< HEAD

=======
    exec: function(){
      //do this.step++ while step!=-1 or something?
    },
    execDebug: function(){
      this.step++
    },
    terminate: function(){
      this.step = -1
      this.pers1.cor.x = this.pers1.startcoords.x
      this.pers1.cor.y = this.pers1.startcoords.x
      this.pers2.cor.x = this.pers2.startcoords.x
      this.pers2.cor.y = this.pers2.startcoords.x
      this.setcoor()
      this.pers1.direction = this.pers1.startDirection
      this.pers1.pos.transform = 'rotate(' + String(Math.round(this.pers1.direction * 90)) + 'deg)'
      this.pers2.direction = this.pers2.startDirection
      this.pers2.pos.transform = 'rotate(' + String(Math.round(this.pers2.direction * 90)) + 'deg)'
    },
>>>>>>> a244e99fb05f9bac115c0d9f87eb3085f0654fa5
    Api: function(command,id){
      let arg = 0
      arg
      let enemyId = (id==1)? 2 : 1
<<<<<<< HEAD
      switch(command.substring(0,4))
      {
      case 'make':
        this.addshg(id)
        break;

      case 'rota':
      if(arg=='r'){ this.rotate('r',id) }
      else if(arg=='l'){ this.rotate('l',id) }
      else return
      break

      case 'aim(':
      this.aim(id,enemyId)
      break

      default:
      return
      }
=======
      command.substring(0,8)=='makestep'? this.addshg(id) : {}
      console.log(command.substring(0,6))
      if(command.substring(0,6)=='rotate'){ arg = command.substring(7,command.length-1); console.log(arg)
        if(arg=='r'||arg=='right') this.rotate('r',id);
        else if(arg=='l' || arg=='left') this.rotate('l',id);}
      command.substring(0,3)=='aim'? this.aim(id,enemyId) : {}
      command.substring(0,3)=='end'? this.terminate() : {}
>>>>>>> a244e99fb05f9bac115c0d9f87eb3085f0654fa5
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
		else{
			return;
		}
		this["pers"+id].pos.transform = 'rotate(' + String(Math.round(this["pers"+id].direction * 90)) + 'deg)'
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
              tables: [],
              List: '',
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
