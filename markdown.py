import json

def json_to_custom_strings(json_file, custom_template):
    # Load the JSON data
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    # Iterate through each character
    for character, attributes in data.items():
        # Dynamically unpack the keys and values into the custom template
        try:
            print(custom_template.format(character=character, **attributes))
        except KeyError as e:
            print(f"Missing key {e} in the data for character {character}. Skipping.")

# Example usage
custom_string_template = (
    "{character} wields a {Weapon} and has the power of {Power}. "
    "They are aligned as a {Alignment} and their rank is {Rank}."
)

json_to_custom_strings('data.json', custom_string_template)