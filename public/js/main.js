

var app = new Vue({
  el: '#app',
  created: function() {
    this.addtables()
	this.setcoor("x"+this.pers.cor.x+"y"+this.pers.cor.y)
  },
  mounted: function() {
    this.setcoor("x"+this.pers.cor.x+"y"+this.pers.cor.y)
    // this.pers.animated.push("anim")
    window.onresize = (event) => {
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
  },


  data: {
    windowWidth: window.innerWidth,
    pers: {
      animated: ["anim"],
      cor:{'x': 5, 'y': 5},
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
  },
  watch: {
    windowWidth: function (val) {
      this.setcoor("x"+this.pers.cor.x+"y"+this.pers.cor.y)
    }
  }

})
