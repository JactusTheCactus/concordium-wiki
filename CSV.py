import csv

# Read the CSV file and store data in a list of dictionaries
with open('data.csv', 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    data = list(reader)  # Convert reader to a list to allow multiple iterations

def get(search_name, column_name):
    """Fetches the value of a column for a given aspect."""
    for row in data:  # Use the stored list instead of an exhausted iterator
        if row['aspect'].lower() == search_name.lower():
            return row[column_name] if row[column_name] else 'None'
    return 'None'

def get_aspects():
    """Returns a list of all aspects from the CSV data."""
    return [row['aspect'] for row in data if 'aspect' in row]

def ifnone(text,prefix='',suffix=''):
    if text == 'None':
        return ''
    else:
        return f"{prefix}{text}{suffix}"
    
def role():
    rank = getData('rank')
    role_map = {
        ("Imperatora", "Imperator"): "Captain",
        ("Venatrix", "Venator"): "Hunter",
        ("Ferratrix", "Ferrator"): "Smith",
        ("Domina", "Dominus"): "Warden",
        ("Luminora", "Luminor"): "Seer",
        ("Exalta", "Exaltus"): "Champion",
        ("Bellatrix", "Bellator"): "Warlord"
    }
    for ranks, role in role_map.items():
        if rank in ranks:
            return role
    return rank

def team():
    alignment = getData('alignment')
    team_map = {
        "Sin": "Seven Deadly Sins",
        "Virtue": "Seven Heavenly Virtues"
    }
    return team_map.get(alignment)

output = ''
# Example usage
for aspect in get_aspects():
    def getData(data):
        return get(aspect,data)
    def bullet(data, label=''):
        label_str = f"__{label}__: " if label else ''
        return f"{ifnone(getData(data), f'- {label_str}')}\n"
    if getData('alignment') == 'Sin':
        edict = 'Curse'
    else:
        edict = 'Blessing'
    output += f"""***
# {get(aspect, 'name')} {getData('rank')}, The {getData('alignment')} of {getData('aspect')}<br>The {role()} of The {team()}<br>The {edict} of The {getData('animal')}
"""
    output += f'\n\n{ifnone(getData('epithet'),'_\"','\"_')}\n'
    output += bullet('edictDef')
    output += bullet('weapon','Weapon')
    output += bullet('colour','Gear Colour')
    output += bullet('power','Power')
    output += bullet('species','Species')
    output += bullet('description')

with open('CSV.md', 'w', encoding='utf-8') as file:
    file.write(output.replace(r'\n', '<br>').replace('\n\n','\n').strip())