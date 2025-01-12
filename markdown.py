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
    "{character} wields a {weapon} and has the power of {power}. "
    "They are aligned as a {alignment} and their rank is {rank}."
)

json_to_custom_strings('concordium.json', custom_string_template)