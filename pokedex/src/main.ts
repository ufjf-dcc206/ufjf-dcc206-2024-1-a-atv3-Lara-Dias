import './style.css';
import { PokemonArea } from './pokemonArea';
import './pokemonCard.ts';

async function iniciar() {
    const app = document.getElementById('app')!;
    app.innerHTML = '';

    const pokemonArea = new PokemonArea();
    await pokemonArea.setPokemon(10); 
    console.log("Área de Pokémon criada:", pokemonArea);

    app.appendChild(pokemonArea);
}

iniciar();
