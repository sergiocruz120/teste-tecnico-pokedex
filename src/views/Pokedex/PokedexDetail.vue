<script setup lang="ts">
import Card from "../../components/Card.vue";
import BaseStat from "../../components/BaseStat.vue";
import { usePokedexStore } from "../../store/pokedexStore";
import { computed, onMounted, ref } from "vue";
import { IPokemonDetail } from "../../interface/PokemonDef";
import { useRouter } from "vue-router";
import axios from "axios"; // Adicionei axios para fazer requisições à PokeAPI

const router = useRouter();
const pokedexStore = usePokedexStore();

const pokemon = ref<IPokemonDetail>({
  id: 0,
  name: "",
  base_experience: 0,
  height: 0,
  weight: 0,
  abilities: [],
  forms: [],
  game_indices: [],
  moves: [],
  species: {
    name: "",
    url: ""
  },
  sprites: {
    back_default: null,
    back_female: null,
    back_shiny: null,
    back_shiny_female: null,
    front_default: null,
    front_female: null,
    front_shiny: null,
    front_shiny_female: null
  },
  stats: [],
  types: [],
  cries: {
    latest: "",
    legacy: ""
  },
  is_default: false,
  location_area_encounters: "",
  order: 0,
  past_abilities: [],
  past_types: [],
  held_items: []
});

const evolutions = ref<string[]>([]); // Armazenar as imagens das evoluções

const getPokemon = async () => {
  const id = router.currentRoute.value.params.id;
  await pokedexStore.getPokemon(Number(id));
  const pokemonData = pokedexStore.pokemon as IPokemonDetail;
  pokemon.value = pokemonData;

  // Buscando a cadeia de evolução
  const speciesUrl = pokemonData.species.url;
  const speciesResponse = await axios.get(speciesUrl);
  const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

  const evolutionChainResponse = await axios.get(evolutionChainUrl);
  const chain = evolutionChainResponse.data.chain;

  // Extraindo as imagens das evoluções
  const evolutionImages = [];
  let currentChain = chain;

  while (currentChain) {
    const speciesId = currentChain.species.url.split("/").slice(-2, -1)[0];
    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${speciesId}`);
    const sprite = pokemonResponse.data.sprites.front_default;
    if (sprite) {
      evolutionImages.push(sprite);
    }
    currentChain = currentChain.evolves_to[0];
  }

  evolutions.value = evolutionImages;
};

onMounted(() => {
  getPokemon();
});

const image = computed(() => {
  return pokemon.value.sprites.front_default || pokemon.value.sprites.front_shiny;
});
</script>

<template>
  <Card class="card-title">
    <h1>{{ pokemon.name }}</h1>
  </Card>

  <Card class="card-pokemon">
    <div class="pokemon-card">
    <Card class="pokemon-image">
      <img v-if="image" :src="image" alt="pokemon">
    </Card>

    <Card class="pokemon-stats">
      <BaseStat name="HP" :baseStat="pokemon.stats[0]?.base_stat" />
      <BaseStat name="Attack" :baseStat="pokemon.stats[1]?.base_stat" />
      <BaseStat name="Defense" :baseStat="pokemon.stats[2]?.base_stat" />
      <BaseStat name="Special Attack" :baseStat="pokemon.stats[3]?.base_stat" />
      <BaseStat name="Special Defense" :baseStat="pokemon.stats[4]?.base_stat" />
      <BaseStat name="Speed" :baseStat="pokemon.stats[5]?.base_stat" />
    </Card>
  </div>

  <div class="pokemon-evolutions">
    <Card v-for="(evolution, index) in evolutions" :key="index" class="evolution-card">
      <img :src="evolution" alt="pokemon evolution">
    </Card>
  </div>
  </Card>
  
</template>

<style scoped>
.card-pokemon {
  border: 2px solid #4a90e2;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
}

.card-title {
  display: flex;
  justify-content: center;
  font-family: "Pokemon Solid", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  background: linear-gradient(90deg, #ffcb05, #ff4b2b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 10px 20px;
  border-radius: 10px;
  border: 2px solid #4a90e2;
  background-color: white;
  text-transform: capitalize;
}

.pokemon-card {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.pokemon-image,
.pokemon-info,
.pokemon-stats {
  flex: 1;
  margin: 10px;
  max-width: 400px;
  width: 100%;
}

.pokemon-image {
  position: relative;
  background-color: rgb(90, 90, 188);
  border-radius: 10px;
}

.pokemon-image img {
  max-width: 100%;
  height: auto;
}

.pokemon-name {
  text-align: center;
  color: rgb(34, 121, 147);
  border-radius: 10px;
  padding: 10px;
}

.pokemon-stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  height: 376px;
  border-radius: 10px;
  background-color: rgb(194, 194, 194);
}

.pokemon-evolutions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: rgb(34, 121, 147);
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
}

.evolution-card,
img {
  display: flex;
  justify-content: center;
  border-radius: 10px;
  height: 280px;
  width: 100%;
  flex-grow: 1;
  max-width: 300px;
  background-color: rgb(90, 90, 188);
}

@media (max-width: 768px) {
  .pokemon-card {
    flex-direction: column;
  }

  .pokemon-evolutions {
    flex-direction: column;
  }

  .evolution-card {
    max-width: 400px;
  }

  .pokemon-image {
    max-width: 400px;
  }
}
</style>