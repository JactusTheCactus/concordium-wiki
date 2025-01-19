document.addEventListener('DOMContentLoaded', () => {
  // Fetch the JSON data
  fetch('../concordium.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('card-container');
      
      // Iterate over each character in the data
      Object.values(data).forEach(character => {
        // Create a card for each character
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Card header
        const header = document.createElement('div');
        header.classList.add('card-header');
        header.textContent = `${character.name} ${character.rank}`;
        card.appendChild(header);
        
        // Card body
        const body = document.createElement('div');
        body.classList.add('card-body');
        
        // Add character details to the body
        body.innerHTML = `
          <div class="attribute">Aspect: ${character.aspect}</div>
          <div class="attribute">Weapon: ${character.weapon}</div>
          <div class="attribute">Species: ${character.species}</div>
          <div class="attribute">Power: ${character.power}</div>
          <div class="attribute">Alignment: ${character.alignment}</div>
        `;
        card.appendChild(body);
        
        // Card footer
        const footer = document.createElement('div');
        footer.classList.add('card-footer');
        footer.textContent = `Inverse: ${character.inverse}`;
        card.appendChild(footer);

        // Append the card to the container
        container.appendChild(card);
      });
    })
    .catch(error => console.error('Error loading the JSON data:', error));
});
