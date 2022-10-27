const input = document.querySelector('#input')
const delInput = document.querySelector('#delInput')
const delBtn = document.querySelector('#del-btn')
const upBtn = document.querySelector('#up-btn')
const addBtn = document.querySelector('#add-btn')
const searchBtn = document.querySelector('#search-btn')
const section = document.querySelector('#out')

searchBtn.addEventListener('click', searchPokemon);
delBtn.addEventListener('click', deletePokemon)
upBtn.addEventListener('click', updatePokemon)
addBtn.addEventListener('click', addPokemon)

let pokemonArray = [];

function searchPokemon (e) {
    e.preventDefault();
    if (!input.value) return "Invalid input"
    document.querySelectorAll('#out div').forEach(elem => elem.remove())
    fetch(`http://localhost:3000/pokemon/${input.value}`)
    .then(r => r.json())
    .then(data => {
        console.log(data)
        let card = document.createElement('div')
        card.className = 'pokemon'
        let title = document.createElement('h3')
        title.textContent = data.name
        let img = document.createElement('img');
        img.src = data.img;
        let typeTitle = document.createElement('p')
        typeTitle.textContent = "Type"
        let typeList = document.createElement('ul') 
        data.type.forEach(elem => {
            let type = document.createElement('li')
            type.textContent = elem
            typeList.append(type)
        })
        card.append(title)
        card.append(img)
        card.append(typeTitle)
        card.append(typeList)
        section.append(card)
    })

}

function deletePokemon (e) {
    e.preventDefault();
    console.log(input.value);
    const pokemonToDelete = pokemonArray.find(obj => obj.name === input.value);
    console.log(pokemonArray);
    if(!pokemonToDelete) return "Pokemon doesn't exist"
    const index = pokemonArray.indexOf(pokemonToDelete);
    pokemonArray.splice(index, 1);
    console.log("Testing")
    displayAll();

}

function updatePokemon (e) {
    e.preventDefault();
    console.log(input.value);
    const pokemonToChange = pokemonArray.find(obj => obj.name === input.value);
    console.log(pokemonToChange);
    if(!pokemonToChange) console.log("Pokemon doesn't exist")
    const index = pokemonArray.indexOf(pokemonToChange);
    pokemonArray[index] = "Updated"
    console.log(pokemonToChange);
    displayAll();
}

function addPokemon (e) {
    e.preventDefault();
    const newPokemon = {
        name: input.value,
        img: "image.png",
        type: ["N/A"]
    }

    pokemonArray.push(newPokemon);
    displayAll();
}

function getPokemon () {
    fetch('http://localhost:3000/api/pokemon')
    .then(res => res.json())
    .then(data => {
        pokemonArray = data; 
        displayAll()
    })

    return pokemonArray
}

function displayAll() {
    document.querySelectorAll('#out div').forEach(elem => elem.remove())
    pokemonArray.forEach(element => {
        let card = document.createElement('div')
        card.className = 'pokemon'
        let title = document.createElement('h3')
        title.textContent = element.name
        let img = document.createElement('img');
        img.src = element.img;
        let typeTitle = document.createElement('p')
        typeTitle.textContent = "Type"
        let typeList = document.createElement('ul') 
        element.type.forEach(elem => {
            let type = document.createElement('li')
            type.textContent = elem
            typeList.append(type)
        })
        card.append(title)
        card.append(img)
        card.append(typeTitle)
        card.append(typeList)
        section.append(card)
    });

    console.log(pokemonArray)
}

getPokemon();
