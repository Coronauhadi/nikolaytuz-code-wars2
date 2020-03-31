<template>
  <div class="container-fluid">
    <div class="row  ">

					<div class="col-4 p-0 " style="height:100vh;">
							<textarea v-model='List' id="my-textarea" class="h-100 w-100 elegant-color-dark border-none text-white p-3" style="border:none"   name="text" placeholder="// поехали!">
							</textarea>
							<button type="button" class="sub" @click="step++" name="button">√</button>
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

							<div :class="'pers '+  pers.animated" :style=pers.pos >
								<img src="/res/sprites/characters/amazonka/amazonka_idle.png" class="w-100 " alt="">
							</div>

              <div :class="'pers '+  pers2.animated" :style=pers2.pos >
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


  .pers{
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
    // this.pers.animated.push("anim")
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
   };
  },
  methods:{
    Api: function(command){
      let arg = command.substring(7,8)
      switch(command.substring(0,6))
      {
      case 'makest':
        this.addshg()
        break;

      case 'rotate':
      if(arg=='r'){ this.rotate('r') }
      else if(arg=='l'){ this.rotate('l') }
      else return
      break;

      default:
        return
      }
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
      let cor1 = this.getCoords(document.getElementById("x"+this.pers.cor.x+"y"+this.pers.cor.y))
      let cor2 = this.getCoords(document.getElementById("x"+this.pers2.cor.x+"y"+this.pers2.cor.y))
      this.pers.pos.top = cor1.top+'px'
      this.pers.pos.left = cor1.left+'px'
      this.pers2.pos.top = cor2.top+'px'
      this.pers2.pos.left = cor2.left+'px'
    },
    addshg: function() {
    if(this.pers.direction == 0){
      this.pers.cor.y++
    }
    else if(this.pers.direction == 1){
      this.pers.cor.x++
    }
    else if(this.pers.direction == 2){
      this.pers.cor.y--
    }
    else if(this.pers.direction == 3){
      this.pers.cor.x--
    }
    else{
      return
    }

    this.setcoor()
  },
	rotate: function(dir){
		if(dir == 'l'){
			this.pers.direction = (this.pers.direction == 0)? 3 : (this.pers.direction-1) % 4
		}
		else if(dir == 'r'){
			this.pers.direction = Math.abs((this.pers.direction +1) % 4)
		}
		else{
			return;
		}
		this.pers.pos.transform = 'rotate(' + String(Math.round(this.pers.direction * 90)) + 'deg)'
	},
  },
  data: ()=>{
    return {
              windowWidth: window.innerWidth,
              windowHeight: window.innerHeight,
              pers: {
                animated: ["anim"],
                cor:{'x': 2, 'y': 2},
                pos: {"top": "1px", "left":"1px", "transform": "rotate(0 deg)",},
                  /*
            	  direction = 0 -> look right
            	  direction = 1 -> look bottom
            	  direction = 2 -> look left
            	  direction = 3 -> look look top
            	  */
                direction: 0,
              },
              pers2: {
                animated: ["anim"],
                cor:{'x': 8, 'y': 8},
                pos: {"top": "1px", "left":"1px", "transform": "rotate(0 deg)",},
                  /*
                direction = 0 -> look right
                direction = 1 -> look bottom
                direction = 2 -> look left
                direction = 3 -> look look top
                */
                direction: 0,
              },
              x: 17,
              y: 17,
              tables: [],
              List: '',
              step: 0,
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
