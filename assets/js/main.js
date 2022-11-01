const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalDetail = document.getElementById('modal-detail')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-bs-toggle="modal" data-bs-target="#detailPokemon" onclick="detail('${pokemon.number}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
    
    
}

function convertPokemonToModal(pokemon) {
    
    return `
    <div class="modal-content ${pokemon.type}">
                <div class="modal-header" id="header-modal">
                    <section>
                        <button type="button" class="btn" data-bs-dismiss="modal"><i
                                class="bi bi-arrow-left"></i></button>
                    </section>
                    <section>
                        <h1 class="modal-title fs-5" id="detailPokemonLabel">${pokemon.name}</h1>
                        <ol id="pokemonModal" class="pokemons">
                            <li class="pokemon" id="listPokemon">
                                <span class="number">#${pokemon.number}</span>
                                <div class="detail">
                                    <ol class="types">
                                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                                        
                                    </ol>
                                    <img src="${pokemon.photo}"
                                    alt="${pokemon.name}">
                                </div>
                            </li>
                        </ol>
                    </section>
                </div>
                <div class="modal-body">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                           
                            <button class="nav-link active" id="nav-profile-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                                aria-selected="false">Status</button>
                            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact"
                                aria-selected="false">Moves</button>

                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        
                        <div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"
                            tabindex="0">
                            <div class="status">
                                <div>
                                    <label for="hp">HP </label>
                                    <div class="progress" style="height: 20px;">
                                        <div class="progress-bar" role="progressbar" aria-label="Example 20px high"
                                            style="width: ${pokemon.status[0]}%;" aria-valuenow="${pokemon.status[0]}" aria-valuemin="0" aria-valuemax="100"
                                            id="hp"></div>
                                    </div>
                                    <div>
                                        <label for="attack">Attack </label>
                                        <div class="progress" style="height: 20px;">
                                            <div class="progress-bar" role="progressbar" aria-label="Example 20px high"
                                                style="width: ${pokemon.status[1]}%;" aria-valuenow="${pokemon.status[1]}" aria-valuemin="0"
                                                aria-valuemax="100" id="attack"></div>
                                        </div>
                                        <div>
                                            <label for="defense">Defense </label>
                                            <div class="progress" style="height: 20px;">
                                                <div class="progress-bar" role="progressbar"
                                                    aria-label="Example 20px high" style="width: ${pokemon.status[2]}%;"
                                                    aria-valuenow="${pokemon.status[2]}" aria-valuemin="0" aria-valuemax="100"
                                                    id="defense"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <label for="special-attack">Sp.Atk </label>
                                            <div class="progress" style="height: 20px;">
                                                <div class="progress-bar" role="progressbar"
                                                    aria-label="Example 20px high" style="width: ${pokemon.status[3]}%;"
                                                    aria-valuenow="${pokemon.status[3]}" aria-valuemin="0" aria-valuemax="100"
                                                    id="special-attack"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <label for="special-defense">Sp.Def </label>
                                            <div class="progress" style="height: 20px;">
                                                <div class="progress-bar" role="progressbar"
                                                    aria-label="Example 20px high" style="width: ${pokemon.status[4]}%;"
                                                    aria-valuenow="${pokemon.status[4]}" aria-valuemin="0" aria-valuemax="100"
                                                    id="special-defense"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <label for="speed">Speed</label>
                                            <div class="progress" style="height: 20px;">
                                                <div class="progress-bar" role="progressbar"
                                                    aria-label="Example 20px high" style="width: ${pokemon.status[5]}%;"
                                                    aria-valuenow="${pokemon.status[5]}" aria-valuemin="0" aria-valuemax="100"
                                                    id="speed"></div>
                                            </div>
                                        </div>
                                        <div class="mt-3">
                                            <label for="abilities" class="fs-5">Abilities: </label>
                                            ${pokemon.abilities.map((ability) =>`<span id="abilities"class="fs-6">${ability}</span>`).join()}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <div class="tab-pane fade" id="nav-contact" role="tabpanel"
                                aria-labelledby="nav-contact-tab" tabindex="0">
                                <div class="mt-3">
                                <ol class="moves">
                                ${pokemon.moves.map((move) =>`<li class="move">${move}</li>`).join('')}
                                </ol>
                            </div>
                            </div>
                </div>
    `

}

function detail(pokemonNumber) {
    pokeApi.getPokemon(pokemonNumber).then((pokemons)=>{
        const html = convertPokemonToModal(pokemons)
        modalDetail.innerHTML = html
        
    })
    
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})