let pokemon1 = 'pikachu'
const fetch = require('node-fetch');

async function getEvolutionChains (num) {
    
    //evolution chains 123 456 789 101112 ...
    //to be used in pokemon array for put requests
    let urlEvolutionChains = `https://pokeapi.co/api/v2/evolution-chain/${num}/`
    let urlEvolutionChainsTest = `https://pokeapi.co/api/v2/evolution-chain/1/`
    const res = await fetch(urlEvolutionChainsTest);
    const data = res.json();

    return data;
}

async function getInfo (pokemon) {

    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;


    const res =  await fetch(url)
    const data = await res.json()
    let types = []
    data.types.forEach(elem => types.push(elem.type.name))


    const poke = {
        id: data.id,
        name: data.species.name,
        img: data.sprites.other['official-artwork'].front_default,
        type: types
    }

    return poke;
}


async function callPokemons (pokemon) {

    let url = `https://pokeapi.co/api/v2/pokemon`;
    const res =  await fetch(url)
    const data = await res.json()

    let nameList = []
    //console.log(data);
    data.results.forEach(elem => {
        //console.log(elem.name);
        getInfo(elem.name).then(result => {
            nameList.push(result)
        })}
        )

    //console.log(nameList)

    return nameList;
}


module.exports = { callPokemons, getInfo, getEvolutionChains }
