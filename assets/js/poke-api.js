
//separando a complexidade do http chamando os dados da api por esse arquivo.
const pokeApi = {}

function convertPokeApiDetail(pokeDetail) {

        const pokemon = new Pokemon()

        pokemon.id = pokeDetail.id
        pokemon.name = pokeDetail.name

        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
        const [type] = types
        pokemon.types = types
        pokemon.type = type

        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

        const abilities = pokeDetail.abilities.map((abilitiesName) => abilitiesName.ability.name)
        const [ability] = abilities
        pokemon.abilities = abilities
        pokemon.ability = ability

        const stats = pokeDetail.stats.map((statValue) => statValue.base_stat)
        const [baseStat] = stats
        pokemon.stats = stats
        pokemon.baseStat = baseStat

        const stat = pokeDetail.stats.map((statName) => statName.stat.name)
        const [nameStats] = stat
        pokemon.stat = stat
        pokemon.nameStats = nameStats 


        return pokemon
}


//chamando somente os pokemons details
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(convertPokeApiDetail)
}


//consultando os dados da api
pokeApi.getPokemons = (offSet = 0, limit = 5) => {
    //chamando a url da api.
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`
    
    //Chamando a api promesse/ buscando a lista de pokemons
    //convertendo chamada de pokemons em li e concatenando o resultado na pokemonList
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
}





/*
// convertendo o modelo do poke api para o nosso modelo no pokemon models
function convertPokeApiDetailToPokemon(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetails.id
    pokemon.name = pokeDetails.name

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

    //coletando da api as informações de detalhes.
    const abilities = pokeDetails.abilities.map((abilitieSlot) => abilitieSlot.ability.name)
    const [ability] = abilities
    

    pokemon.abilities = abilities
    pokemon.ability = ability


    //coletando da api as informações de detalhes.
    const moves = pokeDetails.moves.map((moveSlot) => moveSlot.move.name)
    const [move] = moves
     
    pokemon.moves = moves
    pokemon.move = move

    //retornando a variável para conseguir utilizar 
    return pokemon
}
 */