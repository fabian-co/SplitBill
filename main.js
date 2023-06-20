const count = document.querySelector(".count")
const countElement = document.querySelectorAll(".count")
const addSymbol = document.querySelector("#addSymbol")
/*
<div class="countBox">
    <div class="countTitle">
        <h2>Cuenta: 1</h2>
        <span class="material-symbols-outlined"> cancel </span>
    </div>
    <div class="countValues">
        <input type="text" placeholder="Nombre" />
        <input type="number" placeholder="$ Valor" />
    </div>
</div>
*/
let numBox = 2;


function valueBox (titleId, name, value){
    titleId,
    name,
    value
}


for (let i = 0; i < numBox; i++){
    const countBox = document.createElement("div")
    countBox.classList.add("countBox")


    const countTitle = document.createElement("div")
    countTitle.classList.add("countTitle")

    const h2Tittle = document.createElement("h2")
    h2Tittle.innerText = "Cuenta: " + (i+1)

    const spanclose = document.createElement("span")
    spanclose.setAttribute("id", "closeSymbol")
    spanclose.classList.add("material-symbols-outlined")
    spanclose.innerText = "cancel"
    
    
    const countValues = document.createElement("div")
    countValues.classList.add("countValues")

    const inputName = document.createElement("input")
    inputName.setAttribute("type", "text")
    inputName.setAttribute("placeholder", "Nombre")

    const inputValue = document.createElement("input")
    inputValue.setAttribute("type", "number")
    inputValue.setAttribute("placeholder", "$ Valor")

    countValues.append(inputName, inputValue)
    countTitle.append(h2Tittle, spanclose)
    countBox.append(countTitle, countValues)


    count.append(countBox)
}

addSymbol.addEventListener("click", addBox)

function addBox(){
    const countBox = document.createElement("div")
    countBox.classList.add("countBox")


    const countTitle = document.createElement("div")
    countTitle.classList.add("countTitle")

    const h2Tittle = document.createElement("h2")
    h2Tittle.innerText = "Cuenta: " + (numBox+1)

    const spanclose = document.createElement("span")
    spanclose.setAttribute("id", "closeSymbol")
    spanclose.classList.add("material-symbols-outlined")
    spanclose.innerText = "cancel"
    
    
    const countValues = document.createElement("div")
    countValues.classList.add("countValues")

    const inputName = document.createElement("input")
    inputName.setAttribute("type", "text")
    inputName.setAttribute("placeholder", "Nombre")

    const inputValue = document.createElement("input")
    inputValue.setAttribute("type", "number")
    inputValue.setAttribute("placeholder", "$ Valor")

    countValues.append(inputName, inputValue)
    countTitle.append(h2Tittle, spanclose)
    countBox.append(countTitle, countValues)


    count.append(countBox) 
    numBox++  
}

function deleteBox(){
    this.parentNode.removeChild(this);
}

for (let i = 0; i < count.length; i++){
    const eliminar = count[i].querySelector("#closeSymbol")
    eliminar.addEventListener("click", deleteBox)
}