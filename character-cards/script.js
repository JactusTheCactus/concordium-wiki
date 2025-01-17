fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const pairsContainer = document.getElementById('pairs-container');
    const processed = new Set(); // Keep track of processed characters
    // Function to create a character div
    function createCharacterDiv(character, type) {
      const div = document.createElement('div');
      div.classList.add(type); // 'sin' or 'virtue'
      div.innerHTML = `
        <h3>${character.name} ${character.rank}, ${character.animal} ${character.alignment} of ${character.aspect}</h3>
      `;
      if (character.epithet !== "") {
      div.innerHTML += `
        <p><b>"${character.epithet}"</b></p>
      `;
      }
      div.innerHTML += `
        <li>Weapon: <u>${character.weapon}</u></li>
        <li>Gear Colour: <u>${character.colour}</u></li>
        <li>Power: <u>${character.power}</u></li>
        <li>Species: <u>${character.species}</u></li>
        <p>${character.description}</p>
      `;
      return div;
    }

    for (const key in data) {
      const character = data[key];
      if (processed.has(key)) continue; // Skip already processed characters

      // Find the inverse
      const inverseKey = character.inverse;
      const inverseCharacter = data[inverseKey];

      // Create a flex row for the pair
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('flex-row');

      // Determine alignment to position appropriately
      if (character.alignment.toLowerCase() === 'sin') {
        rowDiv.appendChild(createCharacterDiv(character, 'sin'));
        rowDiv.appendChild(createCharacterDiv(inverseCharacter, 'virtue'));
      } else {
        rowDiv.appendChild(createCharacterDiv(inverseCharacter, 'sin'));
        rowDiv.appendChild(createCharacterDiv(character, 'virtue'));
      }

      // Add row to container
      pairsContainer.appendChild(rowDiv);

      // Mark both characters as processed
      processed.add(key);
      processed.add(inverseKey);
    }
  })
  .catch(error => console.error('Error loading JSON:', error));