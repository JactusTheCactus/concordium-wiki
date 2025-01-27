import json
with open('./concordium.json', 'r') as f:
    data = json.load(f)
def ifNone(item,label):
    global alignment
    if item != "":
        newLabel = f"__{label}__"
        if label in [
            "Description",
            "Definition"
        ]:
            out = f"""- {newLabel}:
    - {item}
"""
        else:
            out = f"""- {newLabel}: {item}
"""
    else: out = ""
    return out
markdown = ""
sinMD = ""
virtueMD = ""
concordiumMD = ""
README = ""
firstSin = True
sinTitle = """## The Seven Deadly Sins
"""
firstVirtue = True
virtueTitle = """## The Seven Heavenly Virtues
"""
docTitle = f"""# __The Concordium__
__The Concordium__ was a group of 14 _Holy Knights_, directly serving the King. 7 of these Holy Knights betrayed the others, framing them for _high treason against the kingdom_, and sentencing them for a millenium. with this sentencing, the betrayed Holy Knights, now called __The Seven Deadly Sins__, were further punished with __The Capital Curses__, from _The Blood of The Dead Gods_. The other half of __The Concordium__ called themselves __The Seven Heavenly Virtues__, and continued selling their false tale of the Sins' betrayal.
"""
sin_ = True
virtue_ = False
for key, value in data.items():
    name = value.get("name", "")
    animal = value.get("animal", "")
    aspect = value.get("aspect", "")
    colour = value.get("colour", "")
    species = value.get("species","")
    sex = value.get("sex", "")
    rank = value.get("rank", "")
    alignment = value.get("alignment", "")
    if alignment == "Sin": edict = "Curse"
    elif alignment == "Virtue": edict = "Blessing"

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
    title = f"""### {name} {gender(rank,sex)}
"""
    output = title
    output += ifNone(value.get("epithet", ""),"Epithet")
    output += ifNone(f"The {edict} of the {colour} {animal}",edict)
    output += ifNone(value.get("edictDef", ""), "Definition")
    output += ifNone(aspect,alignment)
    output += ifNone(value.get("weapon", ""),"Weapon")
    output += ifNone(value.get("power", ""),"Power")
    output += ifNone(species,"Species")
    output += ifNone(value.get("speciesDef", ""), "Definition")
    output += ifNone(value.get("description", ""),"Description")
    if alignment == "Sin":
        if firstSin:
            sinMD += sinTitle
            firstSin = False
        sinMD += output
    if alignment == "Virtue":
        if firstVirtue:
            virtueMD += virtueTitle
            firstVirtue = False
        virtueMD += output
concordiumMD = f"""{docTitle}
{sinMD}
{virtueMD}"""
sinMD = f"""{docTitle}
{sinMD}"""
virtueMD = f"""{docTitle}
{virtueMD}"""
with open('markdown/sin.md', 'w') as file:
    file.write(sinMD)
with open('markdown/virtue.md', 'w') as file:
    file.write(virtueMD)
with open('README.md', 'w') as file:
    file.write(concordiumMD)