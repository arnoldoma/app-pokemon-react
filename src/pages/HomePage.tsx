import { ChangeEvent, useState } from "react";
import { Loading } from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon"
import { Pokemon } from "../interfaces/fetchAllPokemonsResponse";

export const HomePage = () => {
    let numPage = 10;
    const { isLoading, pokemons } = usePokemon();
    const [currntPage, setCurrntPage] = useState(0);
    const [search, setSearch] = useState('')

    const filteredPokemons = (): Pokemon[] => {
        // Si no hay nada en el search
        if (search.length === 0)
            return pokemons.slice(currntPage, currntPage + numPage)

        // Si hay algo escrito
        const filtered = pokemons.filter(poke => poke.name.includes(search));
        return filtered.slice(currntPage, currntPage + numPage);
    }

    const onSearchChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setCurrntPage(0);
        setSearch(target.value)
    }
    const prevPage = () => {
        if (currntPage + numPage === numPage) {
            setCurrntPage(0)
        } else {
            setCurrntPage(currntPage - numPage)
        }

    }

    const nextPage = () => {
        if (pokemons.filter(poke => poke.name.includes(search)).length > currntPage + numPage)
            setCurrntPage(currntPage + numPage)
        console.log(currntPage, numPage)
        console.log(currntPage)

    }

    return (
        <div className="container mt-5">
            <h1>Lista Pokemones</h1>
            <hr />
            <input
                className="mb-2 form-control"
                placeholder="Buscar pokemon"
                type="text"
                value={search}
                onChange={onSearchChange}
            />
            <hr />
            <button onClick={prevPage} className="btn btn-danger">Anterior</button>
            <button onClick={nextPage} className="btn btn-danger mx-2">Siguiente</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPokemons().map(poke => (
                            <tr key={poke.id}>
                                <td>{poke.id} </td>
                                <td>{poke.name}</td>
                                <td>
                                    <img
                                        src={poke.pic}
                                        alt={poke.name}
                                        style={{ height: 50 }}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                isLoading && <Loading />
            }
        </div>
    )
}
