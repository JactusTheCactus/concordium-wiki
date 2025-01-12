import json

# Step 1: Read the JSON data
with open('concordium.json', 'r') as f:
    data = json.load(f)

# Step 2: Save each key for each object in variables

output = ""

for key, value in data.items():
    name = value.get("name")
    animal = value.get("animal")
    aspect = value.get("aspect")
    weapon = value.get("weapon")
    colour = value.get("colour")
    power = value.get("power")
    species = value.get("species")
    sex = value.get("sex", "")  # sex may not be present for all characters
    rank = value.get("rank")
    alignment = value.get("alignment")
    inverse = value.get("inverse")
    epithet = value.get("epithet", "")  # epithet may be empty

    # Step 3: Use those objects and variables to write a string
    output += f"""# {name} ({aspect})

- **Animal**: {animal}
- **Weapon**: {weapon}
- **Colour**: {colour}
- **Power**: {power}
- **Species**: {species}
- **Sex**: {sex if sex else 'Not specified'}
- **Rank**: {rank}
- **Alignment**: {alignment}
- **Inverse**: {inverse}
- **Epithet**: {epithet if epithet else 'None'}

    """

    # Step 4: Write that string as an MD file
    with open('concordium.md', 'w') as md_file:
        md_file.write(output)

print("Markdown files have been created.")