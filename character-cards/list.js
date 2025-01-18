document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const sinsList = document.getElementById('sins-list');
      const virtuesList = document.getElementById('virtues-list');

      const captains = [];
      const nonCaptains = [];

      // Process characters
      Object.values(data).forEach(character => {
        const div = document.createElement('div');
        let team = character.alignment === "Sin" ? "The Seven Deadly Sins" : "The Seven Heavenly Virtues";

        const job = character.rank === "Imperatore" ? `, Captain of <u>${team}</u>` : "";

        function sex(character) {
          const rankMap = {
            "Imperatore": { "F": "Imperatora", "M": "Imperator" },
            "Venatorium": { "F": "Venatrix", "M": "Venator" },
            "Ferratorium": { "F": "Ferratrix", "M": "Ferrator" },
            "Dominum": { "F": "Domina", "M": "Dominus" },
            "Luminorium": { "F": "Luminora", "M": "Luminor" },
            "Exaltum": { "F": "Exalta", "M": "Exaltus" },
            "Bellatorium": { "F": "Bellatrix", "M": "Bellator" },
          };
          return rankMap[character.rank] ? rankMap[character.rank][character.sex] || character.rank : character.rank;
        }

        div.innerHTML = `
          <h3><i>${character.name} ${sex(character)}, ${character.animal} ${character.alignment} of ${character.aspect}${job}</i></h3>
        `;

        if (character.epithet !== "") div.innerHTML += `<p><b>"${character.epithet}"</b></p>`;
        if (character.weapon !== "") div.innerHTML += `<li>Weapon: <u>${character.weapon}</u></li>`;
        if (character.colour !== "") div.innerHTML += `<li>Gear Colour: <u>${character.colour}</u></li>`;
        if (character.power !== "") div.innerHTML += `<li>Power: <u>${character.power}</u></li>`;
        if (character.species !== "") div.innerHTML += `<li>Species: <u>${character.species}</u></li>`;
        if (character.description !== "") div.innerHTML += `<p>${character.description}</p>`;

        if (character.rank === "Imperatore") {
          captains.push(div);
        } else {
          nonCaptains.push(div);
        }
      });

      // Append content
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

  // HTML Download
  document.getElementById('download').addEventListener('click', () => {
    const clonedDoc = document.documentElement.cloneNode(true);

    // Remove the back link and download buttons
    clonedDoc.querySelector('a[href="index.html"]')?.remove();
    clonedDoc.querySelector('#download')?.remove();
    clonedDoc.querySelector('#download-pdf')?.remove();

    const staticHTML = clonedDoc.outerHTML;
    const blob = new Blob([staticHTML], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'concordium.html';
    a.click();
  });

  // PDF Download
  document.getElementById('download-pdf').addEventListener('click', () => {
    const clonedDoc = document.documentElement.cloneNode(true);

    // Remove the back link and download buttons
    clonedDoc.querySelector('a[href="index.html"]')?.remove();
    clonedDoc.querySelector('#download')?.remove();
    clonedDoc.querySelector('#download-pdf')?.remove();

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.width = '0';
    iframe.style.height = '0';
    document.body.appendChild(iframe);

    iframe.contentDocument.open();
    iframe.contentDocument.write(clonedDoc.outerHTML);
    iframe.contentDocument.close();

    iframe.onload = () => {
      iframe.contentWindow.html2pdf().from(iframe.contentDocument.body).save('concordium.pdf');
      iframe.remove();
    };
  });
});
