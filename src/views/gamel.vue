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
      level: 1,
      win: false,
      level1:{

      },
    }
  },
  methods: {
    win: function(){
      level++
    },
  },
}


</script>
