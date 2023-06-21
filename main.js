const count = document.querySelector(".count")
const countElement = document.querySelectorAll(".count")
const addSymbol = document.querySelector("#addSymbol")

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

function boxModel(index) {
    const countBox = document.createElement("div")
    countBox.classList.add("countBox")


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
    inputName.addEventListener('change', actualizarDatosCountBox);

    const inputValue = document.createElement("input")
    inputValue.setAttribute("type", "number")
    inputValue.setAttribute("placeholder", "$ Valor")
    inputValue.addEventListener('change', actualizarDatosCountBox);
    

    countValues.append(inputName, inputValue)
    countTitle.append(h2Tittle, spanClose)
    countBox.append(countTitle, countValues)

    // function para cerrar el countbox correspondiente
    spanClose.addEventListener('click', function() {
        countBox.remove();
    });

    return countBox
}

let initialBox = 2;

for (let i = 0; i < initialBox; i++){
    const newCountBox = boxModel(i)
    count.appendChild(newCountBox)
}   

addSymbol.addEventListener("click", addBox)

function addBox(){
    const newCountBox = boxModel(initialBox)
    count.appendChild(newCountBox)
    initialBox++
}

//guardar datos 

let dataCountBox = [];

function actualizarDatosCountBox() {
    dataCountBox = [];
    const countBoxes = document.querySelectorAll('.countBox');
  
    countBoxes.forEach(function(countBox) {
      const inputNombre = countBox.querySelector('input[type="text"]');
      const inputValor = countBox.querySelector('input[type="number"]');
  
      const datos = {
        nombre: inputNombre.value,
        valor: inputValor.value
      };
  
      dataCountBox.push(datos);
    });
  
    console.log(dataCountBox);
}
  