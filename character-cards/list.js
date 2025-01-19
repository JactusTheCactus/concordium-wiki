function downloadPDF() {
  // Select the content to be downloaded as PDF (including styles)
  const element = document.body;

  // Use html2pdf to generate PDF from the content with the styles intact
  html2pdf()
    .from(element)
    .save('concordium.pdf');
}

// Find the element by ID
const descriptionElement = document.getElementById("description");

// Set the text content of the element
descriptionElement.innerHTML = `<p>
  <b>The Concordium</b> was a group of 14 <i>Holy Knights</i>, directly serving the King. 7 of these Holy Knights betrayed the others, framing them for <i>high treason against the kingdom</i>, and sentencing them for a millenium. With this sentencing, the betrayed Holy Knights, now called <b>The Seven Deadly Sins</b>, were further punished with <b>The Capital Curses</b>, from <i>The Blood of The Dead Gods</i>. The other half of <b>The Concordium</b> called themselves <b>The Seven Heavenly Virtues</b>, and continued selling their false tale of the Sins' betrayal.
</p>`;
fetch('../concordium.json')
  .then(response => response.json())
  .then(data => {
    const sinsList = document.getElementById('sins-list');
    const virtuesList = document.getElementById('virtues-list');

    const captains = [];
    const nonCaptains = [];

    // Separate captains from non-captains
    Object.values(data).forEach(character => {
      const div = document.createElement('div');
      div.alignment = character.alignment
      let team = "";
      if (character.alignment === "Sin") {
        team = "The Seven Deadly Sins";
      } else if (character.alignment === "Virtue") {
        team = "The Seven Heavenly Virtues";
      }
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
      var job = `, ${role(character)} of ${team}`;

      if (role(character) === character.rank) {
        job = ""
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
        return rankMap[character.rank] ? rankMap[character.rank][character.sex] || character.rank : character.rank;
      }
      if (character.alignment === "Sin") {
        character.magic = "Curse"
      }
      else if (character.alignment === "Virtue") {
        character.magic = "Blessing"
      }
      div.innerHTML = `
        <h3>${character.name} ${sex(character)}${job}</h3>
      `;
      if (character.epithet !== "") {
        div.innerHTML += `<p><b>"${character.epithet}"</b></p>`;
      }
      if (character.aspect !== "") {
        div.innerHTML += `<li>${character.alignment}: <u>${character.aspect}</u></li>`;
      }
      if (character.animal !== "") {
        div.innerHTML += `<li>${character.magic}: <u>The ${character.magic} of The ${character.animal}</u></li>`;
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
      if (div.alignment === "Sin") {
        sinsList.appendChild(div);
      } else {
        virtuesList.appendChild(div);
      }
    });
    
    nonCaptains.forEach(div => {
      if (div.alignment === "Sin") {
        sinsList.appendChild(div);
      } else {
        virtuesList.appendChild(div);
      }
    });    
  })
  .catch(error => console.error('Error loading JSON:', error));