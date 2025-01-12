import json

def json_to_variables(json_file):
    # Load the JSON data
    with open(json_file, 'r') as f:
        data = json.load(f)
    for character, attributes in data.items():
        for key, value in attributes.items():
            globals()[f"{character}.{key}"] = value
            
    print("Variables created successfully.")

json_to_variables('concordium.json')

# You can now use the variables like:
# For example, if a character has "name" as a key, you can access it as:
# print(Character.name)