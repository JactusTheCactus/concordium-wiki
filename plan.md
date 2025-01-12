## this is the draft for the concordant page
```js
hyperLink.addClass(`<u>${hyperLink}</u>`)

if ${character.alignment} == "Sin" {
    ${bgColour.primary} = ${Red}
    ${bgColour.secondary} = ${Orange}
    ${bgColour.tertiary} = ${Yellow}
}
elsif ${character.alignment} == "Virtue" {
    ${bgColour.primary} = ${Purple}
    ${bgColour.secondary} = ${Blue}
    ${bgColour.tertiary} = ${Green}
}

`${character.name} ${character.rank.gendered}, ${character.animal} ${character.alignment} of ${character.aspect}
"${character.epithet}"

<i>"${character.quote}"</i>

- ${character.weapon}
- ${character.colour}
- ${character.power}
- ${character.species}
- ${character.inverse.hyperLink}

SASIA scale:
Strength: ${progressBar(character.sasia.str)}
|=======     | 7
Arcane: ${progressBar(character.sasia.arc)}
|===         | 3
Speed: ${progressBar(character.sasia.spd)}
|==========  | 10
Intelligence: ${progressBar(character.sasia.int)}
|======      | 6
Alignment: ${progressBar(character.sasia.aln)}
|   ===|      | -3 (Sin)

${character.description}

Other ${character.alignment}s:
${random(character.hyperLink)}
${random(character.hyperLink)}
${random(character.hyperLink)}`
```
## this isn't supposed to be accurate JS, it's just a bastard child of `Python`, `JavaScript` and `HTML` that I'm using to remember the structure for variables and objects _(though, i tried to keep it as close as my very limited knowledge of `JavaScript` would allow without looking shit up)_