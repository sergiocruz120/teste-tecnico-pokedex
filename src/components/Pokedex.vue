<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { IPokemon } from "../interface/PokemonDef";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{ data: IPokemon; }>();

const image = ref<string>();
const defaultImage = ref<string>('@/assets/images/default.png');

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = defaultImage.value; // Define a imagem padrão
};

const navigateToDetail = () => {
  router.push(`/pokedex/${props.data.id}`);
};

const getImage = async () => {
  try {
    const response = await axios.get(props.data.url);

    const sprites = response.data.sprites;
    image.value = sprites.front_default || sprites.front_shiny;
  } catch (error) {
    console.log(error);
  }
};

const getFirstName = computed(() => {
  const cleanedName = props.data.name.replace("-", " ").trim();
  return cleanedName.split(" ")[0];
});

onMounted(async () => {
  await getImage();
});

watch(() => props.data.id, async (newId: number, oldId: number) => {
  if (newId !== oldId) {
    await getImage();
  }
});
</script>

<template>
  <div class="box" @click="navigateToDetail">
    <div class="image">
      <img
      :src="image"
      alt="pokemon"
      @error="handleImageError"
    />
    </div>
    
    <div class="description">
      <span class="pokemon-name">{{ getFirstName }}</span>
      <span class="pokemon-number">N° {{ data.id }}</span>
    </div>
  </div>
</template>

<style scoped>
/* Estiliza o container que contém a imagem e a descrição do Pokémon */
.box {
  position: relative;
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
  position: absolute;
  margin-right: 95px;
  font-family: "Pokemon Solid", sans-serif;
  font-size: 16px;
  color: #ffcb05;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #020aff, #0f1017);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: capitalize;
}


.pokemon-number {
  position: absolute;
  margin-left: 100px;
  font-size: 15px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  color: red;
  border: solid 1px red;
  border-radius: 5px;
  padding: 5px;
  
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estiliza a imagem do Pokémon */
img {
  padding: 10px;
  height: 175px;
  width: 175px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.95)  0px 25px 20px -28px;
}

/* Estiliza o container que contém a descrição do Pokémon */
.description {
  position: absolute;
  bottom: -15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: linear-gradient(45deg, #aac2fc, #ffffff);
  border-radius: 5px;
  height: 50px;
  width: 200px;
  margin-left: 15px;
}
</style>
