fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const sinsList = document.getElementById('sins-list');
    const virtuesList = document.getElementById('virtues-list');

    Object.values(data).forEach(character => {
      const div = document.createElement('div');
      if (character.alignment === "Sin") {team = `The Seven Deadly Sins`}
      else if (character.alignment === "Virtue") {team = `The Seven Heavenly Virtues`}
      if (character.rank === "Imperatore") {job = `, Captain of <u>${team}</u>`}
      else {job = ""}
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
      div.innerHTML = `
        <h3>${character.name} ${sex(character)}, ${character.animal} ${character.alignment} of ${character.aspect}${job}</h3>
      `;
      if (character.epithet !== "") {
      div.innerHTML += `
        <p><b>"${character.epithet}"</b></p>
      `;
      }
      if (character.weapon !== "") {
      div.innerHTML += `
        <li>Weapon: <u>${character.weapon}</u></li>
      `;
      }
      if (character.colour !== "") {
      div.innerHTML += `
        <li>Gear Colour: <u>${character.colour}</u></li>
      `;
      }
      if (character.power !== "") {
      div.innerHTML += `
        <li>Power: <u>${character.power}</u></li>
      `;
      }
      if (character.species !== "") {
      div.innerHTML += `
        <li>Species: <u>${character.species}</u></li>
      `;
      }
      if (character.description !== "") {
      div.innerHTML += `
        <p>${character.description}</p>
      `;
      }

      if (character.alignment === "Sin") {
        sinsList.appendChild(div);
      } else if (character.alignment === "Virtue") {
        virtuesList.appendChild(div);
      }
    });
  })
  .catch(error => console.error('Error loading JSON:', error));