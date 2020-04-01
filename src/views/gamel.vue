<template >
  <div class="gams">
    <level :level="level"   />
  </div>
</template>


<script>
// @ is an alias to /src
import level from '@/components/level.vue'

export default {
  name: 'gamel',
  components: {
    level
  },
  data: ()=>{
    return {
      levcont: 1,
      win: false,
<<<<<<< HEAD
      level1:{
=======
      level:{
>>>>>>> 6fceab0166f8e65e21717c80dfc726621ae03014

      },
      levels: [
        {
          walls: [],

        }
      ]
    }
  },
  methods: {
    win: function(){
      level++
    },
  },
}


</script>
