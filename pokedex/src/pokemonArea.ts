import { getPokemon } from "./pokemonAPI";

export class PokemonArea extends HTMLElement {
    areaVaziaA: HTMLElement;
    areaVaziaB: HTMLElement;
    jogadorAtual: 'A' | 'B' = 'A';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.areaVaziaA = document.createElement('div');
        this.areaVaziaA.classList.add('area-vazia');
        this.areaVaziaA.innerText = 'Área de jogo vazia';
        
        this.areaVaziaB = document.createElement('div');
        this.areaVaziaB.classList.add('area-vazia');
        this.areaVaziaB.innerText = 'Área de jogo vazia';

        this.shadowRoot!.appendChild(this.areaVaziaA);
        this.shadowRoot!.appendChild(this.areaVaziaB);
    }

    async setPokemon(count: number) {
        const pokemons = await getPokemon(count);
        this.#render(pokemons);
    }

    #render(pokemons: Array<{ nome: string; tipo: string; imagem: string }>) {
        this.shadowRoot!.innerHTML = `
        <style>
            .pokemon-area {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                padding: 10px;
            }
            
            .player-area {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                margin: 0 20px;
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

            .area-vazia {
                width: 150px;
                height: 200px;
                border: 2px dashed #ccc;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                text-align: center;
                padding: 10px;
                background-color: #f9f9f9; 
                margin: 0 10px; 
            }

            .area-vazia img {
                max-width: 100%;
                height: auto;
                margin-bottom: 10px;
            }

            .area-vazia div {
                font-size: 16px;
                color: #333;
            }
        </style>

        <div class="player-area" id="areaA">
            <div class="title">Jogador A</div>
            <div class="cards"></div>
        </div>
        <div class="pokemon-area">
            <div class="area-vazia" id="area-vazia-a">Arena de jogo A</div>
            <div class="area-vazia" id="area-vazia-b">Arena de jogo B</div>
        </div>
        <div class="player-area" id="areaB">
            <div class="title">Jogador B</div>
            <div class="cards"></div>
        </div>
  
         
    `;

        const cardsA = this.shadowRoot!.querySelector('#areaA .cards') as HTMLElement;
        const cardsB = this.shadowRoot!.querySelector('#areaB .cards') as HTMLElement;
        this.atualizaPokemons(pokemons.slice(0, 5), cardsA, 'A');
        this.atualizaPokemons(pokemons.slice(5, 10), cardsB, 'B');
    }

    atualizaPokemons(pokemons: Array<{ nome: string; tipo: string; imagem: string }>, container: HTMLElement, jogador: 'A' | 'B') {
        pokemons.forEach(pokemon => {
            const pokemonCard = document.createElement('pokemon-card');
            pokemonCard.setAttribute('nome', pokemon.nome);
            pokemonCard.setAttribute('imagem', pokemon.imagem);
            pokemonCard.setAttribute('tipos', pokemon.tipo);
            pokemonCard.addEventListener('pokemonSelecionado', (event: any) => {
                console.log('Pokémon selecionado:', event.detail);
                
                if ((this.jogadorAtual === 'A' && jogador === 'A') || (this.jogadorAtual === 'B' && jogador === 'B')) {
                    this.atualizaAreaVazia(event.detail, jogador); 
                    this.jogadorAtual = this.jogadorAtual === 'A' ? 'B' : 'A';
                    console.log(`Agora é a vez do Jogador ${this.jogadorAtual}`);
                } else {
                    console.log(`Não é a vez do Jogador ${jogador}`);
                }
            });
            container.appendChild(pokemonCard);
        });
    }

    atualizaAreaVazia(pokemon: { nome: string; imagem: string; tipos: string }, jogador: 'A' | 'B') {
        const areaVazia = jogador === 'A'
        ? this.shadowRoot!.querySelector('.area-vazia') 
        : this.shadowRoot!.querySelectorAll('.area-vazia')[1];
        if(areaVazia){
            areaVazia.innerHTML = `
                <div>Nome: ${pokemon.nome}</div>
                <img src="${pokemon.imagem}" alt="${pokemon.nome}">
                <div>Tipo: ${pokemon.tipos}</div>
            `;
        }
    }
}

customElements.define('pokemon-area', PokemonArea);
