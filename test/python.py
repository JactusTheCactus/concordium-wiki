import json

# Open and load the JSON file
with open("concordium.json", 'r') as file:
    json_file = json.load(file)

skipList = [
    "speciesDef",
    "sasia",
    "alignment",
    "inverse",
    "aspect"
    ]

def to_html(data, depth=0):
    # Define some class or tag conditions based on depth
    depth_classes = [
        "depth-0",  # class for level 0
        "depth-1",  # class for level 1
        "depth-2",  # class for level 2
        # Add more classes or tags as needed
    ]
    # Define the style tag for different depths
    style_tag = """
    <style>
        .depth-0 {
            text-decoration: underline;
            font-weight: bold;
            border: 2px solid black;
            background-color: #f0f0f0;
            padding: 5px;
            margin-bottom: 10px;
            font-size: 3em;
            text-transform: capitalize;
        }
        .depth-1 {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 2em;
        }
        .depth-1::after {
            content: ":";
        }
        .depth-2 {
            font-style: italic;
            font-size: 1.5em;
        }
        table {
            font-size: 1.5rem;
            font-family: Verdana;
            width: auto;  /* Automatically adjust the width of columns */
            border-collapse: collapse;  /* Ensures borders collapse into a single line */
            table-layout: auto;  /* Let the table adjust to content */
        }
        td {
            border: 1px solid #ddd;
            padding: 8px;  /* Adjust padding for content alignment */
            text-align: center;  /* Align text to the left (or change as needed) */
            word-wrap: break-word;  /* Prevent overflow and keep content within the cell */
            overflow: hidden;  /* Hide overflowed content */
        }
        /* Specific handling for nested depth 2 tables */
        .depth-2 {
            padding-left: 20px;  /* Additional left padding for nested items */
        }
    </style>
    """
    # Add the style tag to the top of the HTML output
    html_output = style_tag
    # Start the table tag once at the beginning
    html_output += "<table>"

    if isinstance(data, dict):
        # Recursively add rows for each key-value pair
        for k, v in data.items():
            if k not in skipList:  # Adjust according to your filtering needs
                html_output += f"<tr>"
                html_output += f"<td class='{depth_classes[depth % len(depth_classes)]}'>{k}</td>"
                html_output += f"<td>{to_html(v, depth + 1)}</td>"
                html_output += f"</tr>"
    else:
        # Add the value as a row
        html_output += f"<tr><td class='{depth_classes[depth % len(depth_classes)]}' colspan='2'>{str(data)}</td></tr>"

    # Close the table tag at the end
    html_output += "</table>"
    return html_output

with open("test/output.html", "w") as file:
    file.write(to_html(json_file))