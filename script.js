const inputName = document.getElementById('inputName')
const inputNum = document.getElementById('inputNum')
const inputMail = document.getElementById('inputMail')

let valueName = []
let valueNum = []
let valueMail = []

let lines = ''

function cadastrar(){
    if(valueName.includes(inputName.value) || valueNum.includes(inputNum.value) || valueMail.includes(inputMail.value)){
        alert('Algum dado já foi cadastrado!')
    } else{
        addLinha();
        atAgenda();
    }
    
}

function addLinha(){

    valueName.push(inputName.value)
    valueNum.push(inputNum.value)
    valueMail.push(inputMail.value)
    
    let line = '<tr>';
    line += `<td><strong>${inputName.value}</strong></td>`
    line += `<td>${inputNum.value}</td>`
    line += `<td>${inputMail.value}</td><br>`;
    line += `</tr>`;

    lines += line;
}

function atAgenda(){
    let corpoAgenda = document.querySelector('tbody')
    corpoAgenda.innerHTML = lines;
}
