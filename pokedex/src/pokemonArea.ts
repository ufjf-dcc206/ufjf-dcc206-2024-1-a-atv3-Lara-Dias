import {getPokemon} from "./pokemonAPI";

class PokemonArea extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }
    async setPokemon(count:number){
        const pokemons = await getPokemon(count);
        this.render(pokemons);
    }

    private render(pokemons: Array<{nome:string; tipo:string, imagem:string}>){
        this.shadowRoot!.innerHTML=`
            <div class="pokemon-area">
                <div class="title">Pokémons</div>
                <div class="cards">
                    ${pokemons.map(pokemon => `
                        <div class="pokemon-card">
                            <img src="${pokemon.imagem}" alt"${pokemon.nome}"/>
                            <p>Nome: ${pokemon.nome}</p>
                            <p>Tipo: ${pokemon.tipo}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('pokemon-area',PokemonArea);