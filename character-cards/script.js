fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const pairsContainer = document.getElementById('pairs-container');
    const processed = new Set(); // Keep track of processed characters

    for (const key in data) {
      const character = data[key];
      if (processed.has(key)) continue; // Skip already processed characters

      // Find the inverse
      const inverseKey = character.inverse;
      const inverseCharacter = data[inverseKey];

      // Create a flex row for the pair
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('flex-row');

      // Create elements for the sin and virtue
      const sinDiv = document.createElement('div');
      sinDiv.classList.add('sin');
      sinDiv.innerHTML = `
        <h3>${character.name}</h3>
        <p><strong>Aspect:</strong> ${character.aspect}</p>
        <p><strong>Rank:</strong> ${character.rank}</p>
      `;

      const virtueDiv = document.createElement('div');
      virtueDiv.classList.add('virtue');
      virtueDiv.innerHTML = `
        <h3>${inverseCharacter.name}</h3>
        <p><strong>Aspect:</strong> ${inverseCharacter.aspect}</p>
        <p><strong>Rank:</strong> ${inverseCharacter.rank}</p>
      `;

      // Append both to the row
      if (character.alignment.toLowerCase() === 'sin') {
        rowDiv.appendChild(sinDiv);
        rowDiv.appendChild(virtueDiv);
      } else {
        rowDiv.appendChild(virtueDiv);
        rowDiv.appendChild(sinDiv);
      }

      // Add row to container
      pairsContainer.appendChild(rowDiv);

      // Mark both characters as processed
      processed.add(key);
      processed.add(inverseKey);
    }
  })
  .catch(error => console.error('Error loading JSON:', error));