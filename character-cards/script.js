fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const sinsContainer = document.getElementById('sins');
    const virtuesContainer = document.getElementById('virtues');

    for (const key in data) {
      const character = data[key];
      const characterDiv = document.createElement('div');
      characterDiv.classList.add(character.alignment.toLowerCase()); // 'sin' or 'virtue'
      characterDiv.innerHTML = `
        <h3>${character.name}</h3>
        <p><strong>Aspect:</strong> ${character.aspect}</p>
        <p><strong>Animal:</strong> ${character.animal || 'N/A'}</p>
        <p><strong>Weapon:</strong> ${character.weapon || 'N/A'}</p>
        <p><strong>Power:</strong> ${character.power || 'N/A'}</p>
        <p><strong>Rank:</strong> ${character.rank}</p>
        <p><strong>Epithet:</strong> ${character.epithet || 'N/A'}</p>
        <p><strong>Description:</strong> ${character.description || 'N/A'}</p>
      `;

      // Append to the correct column
      if (character.alignment.toLowerCase() === 'sin') {
        sinsContainer.appendChild(characterDiv);
      } else if (character.alignment.toLowerCase() === 'virtue') {
        virtuesContainer.appendChild(characterDiv);
      }
    }
  })
  .catch(error => console.error('Error loading JSON:', error));