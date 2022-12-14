//buttons for left side
let buttonA = document.querySelector(".leftButton");
let padUp = document.querySelector("#verticalTop");
let padDown = document.querySelector("#verticalBottom");
let padLeft = document.querySelector("#horizontalLeft");
let padRight = document.querySelector("#horizontalRight");
let aButton = document.querySelector(".leftButton");

//buttons for right side
let selectButton = document.querySelector("#whiteSquare1");
let returnButton = document.querySelector("#whiteSquare2");
let leftArrow = document.querySelector("#blackRectangle1");
let rightArrow = document.querySelector("#blackRectangle2");

let enterButton = document.querySelector("#enterButton");
let upArrow = document.querySelector("#grid1");
let downArrow = document.querySelector("#grid6");

//Left Side Elements
let sprite = document.querySelector(".sprite");



//Right Screen Elements
let selector = document.querySelector("#rightSelector");

//Global Variables
let counter=1;
let currentPokemon = [];
let nationalDex = false;
let regionArr = ['Kanto','Johto','Hoenn','Sinnoh','Unova','Kalos','Alola','Galar'];
//positional variables right screen
let leftSelector = document.querySelector("#leftScreenSelector");
let position = [0,1,2,3]; //scene manager
let currentPosition = position[0];
let verticalPosition = [0,1,2,3,4,5,6,7];
let currentVertical = verticalPosition[0];
let verticalHeight = 20;
//positional variables left screen
let leftPosition = [0,1,2]; //scene manager
let currentLeftPosition = leftPosition[0];
let spritePosition = 0;


//functions
const addItem = (element, choice)=>{
    let nationalDexList = document.querySelector(".nationalDexList");
    let regionList = document.querySelector(".regionList");
    let li = document.createElement("li");
    li.setAttribute('id',element.name);
    if (choice === 0){
        nationalDexList.appendChild(li);
        li.appendChild(document.createTextNode(`#${counter}:${element.name}`));
    }
    else if (choice === 1)
    {
        regionList.appendChild(li);
        li.appendChild(document.createTextNode(`#${counter}:${element.name}`));
    }
    counter++;
}
const hideNavBar = () => {
    document.querySelector(".searchButton").style.visibility = "hidden";
    document.querySelector(".nationalDex").style.visibility = "hidden";
    document.querySelector("#inputBar").style.visibility = "hidden";
    document.querySelector(".regionalDex").style.visibility = "hidden";
    selector.style.visibility = "hidden";
}
const showNavBar = () =>{
    document.querySelector(".searchButton").style.visibility = "visible";
    document.querySelector(".nationalDex").style.visibility = "visible";
    document.querySelector("#inputBar").style.visibility = "visible";
    document.querySelector(".regionalDex").style.visibility = "visible";
    selector.style.visibility = "visible";
}
const displayInfo = (masterData) => {
    let normalSprite = masterData.sprites.front_default;
    sprite.src = normalSprite;
    sprite.style.visibility = "visible";
    document.querySelector("#leftScreenSelector").style.visibility = "visible"
    document.querySelector(".stats").style.visibility = "visible"
    document.querySelector(".examine").style.visibility = "visible"
    document.querySelector(".displayType").style.visibility = "visible";
    if ( currentLeftPosition === 2){
        hideLeftScreen();
        resetLeftscreen();
        displayInfo(masterData);
    }
    if (masterData.types.length === 1)
    {
        
        let type = masterData.types[0].type.name
        document.querySelector(".displayType").innerText = `Type: ${type}`
    }
    else {
        let type1 = masterData.types[0].type.name
        let type2 = masterData.types[1].type.name
        document.querySelector(".displayType").innerText = `Type: \n ${type1} / ${type2}`
    }
    return masterData;
}
const getStats = (thisPokemon) => {
    let statValues = []; 
    for (let i=0; i<6;i++){
        statValues.push(thisPokemon.stats[i].base_stat)
    }
    return statValues;
}
const displayStats = (statArr) => {
    hideLeftScreen();
    document.querySelector(".sprite").style.visibility = "visible";
    document.querySelector(".sprite").style.height = "200px";
    document.querySelector(".sprite").style.width = "200px";
    document.querySelector(".sprite").style.transform = "translateX(0px)";
    document.querySelector(".statsDisplay").style.visibility = "visible";
    document.querySelector(".statsDisplay").innerText =
    `HP: ${statArr[0]}\n 
    Attack: ${statArr[1]}\n 
    Defense: ${statArr[2]}\n 
    Special Attack: ${statArr[3]}\n 
    Special Defense: ${statArr[4]}\n 
    Speed: ${statArr[5]}
    \n
    Press A to Return`
    currentLeftPosition = leftPosition[2];

    return currentLeftPosition;
}
const displayExamine = () => {
    currentLeftPosition = leftPosition[2]
    sprite.style.visibility = "visible";
    sprite.style.height = "220px";
    sprite.style.width = "220px";
    sprite.style.transform = "translateX(60px)";
    sprite.style.transform = "translateY(-10px)";
    document.querySelector(".dPadInstructions").style.visibility = "visible";
    document.querySelector(".returner").style.visibility = "visible";
}
const showRegionlDexList = () =>
{
    document.querySelector("#regionalDexList").style.visibility = "visible";
    document.querySelector("#rightViewScreen").style.overflowY = "scroll";
    selector.style.visibility = "visible";
    selector.style.transform = "translate(0px,20px)";
}
const showHomeScreen =() =>{
    document.querySelector(".regionList").style.visibility="hidden";
    document.querySelector("#rightViewScreen").style.overflowY = "hidden";
    document.querySelector(".nationalDexList").style.visibility = "hidden";
    document.querySelector(".nationalDexList").innerText = " ";
    document.querySelector("#regionalDexList").style.visibility = "hidden";
    showNavBar()
}

const hideLeftScreen = () => {
    document.querySelector(".examine").style.visibility = "hidden";
    document.querySelector(".displayType").style.visibility = "hidden";
    document.querySelector("#leftScreenSelector").style.visibility = "hidden";
    document.querySelector(".stats").style.visibility = "hidden";
    sprite.style.visibility = "hidden";
    document.querySelector(".statsDisplay").style.visibility = "hidden";
    document.querySelector(".dPadInstructions").style.visibility = "hidden";
    document.querySelector(".returner").style.visibility = "hidden";
}
const showRegionList = (position) => {
    
    document.querySelector("#regionalDexList").style.visibility = "hidden";
    document.querySelector("#rightSelector").style.visibility = "hidden";
    createRegionalDex(position);
}
const resetLeftscreen = () => {
    document.querySelector(".sprite").style.height = "150px";
    document.querySelector(".sprite").style.width = "150px";
    document.querySelector(".sprite").style.transform = "translateX(0px)";
    leftSelector.style.transform = "translateY(0px)";
    currentLeftPosition = leftPosition[0];
}


//API call functions
async function createRegionalDex (event) {
    fetch(`HTTPS://pokeapi.co/api/v2/pokemon/?limit=${(event[1]-event[0])}&offset=${event[0]}`)
    .then( response => {
        return response.json();
    })
    .then(response => {
        let regionalArr = response.results;
        for (let i=0; i<regionalArr.length; i++){
            addItem(regionalArr[i], 1);
        }
        document.querySelector(".regionList").style.visibility="visible";
    })
    .catch(error => {
        console.log("failure", error);
    })
}
async function showNationalDex(event) {
    fetch(`HTTPS://pokeapi.co/api/v2/pokemon/?limit=905`)
    .then( response => {
        return response.json();
    })
    .then(response => {
        let nationalDexArr = response.results;
        for (let i=0; i<nationalDexArr.length; i++){
            addItem(nationalDexArr[i], 0);
        }
    })
    .catch(error => {
        console.log("failure", error);
    })
}
async function getData(event) {
    
    let textInput = document.querySelector("#inputBar").value.toLowerCase();
    
    event.preventDefault();

    fetch(`https://pokeapi.co/api/v2/pokemon/${textInput}`)
    .then( response => {
        return response.json();
    })
    .then(response => {
        let bottomScreen = document.querySelector(".bottomScreen");
        bottomScreen.innerText = `\n ${response.name} \n id: ${response.id}`;
        document.querySelector("#inputBar").value = "";
        currentPokemon = displayInfo(response);
        return currentPokemon;
    })
    .catch(error => {
        let bottomScreen = document.querySelector(".bottomScreen");
        bottomScreen.innerText = `Not Found`;
        console.log("failure", error);
    })
    
}


//event Listeners
rightArrow.addEventListener("click", () => {
    if (currentPosition === position[0]){
        selector.style.transform = "translateX(78px)";
        currentPosition = position[1];
    }
    else if (currentPosition === position[1]){
        selector.style.transform = "translateX(225px)";
        currentPosition = position[2];
    }
    if (currentPosition === position[2]){
        selector.style.transform = "translateX(225px)";
        currentPosition = position[2];
    }
    return currentPosition;
});
leftArrow.addEventListener("click", () => {
    if (currentPosition === position[0]){
        selector.style.transform = "translateX(0px)";
        currentPosition = position[0];
    }
    if (currentPosition === position[1]){
        selector.style.transform = "translateX(0px)";
        currentPosition = position[0];
    }
    if (currentPosition === position[2]){
        selector.style.transform = "translateX(78px)";
        currentPosition = position[1];
    }
    return currentPosition;
});
downArrow.addEventListener("click", () => {
    console.log(currentPosition);
    if (currentPosition === 0 ||currentPosition === 1 ||currentPosition === 2 )
    {
        return;
    }
    else if (currentVertical < verticalPosition[7])
    {
    selector.style.transform = `translate(0px, ${verticalHeight+25}px)`
    currentVertical = verticalPosition[currentVertical+1];
    return verticalHeight = verticalHeight+25;
}
})
upArrow.addEventListener("click", () => {
    if (currentPosition === 0 ||currentPosition === 1 ||currentPosition === 2 )
    {
        return;
    }
    if (currentVertical > verticalPosition[0])
    {
    selector.style.transform = `translate(0px, ${verticalHeight-25}px)`
    currentVertical = verticalPosition[currentVertical-1];
    return verticalHeight = verticalHeight-25;
}
})
enterButton.addEventListener("click", getData); 

aButton.addEventListener("click", () => {
    if (currentLeftPosition === 0) //stats
    {
        let statValueArr = getStats(currentPokemon);
        displayStats(statValueArr);
    }
    else if(currentLeftPosition === 1) { //examine
        hideLeftScreen();
        displayExamine();
    }
    else if (currentLeftPosition === 2) //return from stats and examine
    {
        hideLeftScreen();
        resetLeftscreen();
        displayInfo(currentPokemon);
    }
})
selectButton.addEventListener("click",() => {
    
    if (currentPosition === 1){
        hideNavBar();
        document.querySelector("#rightViewScreen").style.overflowY = "auto";
        showNationalDex();

        document.querySelector(".nationalDexList").style.visibility = "visible";
    }
    else if (currentPosition === 2)
    {
        currentPosition = position[3];
        hideNavBar();
        showRegionlDexList();
        
    }
    else if (currentPosition === position[3])
    {
        let regionArr = [[0, 151],[151, 251],[251, 386],[386, 493],[493, 649],[649, 721],[721, 809],[809, 905]];
        showRegionList(regionArr[currentVertical]);
    }
});
padDown.addEventListener("click", () => {
    if (currentLeftPosition === 0){
        leftSelector.style.transform = "translateY(30px)";
        currentLeftPosition = leftPosition[1];
    }
    else if (currentLeftPosition === 1){
        return;
    }
})
padUp.addEventListener("click", () => {
    if (currentLeftPosition === 0){
        return;
    }
    else if (currentLeftPosition === 1){
        leftSelector.style.transform = "translateY(0px)";
        currentLeftPosition = leftPosition[0];
    }
})
padRight.addEventListener("click", () => {
    if (currentLeftPosition === 2){
    let spriteArr = [currentPokemon.sprites.front_default,currentPokemon.sprites.back_default,currentPokemon.sprites.front_shiny,currentPokemon.sprites.back_shiny ]
    if (spritePosition === 3)
    {
        document.querySelector(".sprite").src = spriteArr[0]
        return spritePosition = 0;
    }
        spritePosition++;
        document.querySelector(".sprite").src = spriteArr[spritePosition];
        return spritePosition;

}
});
padLeft.addEventListener("click", () => {
    if (currentLeftPosition === 2){
    let spriteArr = [currentPokemon.sprites.front_default,currentPokemon.sprites.back_default,currentPokemon.sprites.front_shiny,currentPokemon.sprites.back_shiny ]
    
    if (spritePosition === 0)
    {
        document.querySelector(".sprite").src = spriteArr[3]
        return spritePosition = 3;
    }
        spritePosition--;
        document.querySelector(".sprite").src = spriteArr[spritePosition];
        return spritePosition;
}
});
returnButton.addEventListener("click",() => {
    if(currentPosition === 3){
    selector.style.transform = "translateX(225px)";
    currentPosition = position[2];
    currentVertical = verticalPosition[0];
    verticalHeight = 20;
    document.querySelector(".regionList").innerText ="";

    }
    counter=1;
    document.querySelector("#rightViewScreen").scrollTop = 0;
    showHomeScreen();
    return currentPosition, counter;
});



