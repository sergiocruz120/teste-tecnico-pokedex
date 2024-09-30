<script setup lang="ts">
import Pokedex from "../../components/Pokedex.vue";
import Card from "../../components/Card.vue";
import { IPokemonState } from "../../interface/PokemonDef";
import { usePokedexStore } from "../../store/pokedexStore";
import { onMounted, ref, computed } from "vue";

// Store do Pokedex
const pokedexStore = usePokedexStore();

// Estado inicial dos dados do Pokémon
const pokemonData = ref<IPokemonState>({
  pokemons: [],
  loading: false,
  baseUrl: "",
  count: 0,
  previous: null,
  next: null,
  limit: 0,
  offset: 0,
});

// Função para buscar os Pokémons
const getPokemons = async (url: string | null = null) => {
  await pokedexStore.getPokemons(url);
  pokemonData.value = pokedexStore;
  window.scrollTo(0, 0);
};

// Chama a função ao montar o componente
onMounted(getPokemons);

// Computed para exibir o intervalo de Pokémons atuais
const paginationRange = computed(() => {
  const start = pokemonData.value.offset + 1;
  const end = Math.min(pokemonData.value.offset + pokemonData.value.limit, pokemonData.value.count);
  return `${start} a ${end} de ${pokemonData.value.count}`;
});
</script>

<template>
  <Card class="card-title">
    <h1>PokéList</h1>
  </Card>

  <Card>
    <div class="pokemons">
      <!-- Itera sobre os Pokémons e exibe o componente Pokedex -->
      <div v-for="(pokemon, index) in pokemonData.pokemons" :key="index">
        <Pokedex :data="pokemon" :id="index + 1" />
      </div>
    </div>

    <!-- Navegação de paginação -->
    <div class="mt-4 d-flex justify-content-center">
      <nav aria-label="Navegação de página">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !pokemonData.previous }">
            <a
              @click.prevent="getPokemons(pokemonData.previous)"
              class="page-link"
              href="#"
              >Anterior</a
            >
          </li>
          <li class="page-item">
            <span class="page-link">{{ paginationRange }}</span>
          </li>
          <li class="page-item" :class="{ disabled: !pokemonData.next }">
            <a
              @click.prevent="getPokemons(pokemonData.next)"
              class="page-link"
              href="#"
              >Próximo</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </Card>
</template>

<style scoped>
.card-title {
  display: flex;
  justify-content: center;
  font-family: "Pokemon Solid", sans-serif;
  font-size: 36px;
  color: #4a90e2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  background: linear-gradient(90deg, #ffcb05, #ff4b2b);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: center;
  margin: 20px 0;
  border: 2px solid #4a90e2;
  transition: transform 0.3s ease;
}

.pokemons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>
