let body = document.querySelector("body")

let characters = document.querySelectorAll(".character-card")

let characterIds = [370, 216, 522, 461, 386, 576, 60, 165, 457, 538, 546, 427, 514, 558, 309, 214, 181, 678]

let baseURL = 'https://www.superheroapi.com/api.php/10108022590356420/'

let cards

let grid = document.querySelector("#character-grid")

let modalImg = document.querySelector(".modal-img")

let charName = document.querySelector("#char-name")

let realName = document.querySelector("#real-name")

let firstApp = document.querySelector("#first-app")

let akaList = document.querySelector("#aka")

let statsList = document.querySelector("#stats")

/* let id = 370
console.log(`${baseURL}${id}`) */

//let cards = document.querySelectorAll(".character-card")

//FUNCTION TO SET CARD BACKGROUNDS AND CHARACTER NAMES

function setCard(baseURL, ids){

    characterIds.forEach((n) => {

        fetch(`${baseURL}${n}/image`)
            .then(res => res.json())
            .then(res =>{
                //console.log(res.url)
                let card = document.createElement("div")
                let name = document.createElement("h3")
                name.classList.add("char-card-name")
                card.classList.add("character-card")
                card.dataset.id = n
                name.innerText = res.name
                let image = res.url
                //console.log(image)
                card.style.backgroundImage = `url(${image})`
                //card.appendChild(name)
                card.appendChild(name)
                grid.appendChild(card)
                card.addEventListener("click", popModal)
            })
            .then(res => {
                cards = document.querySelectorAll(".character-card")
                console.log(cards)
            })
            .catch(err =>{
                console.log(`oops!: ${err}`)
            })
    }) 
   
}

setCard(baseURL, characterIds)

document.addEventListener("mouseover", (e) =>{
    if(e.target.className == "character-card" || (e.target.className == "char-card-name")){
        e.target.style.color = "#ffffff"
        e.target.firstElementChild.style.color = "#ffffff"
    }
})

document.addEventListener("mouseout", (e) =>{
    if(e.target.className == "character-card"){
        //e.target.classList.add("highlighted")
        e.target.firstElementChild.style.color = "#000000"
    }
})

function modalDeets(e, charId, image){
    fetch(`${baseURL}${charId}/biography`)
        .then(res => res.json())
        .then(res => {
        
            let aliases = res.aliases
            //console.log(aliases)

            //console.log(e.target.style.backgroundImage)
            modalImg.style.backgroundImage = image
            charName.innerHTML = res.name
            realName.innerHTML = `Real Name: ${res["full-name"]}`
            firstApp.innerHTML = `First Appearance: ${res["first-appearance"]}`

            aliases.forEach(n => {
                let item = document.createElement("li")
                item.innerHTML = n
                akaList.appendChild(item)
            })
        })

        fetch(`${baseURL}${charId}/powerstats`)
        .then(res => res.json())
        .then(res => {
            //console.log(res)

            
            let stats = [`Combat: ${res.combat}`,`Intelligence ${res.intelligence}`,`Power: ${res.power}`,`Speed: ${res.speed}`,`Strength ${res.strength}`]

            //let statsList = document.querySelector("#stats")

            stats.forEach(n =>{
                let item = document.createElement("li")
                item.innerHTML = n
                statsList.appendChild(item)
            })
        })

        fetch(`${baseURL}${charId}/appearance`)
        .then(res => res.json())
        .then(res => {
            //console.log(res)
            let height = res.height
            let weight = res.weight
            let eye = res["eye-color"]
            let hair = res["hair-color"]

            let deets = document.querySelector("#deets")
            
            deets.innerHTML = `Height: ${height}  |  Weight: ${weight}  |  Hair Color: ${hair}  |  Eye Color: ${eye}`
        })
        .then(res => {
            document.addEventListener("click", hideModal)

            cards.forEach(n =>{
                n.removeEventListener("click", popModal)
                
            })
        })
        .then(res => {
            modal.style.display = "block"
        })
        .then((res) =>{
            
            window.setTimeout( () =>{
            modal.style.opacity = "1"
        }, 100)

        })

        
}


function popModal(e) {
    e.preventDefault()

    document.removeEventListener("click", hideModal)

    let modal = document.querySelector("#modal")

   //console.log(e)
   if (e.target.className == "character-card" ){
    
    let charId = e.target.dataset.id 
    
    let image = e.target.style.backgroundImage
    
    modalDeets(e, charId, image)
   }
   else if (e.target.parentElement.className == "character-card"){

    let charId = e.target.parentElement.dataset.id
    
    let image = e.target.parentElement.style.backgroundImage
    
    modalDeets(e, charId, image)
    }
}


function hideModal(e){
    e.preventDefault()

    if(e.target.closest("#character-grid") || e.target == document.querySelector("#close-button")){
        console.log("Removed")
        
            modal.style.opacity = "0"    

        window.setTimeout( () =>{
            modal.style.display = "none"
            akaList.innerHTML = ""
            statsList.innerHTML = ""
        }, 600)

        

        document.removeEventListener("click", hideModal)
        
        
        cards.forEach(n =>{
            n.addEventListener("click", popModal)
        })
    }
}



