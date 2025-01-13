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
README = ""
firstSin = True
sinTitle = """
## The Seven Deadly Sins
"""
firstVirtue = True
virtueTitle = """
## The Seven Heavenly Virtues
"""
docTitle = f"""
# __The Concordium__

__The Concordium__ was a group of 14 _Holy Knights_, directly serving the King. 7 of these Holy Knights betrayed the others, framing them for _high treason against the kingdom_, and sentencing them for a millenium. with this sentencing, the betrayed Holy Knights, now called __The Seven Deadly Sins__, were further punished with __The Capital Curses__, from _The Blood of The Dead Gods_. The other half of __The Concordium__ called themselves __The Seven Heavenly Virtues__, and continued selling their false tale of the Sins' betrayal.
"""
sin_ = "Y"
virtue_ = "n"
for key, value in data.items():
    name = value.get("name", "")
    animal = value.get("animal", "")
    aspect = value.get("aspect", "")
    weapon = ifNone(value.get("weapon", ""),"Weapon")
    colour = value.get("colour", "")
    power = ifNone(value.get("power", ""),"Power")
    species = ifNone(value.get("species", ""),"Species")
    sex = value.get("sex", "")
    rank = value.get("rank", "")
    alignment = value.get("alignment", "")
    if alignment == "Sin": mark = "Curse"
    elif alignment == "Virtue": mark = "Blessing"
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

### {name} {gender(rank,sex)}"""
    output = title
    output += epithet
    output += ifNone(f"The {mark} of the {colour} {animal}",mark)
    output += ifNone(aspect,alignment)
    output += weapon
    output += power
    output += species
    output += description
    if firstSin and firstVirtue:
        markdown += docTitle
        README += docTitle
    if alignment == "Sin":
        if firstSin:
            if sin_ != "n".lower():
                markdown += sinTitle
            README += sinTitle
            firstSin = False
        if sin_ != "n".lower():
            markdown += output
    if alignment == "Virtue":
        if firstVirtue:
            if virtue_ != "n".lower():
                markdown += virtueTitle
            README += virtueTitle
            firstVirtue = False
        if virtue_ != "n".lower():
            markdown += output
    README += output
with open('markdown/concordium.md', 'w') as md_file:
    md_file.write(markdown)
with open('README.md', 'w') as md_file:
    md_file.write(README)