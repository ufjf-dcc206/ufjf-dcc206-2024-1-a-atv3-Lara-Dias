class PokemonCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const nome = this.getAttribute('nome');
      const imagem = this.getAttribute('imagem');
      const tipos= this.getAttribute('types');
  
      this.shadowRoot!.innerHTML = `
        <div class="pokemon-card">
          <img src="${imagem}" alt="${imagem}">
          <div class="pokemon-nome">${nome}</div>
          <div class="pokemon-tipo">${tipos}</div>
        </div>
      `;
    }
}
  
customElements.define('pokemon-card', PokemonCard);
  