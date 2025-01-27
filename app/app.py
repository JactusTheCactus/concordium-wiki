"""
cd app; pyinstaller --onefile --windowed --add-data "../concordium.json:." --name="ConcordiumWiki" --distpath="" app.py
"""

import tkinter as tk
import ttkbootstrap as ttk  # Install with: pip install ttkbootstrap
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
    # Update the wraplength of a label widget based on window width.
    new_wraplength = event.width * 0.9  # 90% of the window width
    label_widget.config(wraplength=new_wraplength)

def get_font_size(screen_height):
    # Calculate font size based on screen height.
    return int(screen_height * 0.02)  # % of the screen height

def display_character(data):
    # Display character details in a new window.
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
    insert(char['description'], "\nDescription:\n")

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
    detail_window.state('zoomed')

    # Calculate font size based on screen height
    font_size = get_font_size(screen_height)

    # Label for displaying character details
    label_widget = tk.Label(detail_window, text=info, justify="left", padx=10, pady=10, font=("Verdana", font_size), wraplength=screen_width)
    label_widget.pack(fill="both", expand=False)

    # Bind the resize event to update wraplength
    detail_window.bind("<Configure>", lambda event: update_wraplength(event, label_widget))

# Initialize the main application window
root = ttk.Window(themename="darkly")  # Choose a theme like 'darkly', 'lumen', etc.
root.title("Concordium Wiki")

# Set window size to screen dimensions
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()
root.geometry(f"{screen_width}x{screen_height}+0+0")
root.state('zoomed')

# Define global style configurations
font_size = int(screen_height * 0.02)
header_font = ("Verdana", 2 * font_size)
button_font = ("Verdana", font_size)
label_font = ("Verdana", font_size)
bg_color = root.style.colors.primary  # Use primary theme color for background

# Create a styled title label
title_label = ttk.Label(root, text="Concordium Wiki", font=header_font, anchor="center")
title_label.pack(pady=20)

colour = {
  "red":"#ff0000",
  "orange":"#ff8800",
  "yellow":"#ffff00",
  "green":"#00ff00",
  "blue":"#0000ff",
  "purple":"#ff00ff"
}

# Define a custom style for the buttons
style = ttk.Style()
style.configure("Custom.TButton", font=button_font)

style.configure("red.TFrame", background=colour["red"], relief="raised", borderwidth=5)
style.configure("orange.TFrame", background=colour["orange"], relief="raised", borderwidth=5)
style.configure("yellow.TFrame", background=colour["yellow"], relief="raised", borderwidth=5)
style.configure("green.TFrame", background=colour["green"], relief="raised", borderwidth=5)
style.configure("blue.TFrame", background=colour["blue"], relief="raised", borderwidth=5)
style.configure("purple.TFrame", background=colour["purple"], relief="raised", borderwidth=5)

# Frames for Sins and Virtues
frame_style = {"padding": 10, "relief": "solid", "borderwidth": 2}
sins_frame = ttk.Frame(root, style="red.TFrame", **frame_style)
sins_frame.pack(side="left", padx=20, fill="y")

virtues_frame = ttk.Frame(root, style="blue.TFrame", **frame_style)
virtues_frame.pack(side="right", padx=20, fill="y")


# Generate buttons for Sins
sins = [char for char in characters if characters[char]['alignment'] == "Sin"]
for sin in sins:
    button = ttk.Button(
        sins_frame,
        text=characters[sin]['aspect'],
        command=lambda char=sin: display_character(char),
        style="Custom.TButton",  # Apply the custom style
    )
    button.pack(pady=5, padx=10)

# Generate buttons for Virtues
virtues = [char for char in characters if characters[char]['alignment'] == "Virtue"]
for virtue in virtues:
    button = ttk.Button(
        virtues_frame,
        text=characters[virtue]['aspect'],
        command=lambda char=virtue: display_character(char),
        style="Custom.TButton",  # Apply the custom style
    )
    button.pack(pady=5, padx=10)


# Start the main event loop
root.mainloop()
