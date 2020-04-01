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
      level:{

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
