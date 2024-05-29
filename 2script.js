const inputName = document.getElementById('inputName');
const inputNumber = document.getElementById('inputNumber');
const inputMail = document.getElementById('inputMail');
const inputPhoto = document.getElementById('profilePhoto');
const photoLabel = document.getElementById('profilePhotoL');
const btnDown = document.getElementById('down');

let contatos = [];

function cadastrar() {
    addContato();
    atAgenda();
}

function addContato() {
    const reader = new FileReader();
    reader.onload = function (e) {
        const fotoSrc = e.target.result;

        const contato = {
            nome: inputName.value,
            numero: inputNumber.value,
            email: inputMail.value,
            foto: fotoSrc
        };

        contatos.push(contato);
        atAgenda();
    }

    if (inputPhoto.files[0]) {
        reader.readAsDataURL(inputPhoto.files[0]);
    } else {
        const contato = {
            nome: inputName.value,
            numero: inputNumber.value,
            email: inputMail.value,
            foto: null
        };

        contatos.push(contato);
        atAgenda();
    }
}

function atAgenda() {
    const corpoAgenda = document.getElementById('agendaCorpo');
    corpoAgenda.innerHTML = '';
    
    contatos.forEach(contato => {
        let linha = '<tr>';
        linha += `<td>${contato.nome}</td>`;
        linha += `<td>${contato.numero}</td>`;
        linha += `<td>${contato.email}</td>`;
        if (contato.foto) {
            linha += `<td><img src="${contato.foto}" alt="Foto de Perfil" width="50"></td>`;
        } else {
            linha += `<td>Sem Foto</td>`;
        }
        linha += '</tr>';
        corpoAgenda.innerHTML += linha;
    });
}

async function down() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text('Agenda de Contatos', 10, 10);

    const tableData = contatos.map(contato => [
        contato.nome, 
        contato.numero, 
        contato.email, 
        contato.foto ? { url: contato.foto, width: 20, height: 20 } : 'Sem Foto'
    ]);

    doc.autoTable({
        head: [['Nome Completo', 'Número', 'E-mail', 'Foto']],
        body: tableData,
        didDrawCell: data => {
            if (data.column.index === 3 && data.cell.raw.url) {
                const { url, width, height } = data.cell.raw;
                doc.addImage(url, 'JPEG', data.cell.x + 2, data.cell.y + 2, width, height);
            }
        }
    });

    doc.save('agenda.pdf');
}
