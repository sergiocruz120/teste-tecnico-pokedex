<script setup lang="ts">
  import type { IPokemon } from "../interface/PokemonDef";
  
  defineProps<{ data: IPokemon, id: number }>();
</script>

<template>
  <div class="box">
    <img
      :src="data.url"
      height="150px"
      width="150px"
      alt=""
    />
    <div class="description">
      <p class="pokemon-name">{{ data.name }}</p>
      <p class="pokemon-number">N° {{ id }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Estiliza o container da imagem e da descrição do Pokémon */
.box {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  height: 230px;
  width: 230px;
  margin: 15px;
  border-radius: 10px;
  background: linear-gradient(45deg, #6890f0, #1e3a8a);
  transition: transform 0.5s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

/* Estiliza o container ao passar o mouse */
.box:hover {
  transform: scale(1.1);
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

/* Estilização para o nome do Pokémon */
.pokemon-name {
  font-family: "Pokemon Solid", sans-serif;
  font-size: 18px;
  color: #ffcb05;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  background: linear-gradient(90deg, #ffcc02, #0f1017);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.3s ease;
}

/* Estiliza o texto dos parágrafos da descrição (nome e número do Pokémon) */
.pokemon-number {
  font-size: 15px;
  margin-left: 5px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: red;
}

/* Estiliza a imagem do Pokémon */
img {
  margin-left: 40px;
  margin-top: 10px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}

/* Estiliza o container que contém a descrição do Pokémon */
.description {
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
</style>
