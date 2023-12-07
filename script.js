// Função para lidar com o clique no botão de doação
document.getElementById("donateBtn").addEventListener("click", function () {
    window.open("https://www.camaramachado.mg.gov.br/ceac-4-2/", "_blank");
    alert("Redirecionando para a página oficial do CEAC...");
});


//window.addEventListener('load', loadCSV);

// Função para carregar e exibir dados da planilha do Google Sheets

navMenu.classList.toggle('ativo');

function loadGoogleSheetData() {
    const spreadsheetId = '1zRFq2dVvR4uw-h9UabiCzOQ9KGVjGS7siV5vqDAvXew';
    const sheetId = 0;

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'info'
    }).then(function (response) {

        const data = response.result.values;

        if (data.length > 0) {
            const donatorsContent = document.getElementById('donators-content');
            data.forEach(function (row) {
                const company = row[0];
                const companyLink = row[1];
                const companyLogo = row[2];

                const donatorsBox = document.createElement('div');
                donatorsBox.className = 'donators-box';

                if (companyLogo) {
                    donatorsBox.innerHTML = `
                        <a href="${companyLink}" target="_blank">
                            <img class="company-logo" src="${companyLogo}" alt="Logo ${company}">
                        </a>
                    `;
                } else {
                    donatorsBox.innerHTML = `
                        <a href="${companyLink}" target="_blank">
                            ${company}
                        </a>
                    `;
                }

                donatorsContent.appendChild(donatorsBox);
            });
        }

    }).catch(function (error) {
        console.error('Erro ao carregar dados da planilha do Google:', error);
    });
}


function initGoogleSheetsApiDonators() {
    gapi.client.init({
        apiKey: 'AIzaSyBkz6wh36lc44mZw_FZL15wnEiw23plxDQ',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        loadGoogleSheetDataDonators();
    });
}

gapi.load('client', initGoogleSheetsApiDonators);

function autoSlide() {
    const slider = document.getElementById("slider");
    const slides = slider.querySelectorAll("img");
    let currentSlide = 0;

    function nextSlide() {
      slides[currentSlide].style.scrollSnapAlign = "none";
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].style.scrollSnapAlign = "start";
    }

    setInterval(nextSlide, 5000); // Mude o valor 5000 para controlar a velocidade (em milissegundos)
  }

  // Chame a função quando a página for carregada
  window.addEventListener("load", autoSlide);
