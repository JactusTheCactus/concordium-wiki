# cd app; pyinstaller --onefile --windowed --add-data "../concordium.json:." --name="ConcordiumWiki" --distpath="" app.py

import tkinter as tk
import json
import os
import sys

# Determine the path to the parent directory
if getattr(sys, 'frozen', False):
    # If running as an executable, use the directory of the executable
    app_path = os.path.dirname(sys.executable)
else:
    # If running in a normal Python environment, use the directory of the script
    app_path = os.path.dirname(__file__)

# Navigate to the parent directory
parent_dir = os.path.dirname(app_path)

# Construct the path to concordium.json in the parent directory
json_path = os.path.join(parent_dir, 'concordium.json')

with open(json_path, "r") as file:
    characters = json.load(file)

with open(json_path, "r") as file:
    characters = json.load(file)

def update_wraplength(event, label_widget):
    """Update the wraplength of a label widget based on window width."""
    new_wraplength = event.width * 0.9  # 90% of the window width
    label_widget.config(wraplength=new_wraplength)

def get_font_size(screen_height):
    """Calculate font size based on screen height."""
    return int(screen_height * 0.02)  # % of the screen height

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
    
    def job(char):
      roles = {
        "Imperatore": "Captain",
        "Venatorium": "Hunter",
        "Ferratorium": "Smith",
        "Dominum": "Warden",
        "Luminorium": "Seer",
        "Exaltum": "Champion",
        "Bellatorium": "Warlord",
      }
      return f"{roles.get(char['rank'], char['rank'])}"
    
    def team(char):
      teams = {
        "Sin": "The Seven Deadly Sins",
        "Virtue": "The Seven Heavenly Virtues"
      }
      return f"{teams.get(char['alignment'], char['alignment'])}"

    # Append content to `info`
    def insert(text, prefix="", suffix=""):
      nonlocal info
      if text:
        info += f"{prefix}{text}{suffix}"

    # Build the info string
    insert(char['name'])
    insert(gender(char['rank'], char['sex']), " ", "\n")
    insert(job(char), "", f" of {team(char)}\n")
    insert(char['animal'], f"{magic} of The ", "\n\n")
    insert(char['aspect'], f"{char['alignment']}: ", "\n")
    insert(char['weapon'], "Weapon: ", "\n")
    insert(char['colour'], "Gear Colour: ", "\n")
    insert(char['power'], "Power: ", "\n")
    insert(char['species'], "Species: ", "\n")
    insert(char['description'], "\n")

    def fullname(char):
      def ifnone(text,prefix="",suffix=""):
        if text is not None:
          return f"{prefix}{text}{suffix}"
        else:
          return ""
      full = ifnone(char['name'])
      full += ifnone(gender(char['rank'],char['sex'])," ",", ")
      full += ifnone(char['animal'])
      full += ifnone(char['alignment']," ")
      full += ifnone(char['aspect']," of ")
      full += ifnone(job(char),", ",f" of {team(char)}")
      return full

    # Create a new window for character details
    detail_window = tk.Toplevel()
    detail_window.title(fullname(char))

    # Set window size to screen dimensions
    screen_width = detail_window.winfo_screenwidth()
    screen_height = detail_window.winfo_screenheight()
    detail_window.geometry(f"{screen_width}x{screen_height}+0+0")

    # Calculate font size based on screen height
    font_size = get_font_size(screen_height)

    # Label for displaying character details
    label_widget = tk.Label(detail_window, text=info, justify="left", padx=10, pady=10, font=("Verdana", font_size), wraplength=screen_width)
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

# Calculate font size based on screen height
font_size = get_font_size(screen_height)

# Title label
tk.Label(root, text="Concordium Wiki", font=("Verdana", 2 * font_size)).pack(pady=10)

# Create frames for Sins and Virtues
sins_frame = tk.Frame(root)
sins_frame.pack(side="left", padx=20)

virtues_frame = tk.Frame(root)
virtues_frame.pack(side="right", padx=20)

# Generate buttons for Sins
sins = [char for char in characters if characters[char]['alignment'] == "Sin"]
for sin in sins:
    button = tk.Button(sins_frame, text=characters[sin]['aspect'], command=lambda char=sin: display_character(char), font=("Verdana", font_size))
    button.pack(pady=5, padx=10)

# Generate buttons for Virtues
virtues = [char for char in characters if characters[char]['alignment'] == "Virtue"]
for virtue in virtues:
    button = tk.Button(virtues_frame, text=characters[virtue]['aspect'], command=lambda char=virtue: display_character(char), font=("Verdana", font_size))
    button.pack(pady=5, padx=10)

# Start the main event loop
root.mainloop()
