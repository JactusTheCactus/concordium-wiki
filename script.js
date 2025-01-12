fetch('concordium.json')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Loop through the object keys
    Object.keys(data).forEach(key => {
      const character = data[key]; // Access the character object using the key

      // Dynamically create HTML elements for each character
      const characterContainer = document.createElement('div');
      characterContainer.classList.add('character'); // Add a class for styling

      const name = document.createElement('h2');
      name.textContent = `${character.name} ${sex(character)}, ${character.animal} ${character.alignment} of ${character.aspect}`;

      const description = document.createElement('p');
      description.textContent = character.description;

      if (character.sasia.aln > 0) {
        alignment = `Sin`
      }
      else if (character.sasia.aln < 0) {
        alignment = `Sin`
      }
      else {
        alignment = `Neutral`
      }

      function checkEmpty(character) {
        // Loop through all keys in the character object
        for (let key in character) {
          if (character.hasOwnProperty(key)) {
            // Check if the value is an empty string
            if (character[key] === "") {
              // Replace with "N/A"
              character[key] = "N/A";
            }
          }
        }
        return character;
      }
      checkEmpty(character);

      function sex(character) {
        const rankMap = {
          "Imperatore": { "F": "Imperatora", "M": "Imperator" },
          "Venatorium": { "F": "Venatrix", "M": "Venator"},
          "Ferratorium": { "F": "Ferratrix", "M": "Ferrator"},
          "Dominum": { "F": "Dominum", "M": "Dominus"},
          "Luminorium": { "F": "Luminora", "M": "Luminor"},
          "Exaltum": { "F": "Exalta", "M": "Exaltus"},
          "Bellatorium": { "F": "Bellatrix", "M": "Bellator"},
        };
        if (rankMap[character.rank]) {return rankMap[character.rank][character.sex] || character.rank;}
        return character.rank;
      }

      const epithet = document.createElement('div');
      epithet.classList.add('epithet');
      if (character.epithet != `N/A`) {
        stats.innerHTML = `
        "${character.epithet}"<br>
      `
      }
      
      const stats = document.createElement('div');
      stats.innerHTML += `
        Weapon: ${character.weapon}<br>
        Gear Colour: ${character.colour}<br>
        Power: ${character.power}<br>
        Species: ${character.species}<br>
      `;
      stats.innerHTML += `
         Strength: ${character.sasia.str}<br>
         Arcane: ${character.sasia.arc}<br>
         Speed: ${character.sasia.spd}<br>
         Intelligence: ${character.sasia.int}<br>
         Alignment: ${character.sasia.aln} (${alignment})
       `;

      // Append everything to the character container
      characterContainer.appendChild(name);
      characterContainer.appendChild(epithet);
      characterContainer.appendChild(description);
      characterContainer.appendChild(stats);

      // Append to the body or a specific container in your HTML
      document.getElementById('character-list').appendChild(characterContainer);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
