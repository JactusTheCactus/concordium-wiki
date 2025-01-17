fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const sinsList = document.getElementById('sins-list');
    const virtuesList = document.getElementById('virtues-list');

    for (const key in data) {
      const character = data[key];
      if (character.alignment === "Sin") {
        const li = document.createElement('li');
        li.innerHTML = `${character.name} (${character.animal})`;
        sinsList.appendChild(li);
      } else if (character.alignment === "Virtue") {
        const li = document.createElement('li');
        li.innerHTML = `${character.name} (${character.animal})`;
        virtuesList.appendChild(li);
      }
    }
  })
  .catch(error => console.error('Error loading JSON:', error));