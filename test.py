def gender(character):
    if character.rank == "Imperatore":
        if character.sex == "F": return "Imperatora"
        elif character.sex == "M": return "Imperator"
        else: return character.rank

"Venatorium"
"Ferratorium"
"Dominum"
"Luminorium"
"Exaltum"
"Bellatorium"