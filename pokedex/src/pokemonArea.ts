import {getPokemon} from "./pokemonAPI";

class PokemonArea extends HTMLElement {
    areaVazia:HTMLElement;

    constructor(){
        super();
        this.attachShadow({mode:'open'});

        this.areaVazia = document.createElement('div');
        this.areaVazia.classList.add('area-vazia');
        this.areaVazia.innerText = 'Área de jogo vazia';
        this.shadowRoot!.appendChild(this.areaVazia);
    }
    async setPokemon(count:number){
        const pokemons = await getPokemon(count);
        this.#render(pokemons);
    }

    #render(pokemons: Array<{nome:string; tipo:string, imagem:string}>){
        this.shadowRoot!.innerHTML=`
            <style>
            .pokemon-area {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
            }

            .player-area {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .title {
               font-size: 1.5em;
                margin-bottom: 10px;
                text-align: center;
                font-family: 'Press Start 2P', cursive;
                color: #333;
            }

            .cards {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 15px;      
            }

            .pokemon-card {
                border-radius: 10px;
                padding:5px;
                margin-right: 30px;         
                background-color: #a7a7a74a;
                box-shadow: #51718a;
                text-align: center;
                cursor: pointer;
                transition: transform 0.2s, box-shadow 0.2s;
            }

            .pokemon-card img {
                width: 230px;               
                height: 230px;             
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
                <div class="cards"></div>
            </div>
        `;

        const cardsContainer = this.shadowRoot!.querySelector('.cards')!;

        pokemons.forEach(pokemon=>{
            const pokemonCard = document.createElement('pokemon-card');
            pokemonCard.setAttribute('nome',pokemon.nome);
            pokemonCard.setAttribute('imagem',pokemon.imagem);
            pokemonCard.setAttribute('tipos',pokemon.tipo);

            pokemonCard.addEventListener('pokemonSelecionado', (event: any) => {
                console.log('Pokémon selecionado:', event.detail.nome);
        
                // Atualiza a área vazia com as informações do Pokémon selecionado
                this.areaVazia.innerHTML = `
                  <img src="${event.detail.imagem}" alt="${event.detail.nome}">
                  <div>Nome: ${event.detail.nome}</div>
                  <div>Tipo: ${event.detail.tipos}</div>
                `;
            });
            cardsContainer.appendChild(pokemonCard);
        });
        this.shadowRoot!.appendChild(this.areaVazia);
    }
}

customElements.define('pokemon-area',PokemonArea);