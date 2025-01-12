import json
with open('./concordium.json', 'r') as f:
    data = json.load(f)
markdown = ""
for key, value in data.items():
    name = value.get("name", "")
    animal = value.get("animal", "")
    aspect = value.get("aspect", "")
    weapon = value.get("weapon", "")
    colour = value.get("colour", "")
    power = value.get("power", "")
    species = value.get("species", "")
    sex = value.get("sex", "")
    rank = value.get("rank", "")
    alignment = value.get("alignment", "")
    inverse = value.get("inverse", "")
    epithet = value.get("epithet", "")
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
    def ifNone(item,label):
        if item != "":
            item = f"""
- **{label}**: {item}"""
        return item
    title = f"""

# {name} {gender(rank,sex)}, {animal} {alignment} of {aspect}
"""
    output = title
    output += ifNone(epithet,"Epithet")
    output += ifNone(weapon,"Weapon")
    output += ifNone(colour,"Gear Colour")
    output += ifNone(power,"Power")
    output += ifNone(species,"Species")
    output += ifNone(sex,"Sex")
    output += ifNone(inverse,"Inverse")
    markdown += output
with open('markdown/concordium.md', 'w') as md_file:
    md_file.write(markdown)