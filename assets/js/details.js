//pegando a lista de pokemons do HTML pelo ID
const pokemonList = document.getElementById("pokemonList")


const limit = 1
let offSet = 0


//Convertendo o arquivo json em html
//criando função para chamar somente os dados necessários.
//trabalhando com o .map / convertendo em LI
function loadPokemonItens(offSet, limit) {
  pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        pokemon => `
        <li class="pokemon-details ${pokemon.type}" >
            <span class="number-details">#${pokemon.number}</span>
            <span class="name-details">${pokemon.name}</span>

            

            <div class="poke-details">
                <ol class="types-details">
                    ${pokemon.types
                      .map(type => `
                        <li class="type ${type}">${type}</li>
                      `)
                      .join("")}
                      <div class="div-name-detail">
                        <span class="name-detail">${pokemon.ability}</span>
                      <div>
                </ol>
               
                <img src="${pokemon.photo}" 
                alt=${pokemon.name}>
        
            </div>

            
        </li>
        `
      )
      .join("")

    pokemonList.innerHTML += newHtml
  })
}

//chamando para carregar a pagina
loadPokemonItens(offSet, limit)




//criando regras para abrir os detalhes do pokemon

//openCard.addEventListener("click", () => {
//  console.log("clicou aqui")
//})

//window.onload = () => {
// window.location.href = "./assets/components/details/index.html"
//}
