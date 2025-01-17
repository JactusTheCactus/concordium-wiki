fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const pairsContainer = document.getElementById('pairs-container');
    const processed = new Set(); // Keep track of processed characters

    let sinsContent = "<h2>Sins</h2>";
    let virtuesContent = "<h2>Virtues</h2>";
    
    // Function to generate a list item for characters
    function createCharacterListItem(character) {
      return `<li><b>${character.name}</b> (${character.alignment} of ${character.aspect})</li>`;
    }

    // Create content dynamically for Sins and Virtues, with Captains first
    const captains = {
      sins: [],
      virtues: []
    };
    const others = {
      sins: [],
      virtues: []
    };

    for (const key in data) {
      const character = data[key];
      if (processed.has(key)) continue;

      // Check for captains and categorize the characters accordingly
      if (character.alignment === "Sin") {
        if (character.rank === "Imperatore") {
          captains.sins.push(character);
        } else {
          others.sins.push(character);
        }
      } else if (character.alignment === "Virtue") {
        if (character.rank === "Imperatore") {
          captains.virtues.push(character);
        } else {
          others.virtues.push(character);
        }
      }

      processed.add(key);
    }

    // Append captains first, then the others
    sinsContent += "<ul>";
    captains.sins.forEach(character => {
      sinsContent += createCharacterListItem(character);
    });
    others.sins.forEach(character => {
      sinsContent += createCharacterListItem(character);
    });
    sinsContent += "</ul>";

    virtuesContent += "<ul>";
    captains.virtues.forEach(character => {
      virtuesContent += createCharacterListItem(character);
    });
    others.virtues.forEach(character => {
      virtuesContent += createCharacterListItem(character);
    });
    virtuesContent += "</ul>";

    // Combine everything into a full HTML structure
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>The Concordium</title>
      </head>
      <body>
        <h1>The Concordium</h1>
        <p>Here are the Sins and Virtues of The Concordium, with their Captains listed first.</p>
        ${sinsContent}
        ${virtuesContent}
      </body>
      </html>
    `;

    // Create a link to open the generated HTML content in a new window
    const openLink = document.createElement('a');
    openLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
    openLink.target = '_blank'; // Open in a new tab
    openLink.textContent = 'Open The Concordium HTML Page';

    // Append the link to the page
    document.body.appendChild(openLink);
  })
  .catch(error => console.error('Error loading JSON:', error));