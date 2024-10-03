<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ baseStat: number; name: string }>();

const maxStat = 255; // Valor máximo da estatística

const percentage = computed(() => {
  return Math.min((props.baseStat / maxStat) * 100, 100); // Calcula a porcentagem com base no valor máximo
});
</script>

<template>
  <div>
    <h6>{{ name }}</h6> <!-- Exibe o nome da estatística -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: percentage + '%' }">
        <span>{{ baseStat }}</span> <!-- Exibe o valor da estatística dentro da barra -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  margin-top: 5px;
}

.progress-fill {
  display: flex;
  align-items: center;
  justify-content: center;  
  height: 100%;
  background-color: #4caf50;
  transition: width 0.2s ease-in-out;
  border-radius: 5px;
  font-size: 14px;
  color: white;
}
</style>
