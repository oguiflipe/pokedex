
//separando a complexidade do http chamando os dados da api por esse arquivo.
const pokeApi = {}

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

    //retornando a variável para conseguir utilizar 
    return pokemon
}



//chamando somente os pokemons details
pokeApi.getPokemonsDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

//consultando os dados da api
pokeApi.getPokemons = (offSet = 0, limit = 5) => {
    //chamando a url da api.
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`
    
    //Chamando a api promesse/ buscando a lista de pokemons
    //convertendo chamada de pokemons em li e concatenando o resultado na pokemonList
    return fetch(url)
        //convertendo o arquivo em arquivo json.
        .then((response) => response.json())

        //puxando somente os resultados do arquivo json.
        .then((jsonBody) => jsonBody.results)

        //Transformando em busca de detalhe
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
        
        //realizando as requisições dos detalhes, esperando todos os detalhes
        .then((detailRequests) => Promise.all(detailRequests))

        //com a informação na mão após terminar
        .then((pokemonsDetails) => pokemonsDetails)
}



