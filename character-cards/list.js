fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const sinsList = document.getElementById('sins-list');
    const virtuesList = document.getElementById('virtues-list');

    Object.values(data).forEach(character => {
      const div = document.createElement('div');
      div.innerHTML = `${character.name} (${character.animal})`;

      if (character.alignment === "Sin") {
        sinsList.appendChild(div);
      } else if (character.alignment === "Virtue") {
        virtuesList.appendChild(div);
      }
    });
  })
  .catch(error => console.error('Error loading JSON:', error));