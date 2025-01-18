document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.getElementById('download');
  const pdfButton = document.getElementById('download-pdf');

  if (downloadButton && pdfButton) {
    // Add event listener for downloading the HTML page
    downloadButton.addEventListener('click', () => {
      console.log('Download HTML button clicked');
      const staticHTML = document.documentElement.outerHTML;
      const blob = new Blob([staticHTML], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'concordium.html';
      link.click();
    });

    // Add event listener for downloading as PDF
    pdfButton.addEventListener('click', () => {
      console.log('Download PDF button clicked');
      
      // Clone the document to avoid altering the original page
      const clonedDoc = document.documentElement.cloneNode(true);

      // Remove the 'Back' link and the buttons from the cloned document
      clonedDoc.querySelector('a[href="index.html"]')?.remove();
      clonedDoc.querySelector('#download-pdf')?.remove();
      clonedDoc.querySelector('#download')?.remove();

      // Create a temporary hidden iframe to render the cleaned content
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.width = '0';
      iframe.style.height = '0';
      document.body.appendChild(iframe);

      iframe.contentDocument.open();
      iframe.contentDocument.write(clonedDoc.outerHTML);
      iframe.contentDocument.close();

      iframe.onload = () => {
        console.log('Iframe loaded for PDF generation');
        const iframeWindow = iframe.contentWindow;
        iframeWindow.html2pdf().from(iframe.contentDocument.body).save('concordium.pdf');

        // Clean up the iframe
        iframe.remove();
      };
    });
  } else {
    console.error('Download buttons not found!');
  }

  // Load and process character data
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const sinsList = document.getElementById('sins-list');
      const virtuesList = document.getElementById('virtues-list');

      const captains = [];
      const nonCaptains = [];

      Object.values(data).forEach(character => {
        const div = document.createElement('div');
        const team = character.alignment === "Sin" ? "The Seven Deadly Sins" : "The Seven Heavenly Virtues";
        const job = character.rank === "Imperatore" ? `, Captain of <u>${team}</u>` : "";

        const rankMap = {
          "Imperatore": { "F": "Imperatora", "M": "Imperator" },
          "Venatorium": { "F": "Venatrix", "M": "Venator" },
          "Ferratorium": { "F": "Ferratrix", "M": "Ferrator" },
          "Dominum": { "F": "Domina", "M": "Dominus" },
          "Luminorium": { "F": "Luminora", "M": "Luminor" },
          "Exaltum": { "F": "Exalta", "M": "Exaltus" },
          "Bellatorium": { "F": "Bellatrix", "M": "Bellator" },
        };
        const rank = rankMap[character.rank] ? rankMap[character.rank][character.sex] || character.rank : character.rank;

        div.innerHTML = `
          <h3><i>${character.name} ${rank}, ${character.animal} ${character.alignment} of ${character.aspect}${job}</i></h3>
        `;

        if (character.epithet) div.innerHTML += `<p><b>"${character.epithet}"</b></p>`;
        if (character.weapon) div.innerHTML += `<li>Weapon: <u>${character.weapon}</u></li>`;
        if (character.colour) div.innerHTML += `<li>Gear Colour: <u>${character.colour}</u></li>`;
        if (character.power) div.innerHTML += `<li>Power: <u>${character.power}</u></li>`;
        if (character.species) div.innerHTML += `<li>Species: <u>${character.species}</u></li>`;
        if (character.description) div.innerHTML += `<p>${character.description}</p>`;

        if (character.rank === "Imperatore") {
          captains.push(div);
        } else {
          nonCaptains.push(div);
        }
      });

      captains.forEach(div => {
        if (div.querySelector('h3').innerText.includes("Sin")) {
          sinsList.appendChild(div);
        } else {
          virtuesList.appendChild(div);
        }
      });

      nonCaptains.forEach(div => {
        if (div.querySelector('h3').innerText.includes("Sin")) {
          sinsList.appendChild(div);
        } else {
          virtuesList.appendChild(div);
        }
      });
    })
    .catch(error => console.error('Error loading JSON:', error));
});
