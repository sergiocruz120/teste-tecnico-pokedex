export  interface IPokemon {
  id: number;
  name: string;
  url: string;
}

export interface IPokemonState {
  pokemons: IPokemon[];
  loading: boolean;
  baseUrl: string;
  count: number;
  previous: string | null;
  next: string | null;
  limit: number;
  offset: number
}

