

//Convertendo o arquivo json em html 
function convertPokemonToLi(pokemon){
    return `
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
    `
}

//pegando a lista de pokemons do HTML pelo ID 
const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons()
    //criando função para chamar somente os dados necessários.
    .then((pokemons = []) => {

        //trabalhando com o .map / convertendo em LI
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML = newHtml
})
