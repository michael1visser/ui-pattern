let characters = document.querySelectorAll(".character-card")

let characterIds = [370, 216, 522, 461, 286, 576, 60, 165, 457, 538, 546, 427, 514, 558, 309, 214]

let baseURL = 'https://www.superheroapi.com/api.php/10108022590356420/'

/* let id = 370
console.log(`${baseURL}${id}`) */

function getImage(baseURL, id){

fetch(`${baseURL}${id}/image`)
    .then(res => res.json())
    .then(res =>{
        console.log(res.url)
        //return res.url
        return "hi there"
        
    })
    .catch(err =>{
        console.log(`oops!: ${err}`)
    })
} 

let card1 = document.querySelector(".character-card")
let image = getImage(baseURL, 427)
console.log(image)
//let image = "https://www.superherodb.com/pictures2/portraits/10/100/731.jpg"
card1.style.backgroundImage = `url(${image})`
