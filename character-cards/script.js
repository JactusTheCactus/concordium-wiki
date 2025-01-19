fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const pairsContainer = document.getElementById('pairs-container');
    const processed = new Set(); // Keep track of processed characters
    // Function to create a character div
    function createCharacterDiv(character, type) {
      const div = document.createElement('div');
      div.classList.add(type); // 'sin' or 'virtue'
      if (character.alignment === "Sin") {team = `The Seven Deadly Sins`}
      else if (character.alignment === "Virtue") {team = `The Seven Heavenly Virtues`}
      if (character.rank === "Imperatore") {job = `, Captain of <u>${team}</u>`}
      else {job = ""}
      function sex(character) {
        const rankMap = {
          "Imperatore": { "F": "Imperatora", "M": "Imperator" },
          "Venatorium": { "F": "Venatrix", "M": "Venator"},
          "Ferratorium": { "F": "Ferratrix", "M": "Ferrator"},
          "Dominum": { "F": "Domina", "M": "Dominus"},
          "Luminorium": { "F": "Luminora", "M": "Luminor"},
          "Exaltum": { "F": "Exalta", "M": "Exaltus"},
          "Bellatorium": { "F": "Bellatrix", "M": "Bellator"},
        };
        if (rankMap[character.rank]) {return rankMap[character.rank][character.sex] || character.rank;}
        return character.rank;
      }
      if (character.alignment === "Sin") {
        character.magic = "Curse"
      }
      else if (character.alignment === "Virtue") {
        character.magic = "Blessing"
      }
      div.innerHTML = `
        <h3>${character.name} ${sex(character)}, ${character.alignment} of ${character.aspect}${job}</h3>
      `;
      if (character.epithet !== "") {
      div.innerHTML += `
        <p><b>"${character.epithet}"</b></p>
      `;
      }if (character.animal !== "") {
        div.innerHTML += `
          <li>${character.magic}: <u>The ${character.magic} of the ${character.animal}</u></li>
        `;
        }
      if (character.weapon !== "") {
      div.innerHTML += `
        <li>Weapon: <u>${character.weapon}</u></li>
      `;
      }
      if (character.colour !== "") {
      div.innerHTML += `
        <li>Gear Colour: <u>${character.colour}</u></li>
      `;
      }
      if (character.power !== "") {
      div.innerHTML += `
        <li>Power: <u>${character.power}</u></li>
      `;
      }
      if (character.species !== "") {
      div.innerHTML += `
        <li>Species: <u>${character.species}</u></li>
      `;
      }
      if (character.description !== "") {
      div.innerHTML += `
        <p>${character.description}</p>
      `;
      }
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