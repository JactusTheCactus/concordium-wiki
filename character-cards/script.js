// Fetch JSON data
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const flexContainer = document.querySelector('.flex-container');

    // Separate sins and virtues
    const sins = data.filter(item => item.alignment === 'Sin');
    const virtues = data.filter(item => item.alignment === 'Virtue');

    // Add sins to the container
    sins.forEach(sin => {
      const sinDiv = document.createElement('div');
      sinDiv.classList.add('flex-sin');
      sinDiv.textContent = sin.name;
      flexContainer.appendChild(sinDiv);
    });

    // Add virtues to the container
    virtues.forEach(virtue => {
      const virtueDiv = document.createElement('div');
      virtueDiv.classList.add('flex-virtue');
      virtueDiv.textContent = virtue.name;
      flexContainer.appendChild(virtueDiv);
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));