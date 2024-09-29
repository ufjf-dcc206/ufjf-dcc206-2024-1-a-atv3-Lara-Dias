import {getPokemon} from "./pokemonAPI";

class PokemonArea extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }
    async setPokemon(count:number){
        const pokemons = await getPokemon(count);
        this.#render(pokemons);
    }

    #render(pokemons: Array<{nome:string; tipo:string, imagem:string}>){
        this.shadowRoot!.innerHTML=`
            <style>
            .pokemon-area {
                padding: 10px;
            }

            .title {
                font-size: 1.5em;
                margin-bottom: 10px;
            }

            .cards {
                display: flex;              /* Flexbox para alinhar os filhos em linha */
                flex-wrap: wrap;           /* Permite que os itens quebrem a linha */
            }

            .pokemon-card {
                border: 1px solid #172129;
                border-radius: 8px;
                padding:5px;
                margin-right: 30px;         
                background-color: #dfe8f0;
                box-shadow: #51718a;
                text-align: center;
            }

            .pokemon-card img {
                width: 250;               
                height: 250px;             
            }

            .pokemon-card .pokemon-nome {
                font-weight: bold;
                margin-bottom: 4px;
            }

            .pokemon-card .pokemon-tipo {
                font-size: 0.9em;
                color: #666;
            }
            </style>
            <div class="pokemon-area">
                <div class="title">Pokémons</div>
                <div class="cards">
                    ${pokemons.map(pokemon => `
                        <div class="pokemon-card">
                            <img src="${pokemon.imagem}" alt="${pokemon.nome}"/>
                            <p class="pokemon-nome">${pokemon.nome}</p>
                            <p class="pokemon-tipo">${pokemon.tipo}</p>
                     </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('pokemon-area',PokemonArea);