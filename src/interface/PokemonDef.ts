export interface IPokemon {
  id: number;
  name: string;
  url: string;
}

export interface IPokemonDetail {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  abilities: Array<{
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }>;
  forms: Array<{ name: string; url: string }>;
  game_indices: Array<{
    game_index: number;
    version: { name: string; url: string };
  }>;
  moves: Array<{
    move: { name: string; url: string };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: { name: string; url: string };
      version_group: { name: string; url: string };
    }>;
  }>;
  species: { name: string; url: string };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }>;
  types: Array<{
    slot: number;
    type: { name: string; url: string };
  }>;
  cries: {
    latest: string;
    legacy: string;
  };
  is_default: boolean;
  location_area_encounters: string;
  order: number;
  past_abilities: Array<any>;
  past_types: Array<any>;
  held_items: Array<any>;
}

export interface IPokemonState {
  pokemons: IPokemon[];
  pokemon?: IPokemonDetail | null;
  loading: boolean;
  baseUrl: string;
  count: number;
  previous: string | null;
  next: string | null;
  limit: number;
  offset: number
}

