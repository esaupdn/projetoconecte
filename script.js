// Função para lidar com o clique no botão de doação
document.getElementById("donateBtn").addEventListener("click", function () {
    window.location.href = "https://www.camaramachado.mg.gov.br/ceac-4-2/";
    alert("Redirecionando para a página oficial do CEAC...");
});

function loadCSV() {
    // Caminho para o arquivo CSV
    const csvFilePath = 'ceac-sheets.csv';
    console.log("loadCSV");
    // Use a biblioteca PapaParse para ler o CSV
    Papa.parse(csvFilePath, {
        header: true,
        download: true,
        dynamicTyping: true,
        complete: function (results) {
            const actions = results.data;
            const tableBody = document.querySelector('#actions-table tbody');

            // Limpe qualquer conteúdo existente na tabela
            tableBody.innerHTML = '';

            // Preencha a tabela com os dados do CSV
            actions.forEach(function (action) {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const descriptionCell = document.createElement('td');

                nameCell.textContent = action.Ação;
                descriptionCell.textContent = action.Descrição;

                row.appendChild(nameCell);
                row.appendChild(descriptionCell);
                tableBody.appendChild(row);
            });
        }
    });
}

//window.addEventListener('load', loadCSV);

// Função para carregar e exibir dados da planilha do Google Sheets
function loadGoogleSheetData() {
    // ID da planilha do Google Sheets
    const spreadsheetId = '1dU1Wmpo7I7ruGgWrK8oZImu4myBRvSkf_IH-ocg8oCI';
    // ID da planilha dentro do documento (geralmente 0 para a primeira planilha)
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'info' // Substitua pelo nome da aba que você deseja ler
    }).then(function(response) {
        const data = response.result.values;
        const tableBody = document.querySelector('#actions-table tbody');

        // Limpe qualquer conteúdo existente na tabela
        tableBody.innerHTML = '';

        // Preencha a tabela com os dados da planilha
        data.forEach(function(row) {
            const rowData = row.map(item => item || ''); // Lida com valores nulos ou indefinidos

            const tableRow = document.createElement('tr');
            rowData.forEach(function(cellData) {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                tableRow.appendChild(cell);
            });

            tableBody.appendChild(tableRow);
        });
    });
}

// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyCoDf5v9O9PHLkyHWXVyNYyNOzFXRTxtHg',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        loadGoogleSheetData();
    });
}

// Carrega a API do Google Sheets e inicia a aplicação
gapi.load('client', initGoogleSheetsApi);



