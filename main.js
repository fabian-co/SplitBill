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

    const spanExpand = document.createElement("span")
    spanExpand.setAttribute("id", "expandSymbol")
    spanExpand.classList.add("material-symbols-outlined")
    spanExpand.innerText = "expand_more"
        

    countValues.append(inputName, inputValue, spanExpand)
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
        sum += parseFloat(object[i].value)
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
        return parseFloat(element.value) < average
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

function setTableDebtor(debtor){
    const tableBodyDebtor = document.querySelector(".tableBodyDebtor")
        
    for( i = 0; i < debtor.length ; i++ ){
        let row = document.createElement("tr")
        row.setAttribute("class", "rowDebtorTable")

        let idCell = document.createElement("td")
        idCell.textContent = debtor[i].id
        row.append(idCell)

        let nameCell = document.createElement("td")
        nameCell.textContent = debtor[i].name
        row.append(nameCell)

        let valueCell = document.createElement("td")
        valueNumberFormat= formatNumber(parseFloat(debtor[i].value))
        valueCell.textContent = valueNumberFormat      
        row.append(valueCell)

        tableBodyDebtor.append(row)
    }    

}

// reset table debtor

function resetTableDebtor(debtor){
    
    const isTableBodyDebtor = document.querySelector(".tableBodyDebtor")
    let isRowTableBodyDebtor = isTableBodyDebtor.querySelectorAll(".rowDebtorTable")  
    
    if (isRowTableBodyDebtor.length > 0){

        isRowTableBodyDebtor.forEach(function(element) {
            element.remove()
        })        
        setTableDebtor(debtor)

    } else {
        setTableDebtor(debtor)
    }
}

// funcion set valor total de debtor html

function setValueTotalDebtor(debtor){
    const tableTotalDebtor = document.querySelector(".tableTotalDebtor")

    let value = 0
    debtor.forEach(function(element){
        let suma = parseFloat(element.value)
        value += suma
    })
    
    tableTotalDebtor.innerText = formatNumber(value)
}

// funcion info creditors

function creditorsInfo(object){
    let average = resultAverage(object)
        
    let creditor = object.filter(function (element) {
        return parseFloat(element.value) > average
    })

    creditorAboveAverage = []
    creditor.forEach((creditor) => {
        const id = creditor.id
        const name = creditor.name
        const value = (creditor.value)-average

        creditorAboveAverage.push({ id, name, value })
    })

    
    return creditorAboveAverage
}

// funcion set table creditor html

function setTableCreditor(creditor){
    const tableBodyCreditor = document.querySelector(".tableBodyCreditor")
        
    for( i = 0; i < creditor.length ; i++ ){
        let row = document.createElement("tr")
        row.setAttribute("class", "rowCreditorTable")

        let idCell = document.createElement("td")
        idCell.textContent = creditor[i].id
        row.append(idCell)

        let nameCell = document.createElement("td")
        nameCell.textContent = creditor[i].name
        row.append(nameCell)

        let valueCell = document.createElement("td")
        valueNumberFormat= formatNumber(parseFloat(creditor[i].value))
        valueCell.textContent = valueNumberFormat      
        row.append(valueCell)

        tableBodyCreditor.append(row)
    }
}

// reset table creditor

function resetTableCreditor(creditor){
    const isTableBodyCreditor = document.querySelector(".tableBodyCreditor")
    let isRowTableBodyCreditor = isTableBodyCreditor.querySelectorAll(".rowCreditorTable")  
    
    if (isRowTableBodyCreditor.length > 0){

        isRowTableBodyCreditor.forEach(function(element) {
            element.remove()
        })        
        setTableCreditor(creditor)

    } else {
        setTableCreditor(creditor)
    }
}

// funcion set valor total de creditor html

function setValueTotalCreditor(creditor){
    const tableTotalCreditor = document.querySelector(".tableTotalCreditor")

    let value = 0
    creditor.forEach(function(element){
        let suma = parseFloat(element.value)
        value += suma
    })
    
    tableTotalCreditor.innerText = formatNumber(value)
}

// funcion para setear los valores en la caja de reslutado

function setResult(){
    const infoObject = captureInfo()
    const average = resultAverage(infoObject)
    const debtor= debtorsInfo(infoObject)
    const creditor = creditorsInfo(infoObject)


    setAverage(average)   
 
    resetTableDebtor(debtor)

    setValueTotalDebtor(debtor)

    resetTableCreditor(creditor)

    setValueTotalCreditor(creditor)
}


buttonCalcular.addEventListener("click", setResult)

