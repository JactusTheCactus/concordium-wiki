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

        function role(character) {
          const roles = {
            "Imperatore": "Captain",
            "Venatorium": "Hunter",
            "Ferratorium": "Smith",
            "Dominum": "Warden",
            "Luminorium": "Seer",
            "Exaltum": "Champion",
            "Bellatorium": "Warlord",
          };
          return roles[character.rank] || character.rank;
        }
        
        function sex(character) {
          const rankMap = {
            "Imperatore": { "F": "Imperatora", "M": "Imperator" },
            "Venatorium": { "F": "Venatrix", "M": "Venator"},
            "Ferratorium": { "F": "Ferratrix", "M": "Ferrator"},
            "Dominum": { "F": "Domina", "M": "Dominus"},
            "Luminorium": { "F": "Luminora", "M": "Luminor"},
            "Exaltum": { "F": "Exalta", "M": "Exaltus"},
            "Bellatorium": { "F": "Bellatrix", "M": "Bellator"},
          };
          if (rankMap[character.rank]) {return rankMap[character.rank][character.sex] || character.rank;}
          return character.rank;
        }

        var sex_ = sex(character)
        var role_ = role(character)

        function addattribute(attribute,yn,label) {
          if (yn === `y`) {
            body.innerHTML += `
              <div class="atribute">${label}: <b>${attribute}</div>
            `
          }
          else {
            body.innerHTML += `
              <div class="atribute"><b>${attribute}</div>
            `
          }
        }

        if (character.alignment === "Sin") {
          team = `The Seven Deadly Sins`
        }
        else if (character.alignment === "Virtue") {
          team = `The Seven Heavenly Virtues`
        }

        // Card header
        const header = document.createElement('div');
        header.classList.add('card-header');
        header.textContent = `${character.name} ${sex_}`;
        card.appendChild(header);
        
        // Card body
        const body = document.createElement('div');
        body.classList.add('card-body');
        
        // Add character details to the body
        body.innerHTML = ``
        addattribute(`${role_} of ${team}`,`n`)
        addattribute(character.aspect,`y`,`Aspect`)
        addattribute(character.weapon,`y`,`Weapon`)
        addattribute(character.species,`y`,`Species`)
        addattribute(character.power,`y`,`Power`)
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
