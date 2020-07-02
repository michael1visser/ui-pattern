let characters = document.querySelectorAll(".character-card")

let characterIds = [370, 216, 522, 461, 286, 576, 60, 165, 457, 538, 546, 427, 514, 558, 309, 214, 181, 678, 204, 405]

let baseURL = 'https://www.superheroapi.com/api.php/10108022590356420/'

let grid = document.querySelector("#character-grid")
/* let id = 370
console.log(`${baseURL}${id}`) */

//let cards = document.querySelectorAll(".character-card")

//FUNCTION TO SET CARD BACKGROUNDS AND CHARACTER NAMES

function setCard(baseURL, ids){

    characterIds.forEach((n,i) => {

        fetch(`${baseURL}${characterIds[i]}/image`)
            .then(res => res.json())
            .then(res =>{
                //console.log(res.url)
                let card =document.createElement("div")
                card.classList.add("character-card")
                card.innerText = res.name
                let image = res.url
                console.log(image)
                card.style.backgroundImage = `url(${image})`
                grid.appendChild(card)
                
            })
            .catch(err =>{
                console.log(`oops!: ${err}`)
            })
    }) 
}

setCard(baseURL, characterIds)



//let image = "https://www.superherodb.com/pictures2/portraits/10/100/731.jpg"

