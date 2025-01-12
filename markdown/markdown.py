import json
with open('./concordium.json', 'r') as f:
    data = json.load(f)
def ifNone(item,label):
        if item != "":
            if label != "Description":
                item = f"""
- **{label}**: {item}"""
            else: item = f"""

**{label}**:
{item}"""
        return item
markdown = ""
sin_ = input("Sins? Y/n ")
virtue_ = input("Virtues? Y/n ")
for key, value in data.items():
    name = value.get("name", "")
    animal = value.get("animal", "")
    aspect = value.get("aspect", "")
    weapon = ifNone(value.get("weapon", ""),"Weapon")
    colour = ifNone(value.get("colour", ""),"Colour")
    power = ifNone(value.get("power", ""),"Power")
    species = ifNone(value.get("species", ""),"Species")
    sex = value.get("sex", "")
    rank = value.get("rank", "")
    alignment = value.get("alignment", "")
    epithet = ifNone(value.get("epithet", ""),"Epithet")
    description = ifNone(value.get("description", ""),"Description")

    def gender(rank, sex):
        rank_map = {
            "Imperatore": {"F": "Imperatora", "M": "Imperator"},
            "Venatorium": {"F": "Venatrix", "M": "Venator"},
            "Ferratorium": {"F": "Ferratrix", "M": "Ferrator"},
            "Dominum": {"F": "Domina", "M": "Dominus"},
            "Luminorium": {"F": "Luminora", "M": "Luminor"},
            "Exaltum": {"F": "Exalta", "M": "Exaltus"},
            "Bellatorium": {"F": "Bellatrix", "M": "Bellator"},
        }
        if rank in rank_map:
            return rank_map[rank].get(sex, rank)
        return rank
    title = f"""

# {name} {gender(rank,sex)}, {animal} {alignment} of {aspect}"""
    output = title
    output += epithet
    output += weapon
    output += colour
    output += power
    output += species
    output += description
    if (sin_ != "n" and alignment == "Sin") or (virtue_ != "n" and alignment == "Virtue"):
        markdown += output
with open('markdown/concordium.md', 'w') as md_file:
    md_file.write(markdown)