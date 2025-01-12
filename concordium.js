fetch('concordium.json')
  .then(response => response.json()) // Parse the response as JSON
  .then(data => {
    // Assuming your JSON is an array of characters, loop through them
    data.forEach(character => {
      // Dynamically create HTML elements for each character
      const characterContainer = document.createElement('div');
      characterContainer.classList.add('character'); // Add a class for styling

      const name = document.createElement('h2');
      name.textContent = `${character.name} (${character.rank})`;

      const description = document.createElement('p');
      description.textContent = character.description;

      const stats = document.createElement('div');
      stats.innerHTML = `
        <p>Strength: ${character.sasia.str}</p>
        <p>Speed: ${character.sasia.spd}</p>
        <p>Alignment: ${character.sasia.aln}</p>
      `;

      // Append everything to the character container
      characterContainer.appendChild(name);
      characterContainer.appendChild(description);
      characterContainer.appendChild(stats);

      // Append to the body or a specific container in your HTML
      document.getElementById('character-list').appendChild(characterContainer);
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });