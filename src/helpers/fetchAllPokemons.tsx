import { pokemonApi } from "../api/pokemonApi"
import {FetchAllPokemonsResponse, Pokemon, SmallPokemons} from '../interfaces/fetchAllPokemonsResponse'; 
export const fetchAllPokemons =  async (): Promise<Pokemon[]> => {
        
    const resp = await pokemonApi.get<FetchAllPokemonsResponse>('/pokemon?limit=1500')
    const smallPokemonsList = resp.data.results;
    return transformSmallPokemonsResponse( smallPokemonsList )
}

const transformSmallPokemonsResponse = (smallPokemonsList:SmallPokemons[]): Pokemon[] =>{

    const pokemonArr: Pokemon[] = smallPokemonsList.map( poke =>{
        const pokeArr = poke.url.split('/');
        const id = pokeArr[6];
        const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return{
            id,
            name:poke.name,
            pic

        }
    })
    return pokemonArr;
}
