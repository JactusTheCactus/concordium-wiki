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
      name.textContent = `${character.name} (${character.rank})`;

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

      function sex(character) {return character.rank === "Imperatore" ? (character.sex === "F" ? "Imperatora" : (character.sex === "M" ? "Imperator" : character.rank)) : character.rank;}

      const stats = document.createElement('div');
      stats.innerHTML = `
        ${character.name} ${sex(character.rank)}, ${character.animal} ${character.alignment} of ${character.aspect}
        ${character.weapon}<br>
        ${character.colour}<br>
        ${character.power}<br>
        ${character.species}<br>
        Strength: ${character.sasia.str}<br>
        Arcane: ${character.sasia.arc}<br>
        Speed: ${character.sasia.spd}<br>
        Intelligence: ${character.sasia.int}<br>
        Alignment: ${character.sasia.aln} (${alignment})
      `;

      // Append everything to the character container
      characterContainer.appendChild(name);
      characterContainer.appendChild(description);
      characterContainer.appendChild(stats);

      // Append to the body or a specific container in your HTML
      document.getElementById('character-list').appendChild(characterContainer);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
