class PokemonCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const nome = this.getAttribute('nome') || '';
      const imagem = this.getAttribute('imagem') || '';
      const tipos= this.getAttribute('tipos') || '';
  
      this.shadowRoot!.innerHTML = `
        <div class="pokemon-card">
          <img src="${imagem}" alt="${nome}">
          <div class="pokemon-nome">${nome}</div>
          <div class="pokemon-tipo">${tipos}</div>
        </div>
      `;

      const card = this.shadowRoot!.querySelector('.pokemon-card');
      if (card) {
        card.addEventListener('click', this.selecaoPokemon.bind(this) as EventListener);
        console.log("Ouvinte de clique registrado para:", nome);
      } else {
        console.log("Elemento .pokemon-card não encontrado!");
      }
    }

    selecaoPokemon() {
      const event = new CustomEvent('pokemonSelecionado', {
        detail: {
          nome: this.getAttribute('nome'),
          imagem: this.getAttribute('imagem'),
          tipos: this.getAttribute('tipos'),
        },
        bubbles: true,
        composed: true
      });
      console.log('Evento disparado:', event.detail); 
      this.dispatchEvent(event);
   }
}
  
customElements.define('pokemon-card', PokemonCard);
  