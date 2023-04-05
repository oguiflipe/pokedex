//pegando a lista de pokemons do HTML pelo ID 
const pokemonList = document.getElementById('pokemonList')

//puxando o botão para controlar a paginação.
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offSet = 0

//colocando limite no loading da pagina
const maxRecords = 900

//Convertendo o arquivo json em html
//criando função para chamar somente os dados necessários.
//trabalhando com o .map / convertendo em LI
function loadPokemonItens(offSet, limit){
    pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" >
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" 
                alt=${pokemon.name}>
            </div>
        </li>
        `).join('')

        pokemonList.innerHTML += newHtml
    })
}

//chamando para carregar a pagina
loadPokemonItens(offSet, limit)

//criando regras de paginação e remoção do botão
loadMoreButton.addEventListener('click', () => {
    offSet += limit

    const qtdRecordsPage = offSet + limit

    if(qtdRecordsPage >= maxRecords){
        const limit = maxRecords - offSet
        loadPokemonItens(offSet, limit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        
    } else{
        loadPokemonItens(offSet, limit)
    }
})






