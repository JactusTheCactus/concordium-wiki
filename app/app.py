import tkinter as tk
import json

with open("./concordium.json", "r") as file:
    characters = json.load(file)

def update_wraplength(event, label_widget):
    """Update the wraplength of a label widget based on window width."""
    new_wraplength = event.width * 0.9  # 90% of the window width
    label_widget.config(wraplength=new_wraplength)

def display_character(data):
    """Display character details in a new window."""
    info = ""
    char = characters[data]
    magic = "Curse" if char['alignment'] == "Sin" else "Blessing"

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
        return rank_map.get(rank, {}).get(sex, rank)

    # Append content to `info`
    def insert(text, prefix="", suffix=""):
        nonlocal info
        if text:
            info += f"{prefix}{text}{suffix}"

    # Build the info string
    insert(char['name'])
    insert(gender(char['rank'], char['sex']), " ", "\n\n")
    insert(char['animal'], f"{magic}: {magic} of The ", "\n")
    insert(char['weapon'], "Weapon: ", "\n")
    insert(char['colour'], "Gear Colour: ", "\n")
    insert(char['power'], "Power: ", "\n")
    insert(char['species'], "Species: ", "\n")
    insert(char['description'], "\n")

    # Create a new window for character details
    detail_window = tk.Toplevel()
    detail_window.title(char['aspect'].capitalize())

    # Set window size to screen dimensions
    screen_width = detail_window.winfo_screenwidth()
    screen_height = detail_window.winfo_screenheight()
    detail_window.geometry(f"{screen_width}x{screen_height}+0+0")

    # Label for displaying character details
    label_widget = tk.Label(detail_window, text=info, justify="left", padx=10, pady=10, font=("Verdana", 10), wraplength=screen_width)
    label_widget.pack(fill="both", expand=False)

    # Bind the resize event to update wraplength
    detail_window.bind("<Configure>", lambda event: update_wraplength(event, label_widget))

# Main application window
root = tk.Tk()
root.title("Concordium Wiki")

# Set window size to screen dimensions
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()
root.geometry(f"{screen_width}x{screen_height}+0+0")

# Title label
tk.Label(root, text="Concordium Wiki", font=("Verdana", 16)).pack(pady=10)

# Create frames for Sins and Virtues
sins_frame = tk.Frame(root)
sins_frame.pack(side="left", padx=20)

virtues_frame = tk.Frame(root)
virtues_frame.pack(side="right", padx=20)

# Generate buttons for Sins
sins = [char for char in characters if characters[char]['alignment'] == "Sin"]
for sin in sins:
    button = tk.Button(sins_frame, text=characters[sin]['aspect'], command=lambda char=sin: display_character(char))
    button.pack(pady=5, padx=10)

# Generate buttons for Virtues
virtues = [char for char in characters if characters[char]['alignment'] == "Virtue"]
for virtue in virtues:
    button = tk.Button(virtues_frame, text=characters[virtue]['aspect'], command=lambda char=virtue: display_character(char))
    button.pack(pady=5, padx=10)

# Start the main event loop
root.mainloop()