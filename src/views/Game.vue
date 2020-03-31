<template>
  <div class="container-fluid">
    <div class="row  ">

					<div class="col-4 p-0 " style="height:100vh;">
							<textarea v-model='List' id="my-textarea" class="h-100 w-100 elegant-color-dark border-none text-white p-3" style="border:none"   name="text" placeholder="// поехали!">
							</textarea>
							<button type="button" class="sub" @click="execute()" name="button">√</button>
					</div>

          <Iterator List1='List' API='API' Step='step'/>

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
    this.setcoor("x"+this.pers.cor.x+"y"+this.pers.cor.y)
    // this.pers.animated.push("anim")
    window.onresize = () => {
     this.windowWidth = window.innerWidth;
   };
  },
  methods:{
    "addtables": function() {
      for (var i = 0; i < this.y; i++) {
        let a = []
        for (var j = 0; j < this.y; j++) {
          a.push({"x": i+1, "y": j+1})
        }
        this.tables.push(a)
      }
    },
    "getCoords": function(elem) {
      var box = elem.getBoundingClientRect();
      return  {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };

    },
    "setcoor": function(id) {
      let cor = this.getCoords(document.getElementById(id))
      this.pers.pos.top = cor.top+'px'
      this.pers.pos.left = cor.left+'px'
    },
    "addshg": function() {
		this.rotate('l')
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
      return;
    }

    this.setcoor("x"+this.pers.cor.x+"y"+this.pers.cor.y)
  },
	"rotate": function(dir){
		if(dir == 'left' || dir == 'l'){
			this.pers.direction = (this.pers.direction == 0)? 3 : (this.pers.direction-1) % 4
		}
		else if(dir == 'right' || dir == 'r'){
			this.pers.direction = Math.abs((this.pers.direction +1) % 4)
		}
		else{
			return;
		}
		this.pers.pos.transform = 'rotate(' + String(Math.round(this.pers.direction * 90)) + 'deg)'
	},
	"execute": function(){
		
	},
  },
  data: ()=>{
    return {
              windowWidth: window.innerWidth,
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
              x: 17,
              y: 17,
              tables: [],
              List: '',
              step: 0,
              API: {
                  makestep: this.addshg(), 
              },
              }
  },
  watch: {
    windowWidth: function (val) {
      val
      this.setcoor("x"+this.pers.cor.x+"y"+this.pers.cor.y)
    }
  }
}
</script>
