export interface FetchAllPokemonsResponse {
    count:    number;
    next:     null;
    previous: null;
    results:  SmallPokemons[];
}

export interface SmallPokemons {
    name: string;
    url:  string;
}

export interface Pokemon {
    id: string;
    name: string;
    pic: string;
}
