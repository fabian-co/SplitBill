const count = document.querySelector(".count")
const countElement = document.querySelectorAll(".count")
const addSymbol = document.querySelector("#addSymbol")
const buttonCalcular = document.querySelector(".buttonCalcular")


// model html
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

// model js
function boxModel(index) {
    let idBox = index

    const countBox = document.createElement("div")
    countBox.classList.add("countBox")
    countBox.setAttribute("id", "idBox-"+idBox)

    const countTitle = document.createElement("div")
    countTitle.classList.add("countTitle")

    const h2Tittle = document.createElement("h2")
    h2Tittle.innerText = "Cuenta: " + (index+1)

    const spanClose = document.createElement("span")
    spanClose.setAttribute("id", "closeSymbol")
    spanClose.classList.add("material-symbols-outlined")
    spanClose.innerText = "cancel"
    
    
    const countValues = document.createElement("div")
    countValues.classList.add("countValues")

    const inputName = document.createElement("input")
    inputName.setAttribute("type", "text")
    inputName.setAttribute("placeholder", "Nombre")
    
    const inputValue = document.createElement("input")
    inputValue.setAttribute("type", "number")
    inputValue.setAttribute("placeholder", "$ Valor")
        

    countValues.append(inputName, inputValue)
    countTitle.append(h2Tittle, spanClose)
    countBox.append(countTitle, countValues)

    // function para cerrar el countbox correspondiente
    spanClose.addEventListener('click', function() {
        countBox.remove();
    });

    return countBox
}

// html inicial 2 countBox
let initialBox = 2;

for (let i = 0; i < initialBox; i++){
    const newCountBox = boxModel(i)
    count.appendChild(newCountBox)
}   

// boton agregar countBox
addSymbol.addEventListener("click", addBox)

function addBox(){
    const newCountBox = boxModel(initialBox)
    count.appendChild(newCountBox)
    initialBox++
}

//guardar datos 

function captureInfo(){  
    const idCountBox = document.querySelectorAll("[id^=idBox]")
    const infoInputs = []

    idCountBox.forEach((countBox) => {
        const h2Tittle = countBox.querySelector("h2");
        const inputName = countBox.querySelector('input[type="text"]');
        const inputValue = countBox.querySelector('input[type="number"]');
    
        const cuenta = h2Tittle.innerText.split(":")[1].trim();
        const nombre = inputName.value;
        const valor = inputValue.value;

        infoInputs.push({ cuenta, nombre, valor });
    })

    console.log(infoInputs)
}

buttonCalcular.addEventListener("click", captureInfo)

