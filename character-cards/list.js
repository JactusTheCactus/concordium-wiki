fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const sinsList = document.getElementById('sins-list');
    const virtuesList = document.getElementById('virtues-list');

    const captains = [];
    const nonCaptains = [];

    // Separate captains from non-captains
    Object.values(data).forEach(character => {
      const div = document.createElement('div');
      let team = "";
      if (character.alignment === "Sin") {
        team = "The Seven Deadly Sins";
      } else if (character.alignment === "Virtue") {
        team = "The Seven Heavenly Virtues";
      }

      const job = character.rank === "Imperatore" ? `, Captain of <u>${team}</u>` : "";

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
        return rankMap[character.rank] ? rankMap[character.rank][character.sex] || character.rank : character.rank;
      }

      div.innerHTML = `
        <h3><i>${character.name} ${sex(character)}, ${character.animal} ${character.alignment} of ${character.aspect}${job}</i></h3>
      `;
      
      if (character.epithet !== "") {
        div.innerHTML += `<p><b>"${character.epithet}"</b></p>`;
      }
      if (character.weapon !== "") {
        div.innerHTML += `<li>Weapon: <u>${character.weapon}</u></li>`;
      }
      if (character.colour !== "") {
        div.innerHTML += `<li>Gear Colour: <u>${character.colour}</u></li>`;
      }
      if (character.power !== "") {
        div.innerHTML += `<li>Power: <u>${character.power}</u></li>`;
      }
      if (character.species !== "") {
        div.innerHTML += `<li>Species: <u>${character.species}</u></li>`;
      }
      if (character.description !== "") {
        div.innerHTML += `<p>${character.description}</p>`;
      }

      if (character.rank === "Imperatore") {
        if (character.alignment === "Sin") {
          captains.push(div);  // Add to captains array for Sins
        } else if (character.alignment === "Virtue") {
          captains.push(div);  // Add to captains array for Virtues
        }
      } else {
        if (character.alignment === "Sin") {
          nonCaptains.push(div);  // Add to non-captains array for Sins
        } else if (character.alignment === "Virtue") {
          nonCaptains.push(div);  // Add to non-captains array for Virtues
        }
      }
    });

    // Append captains first, then the non-captains
    captains.forEach(div => {
      if (div.querySelector('h3').innerText.includes("Sin")) {
        sinsList.appendChild(div);
      } else {
        virtuesList.appendChild(div);
      }
    });

    nonCaptains.forEach(div => {
      if (div.querySelector('h3').innerText.includes("Sin")) {
        sinsList.appendChild(div);
      } else {
        virtuesList.appendChild(div);
      }
    });
  })
  .catch(error => console.error('Error loading JSON:', error));