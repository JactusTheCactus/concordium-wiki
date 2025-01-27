import json

# Load the JSON data from a file
with open('concordium.json', 'r') as file:
    data = json.load(file)

list = [
    "weapon",
    "power",
    "species"
]
output = ""
# Iterate through each character and their attributes
for character, attributes in data.items():
    if data[character]['alignment'] == "Virtue":
        output += f"""# {character.capitalize()}
"""
        for attribute, value in attributes.items():
            if attribute in list:
                output += f"""  - __{attribute.capitalize()}__
"""
                if value != "":
                    output += f"""    - _{value.capitalize()}_
"""

with open("output.md","w") as file:
    file.write(output)