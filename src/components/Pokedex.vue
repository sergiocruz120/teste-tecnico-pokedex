<script setup lang="ts">
// import { ref } from 'vue'

defineProps<{ msg: string }>()

// const count = ref(0)

</script>

<template>
  <div class="imagem">
        <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png"  height="150px" width="150px" alt="">
        <div class="descricao">
          <p class="p1">Squirtle</p>
          <p class="n1">N° 007</p>
        </div>
    </div>

</template>

<style scoped>
.tela {
  display: flex;
  flex-wrap: wrap;
  color: #323232;
  font-size: 30px;
  height: 100%;
  /* margin-top: 50px; */
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  max-width: 1100px;
  margin-left: 90px;
}

.imagem {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  height: 230px;
  width: 230px;
  margin: 20px;
  border-radius: 10px;
  background: linear-gradient(45deg, #f5e642, #2b2b2b);
  background: linear-gradient(45deg, #f08030, #d32f2f);
  background: linear-gradient(45deg, #78c850, #4592c4);
  background: linear-gradient(45deg, #6890f0, #1e3a8a);
  transition: transform 0.5s ease, box-shadow 0.3s ease;
  cursor: pointer;

}

.imagem:hover {
  transform: scale(1.05);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.p1, .n1 {
  font-size: 15px;
  margin-left: 5px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: rgb(12, 12, 12);
}

img {
  margin-left: 40px;
  margin-top: 10px;
}

.descricao {
  display: flex;
  justify-content: space-around;
  background: linear-gradient(45deg, #aac2fc, #ffffff);
  border-radius: 5px;
  height: 45px;
  width: 200px;
  margin-left: 15px;
  margin-top: 35px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  align-items: center;
  padding-top: 20px;
}

.n1 {
  /* font-size: 20px;
  margin-left: 75px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
  color: rgb(215, 24, 24);
}
</style>
