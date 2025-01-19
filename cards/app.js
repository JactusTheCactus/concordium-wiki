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
        header.textContent = character.name;
        card.appendChild(header);
        
        // Card body
        const body = document.createElement('div');
        body.classList.add('card-body');
        
        // Add character details to the body
        body.innerHTML = `
          <div class="attribute"><strong>Aspect:</strong> ${character.aspect}</div>
          <div class="attribute"><strong>Weapon:</strong> ${character.weapon}</div>
          <div class="attribute"><strong>Species:</strong> ${character.species}</div>
          <div class="attribute"><strong>Power:</strong> ${character.power}</div>
          <div class="attribute"><strong>Rank:</strong> ${character.rank}</div>
          <div class="attribute"><strong>Alignment:</strong> ${character.alignment}</div>
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
