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
    const infoInputs = []
    const idCountBox = document.querySelectorAll("[id^=idBox]")
    

    idCountBox.forEach((countBox) => {
        const h2Tittle = countBox.querySelector("h2");
        const inputName = countBox.querySelector('input[type="text"]');
        const inputValue = countBox.querySelector('input[type="number"]');
    
        const id = h2Tittle.innerText.split(":")[1].trim();
        const name = inputName.value;
        const value = inputValue.value;

        infoInputs.push({ id, name, value });
    })

    console.log(infoInputs)
    return infoInputs
}

// setear datos en la caja de resultado

// detectar la localidad para posteriormente convertir los valores en moneda local

function formatNumber(number){
    let localCurrency = navigator.language;

    let formatCurrency = number.toLocaleString(localCurrency, {
        style: "currency",
        currency: 'USD',
        currencyDisplay: 'narrowSymbol'
    })    
    return formatCurrency
}

// funcion del valor promedio

function resultAverage(object){
    let sum = 0
    
    for (var i=0; i < object.length; i++){
        sum += parseInt(object[i].value)
    }

    let average = sum / (object.length)    
    return average    
}

// funcion set average html

function setAverage(average){
    const valueAverage = document.querySelector(".valueAverage")
    valueAverage.innerText = formatNumber(average) 
}

// funcion retornar personas de debtor

function debtorsInfo(object){
    
    let average = resultAverage(object)
        
    let debtor = object.filter(function (element) {
        return parseInt(element.value) < average
    })

    debtorLessAverage = []
    debtor.forEach((debtor) => {
        const id = debtor.id
        const name = debtor.name
        const value = average-(debtor.value)

        debtorLessAverage.push({ id, name, value })
    })

    return debtorLessAverage
}

//funcion para crear el html de la tabla debtor

function setTableDebtor(object){
    const tableBodyDebtor = document.querySelector(".tableBodyDebtor")
        
    for( i = 0; i < object.length ; i++ ){
        let row = document.createElement("tr")
        row.setAttribute("class", "rowDebtorTable")

        let idCell = document.createElement("td")
        idCell.textContent = object[i].id
        row.append(idCell)

        let nameCell = document.createElement("td")
        nameCell.textContent = object[i].name
        row.append(nameCell)

        let valueCell = document.createElement("td")
        valueNumberFormat= formatNumber(parseInt(object[i].value))
        valueCell.textContent = valueNumberFormat      
        row.append(valueCell)

        tableBodyDebtor.append(row)
    }    

}

// funcion set valor total de debtor html

function setValueTotalDebtor(objectDebtor){
    const tableTotalDebtor = document.querySelector(".tableTotalDebtor")

    let value = 0
    objectDebtor.forEach(function(element){
        let suma = parseInt(element.value)
        value += suma
    })
    console.log(value)
    tableTotalDebtor.innerText = formatNumber(value)
}

// funcion para setear los valores en la caja de reslutado

function setResult(){
    const infoObject = captureInfo()
    const debtor= debtorsInfo(infoObject)
    const average = resultAverage(infoObject)

    setAverage(average)    
    
    setTableDebtor(debtor)
    
    setValueTotalDebtor(debtor)
}


buttonCalcular.addEventListener("click", setResult)

