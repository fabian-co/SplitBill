const count = document.querySelector(".count")
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

let addBox = 2;

function valueBox (titleId, name, value){
    titleId,
    name,
    value
}

for (let i = 0; i < addBox; i++){
    const countBox = document.createElement("div")
    countBox.classList.add("countBox")


    const countTitle = document.createElement("div")
    countTitle.classList.add("countTitle")

    const h2Tittle = document.createElement("h2")
    h2Tittle.innerText = "Cuenta: " + (i+1)

    const span = document.createElement("span")
    span.classList.add("material-symbols-outlined")
    span.innerText = "cancel"
    
    
    const countValues = document.createElement("div")
    countValues.classList.add("countValues")

    const inputName = document.createElement("input")
    inputName.setAttribute("type", "text")
    inputName.setAttribute("placeholder", "Nombre")

    const inputValue = document.createElement("input")
    inputValue.setAttribute("type", "number")
    inputValue.setAttribute("placeholder", "$ Valor")

    countValues.append(inputName, inputValue)
    countTitle.append(h2Tittle, span)
    countBox.append(countTitle, countValues)


    count.append(countBox)
    console.log("Hola")
}