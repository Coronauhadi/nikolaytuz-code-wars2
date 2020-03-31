<template>
  <div class="iter">

  </div>
</template>

<script>
export default {
  name: 'Iterator',
  props: {
     Step: Number,
     List1: String,
     List2: String,
     API: Object,
  },
  methods: {
	"prepareList": function(){
		this.MyList = this.List1.split('\n')
		this.ExternalList = this.List2.split('\n')
	},
	"getter": function(){
		return this.Ret()
	},
	
	"getlog": function(){
		console.log(this.List1)
	},
  },
  data: ()=>{
    return {
		MyList: [],
		ExternalList: [],
    }
  },
  watch: {
        Step: function(val)
		{
          this.API.makestep()
          console.log(val)
        }
  },
}
</script>

<style scoped>

</style>
