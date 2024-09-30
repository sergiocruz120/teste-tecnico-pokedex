import { defineStore } from 'pinia';
import type { IPokemon, IPokemonState, } from '../interface/PokemonDef';
import axios from 'axios';

export const usePokedexStore = defineStore('myStore', {
  state: (): IPokemonState => ({
    pokemons: [],
    loading: false,
    baseUrl: 'https://pokeapi.co/api/v2',
    count: 0,
    previous: null,
    next: null,
    limit: 100,
    offset: 1200
  }),
  actions: {
    async getPokemons(url: string | null) {
      url = url || `${this.baseUrl}/pokemon?limit=${this.limit}&offset=${this.offset}`;
      const match = url.match(/offset=(\d+)/);
      this.offset = match ? parseInt(match[1]) : 0;


      const extractNumberFromURL = (url: string) => {
        const regex = /\/(\d+)\//; 
        const match = url.match(regex); 
        return match ? parseInt(match[1]) : null;
      }
          
      try {
        this.loading = true;
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        let pokemons = data.results;
        
        this.count = data.count;
        this.previous = data.previous;
        this.next = data.next;
        this.pokemons = pokemons.map((pokemon: IPokemon) => ({
          name: pokemon.name,
          url: pokemon.url,
          id: extractNumberFromURL(pokemon.url)
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
}});
