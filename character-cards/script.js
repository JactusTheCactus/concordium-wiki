// Assuming the JSON is saved as 'data.json'
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const sinsContainer = document.getElementById('sins');
    const virtuesContainer = document.getElementById('virtues');

    // Iterate over each key in the JSON object
    for (const key in data) {
      const character = data[key];
      const characterDiv = document.createElement('div');
      characterDiv.classList.add(character.alignment.toLowerCase()); // Add 'sin' or 'virtue' as class
      characterDiv.innerHTML = `
        <h3>${character.name}</h3>
        <p><strong>Aspect:</strong> ${character.aspect}</p>
        <p><strong>Animal:</strong> ${character.animal || 'N/A'}</p>
        <p><strong>Weapon:</strong> ${character.weapon || 'N/A'}</p>
        <p><strong>Power:</strong> ${character.power || 'N/A'}</p>
        <p><strong>Rank:</strong> ${character.rank}</p>
        <p><strong>Alignment:</strong> ${character.alignment}</p>
        <p><strong>Epithet:</strong> ${character.epithet || 'N/A'}</p>
        <p><strong>Description:</strong> ${character.description || 'N/A'}</p>
      `;

      // Append to the appropriate container
      if (character.alignment.toLowerCase() === 'sin') {
        sinsContainer.appendChild(characterDiv);
      } else if (character.alignment.toLowerCase() === 'virtue') {
        virtuesContainer.appendChild(characterDiv);
      }
    }
  })
  .catch(error => console.error('Error loading JSON:', error));