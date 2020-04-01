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

        },
        {
          walls: ['1;5', '1;17', '2;5', '2;6', '3;6', '4;6', '5;6', '6;6', '7;6', '8;7', '8;8', '8;9', '9;9', '9;10', '10;11', '15;1' , '15;2' , '15;3', '15;4', '14;5', '13;6', '13;7', '13;8','13;10','13;11','16;6','17;6','16;3','17;5', '7;4','7;3','7;2','4;2','4;3','4;4','8;6','10;6','11;6', '5;12', '5;15', '7;11','7;16','8;12','8;13','8;14','8;15'],
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
