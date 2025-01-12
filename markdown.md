import json

def json_to_md(json_file, output_md):
    """
    Converts a JSON file to a Markdown file.
    
    Args:
        json_file (str): Path to the JSON file.
        output_md (str): Path to the output Markdown file.
    """
    try:
        # Load JSON data
        with open(json_file, 'r') as f:
            data = json.load(f)

        with open(output_md, 'w') as md:
            for key, value in data.items():
                # Write a header for each object
                md.write(f"# {key}\n\n")
                
                # Write details of each object as a list
                if isinstance(value, dict):
                    for sub_key, sub_value in value.items():
                        md.write(f"- **{sub_key.capitalize()}**: {sub_value}\n")
                elif isinstance(value, list):
                    md.write(f"- **Items**:\n")
                    for item in value:
                        md.write(f"  - {item}\n")
                else:
                    md.write(f"- **Value**: {value}\n")
                
                md.write("\n")  # Add a blank line for readability
        print(f"Markdown file generated at: {output_md}")
    except Exception as e:
        print(f"Error: {e}")

# Replace with your JSON file path and desired Markdown output file
json_file = "concordium.json"  # Path to your JSON file
output_md = "concordium.md"  # Desired path for the Markdown file

json_to_md(json_file, output_md)