<script setup lang="ts">
import Pokedex from '../../components/Pokedex.vue'
import Card from '../../components/Card.vue'


</script>

<template>
   <Card>
    <h1>Home</h1>
   </Card>
     <Card>
         <div v-for="i in 20">
             <Pokedex msg="Pokedex" />
         </div>
     </Card>
</template>
  

  
  <style scoped>
  
  </style>
  