fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const sinsList = document.getElementById('sins-list');
    const virtuesList = document.getElementById('virtues-list');

    Object.values(data).forEach(character => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${character.name} (${character.animal})`;

      if (character.alignment === "Sin") {
        sinsList.appendChild(listItem);
      } else if (character.alignment === "Virtue") {
        virtuesList.appendChild(listItem);
      }
    });
  })
  .catch(error => console.error('Error loading JSON:', error));