import tkinter as tk
import json

with open("../concordium.json","r") as file:
  characters = json.load(file)

def display_character(data):
  info = ""
  char = characters[data]
  if char['alignment'] == "Sin":
      magic = "Curse"
  else:
      magic = "Blessing"

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
    if rank in rank_map:
      return rank_map[rank].get(sex, rank)
    return rank

  # Insert function that appends to `info`
  def insert(text, prefix="", suffix=""):
      nonlocal info
      if text != "":
          info += f"{prefix}{text}{suffix}"

  # Building the info string in Markdown format
  insert(char['name'], "", "")
  insert(gender(char['rank'],char['sex']), " ", "\n\n")
  insert(char['animal'], f"{magic}: {magic} of The ", "\n")
  insert(char['weapon'], "Weapon: ", "\n")
  insert(char['colour'], "Gear Colour: ", "\n")
  insert(char['power'], "Power: ", "\n")
  insert(char['species'], "Species: ", "\n")
  insert(char['description'], "\n")

  # Create the window to display the character details
  detail_window = tk.Toplevel()
  detail_window.title(char['aspect'].capitalize())

  # Get the screen width and height
  screen_width = detail_window.winfo_screenwidth()
  screen_height = detail_window.winfo_screenheight()

  # Set the new window size to the screen width and height
  detail_window.geometry(f"{screen_width}x{screen_height}+0+0")

  # Create a Label widget to display the formatted content
  label_widget = tk.Label(detail_window, text=info, justify="left", padx=10, pady=10, font=("Verdana", 10), wraplength=350)
  label_widget.pack()

# Main application window
root = tk.Tk()
root.title("Concordium Wiki")

# Get the screen width and height
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()

# Set the window size to the screen width and height
root.geometry(f"{screen_width}x{screen_height}+0+0")

# Title label
tk.Label(root, text="Concordium Wiki", font=("Verdana", 16)).pack(pady=10)

# Create frames for Sins and Virtues columns
sins_frame = tk.Frame(root)
sins_frame.pack(side="left", padx=20)

virtues_frame = tk.Frame(root)
virtues_frame.pack(side="right", padx=20)

# Sins button generation
sins = [char for char in characters if characters[char]['alignment'] == "Sin"]
for sin in sins:
    button = tk.Button(sins_frame, text=characters[sin]['aspect'], command=lambda char=sin: display_character(char))
    button.pack(pady=5, padx=10)

# Virtues button generation
virtues = [char for char in characters if characters[char]['alignment'] == "Virtue"]
for virtue in virtues:
    button = tk.Button(virtues_frame, text=characters[virtue]['aspect'], command=lambda char=virtue: display_character(char))
    button.pack(pady=5, padx=10)

# Start the main event loop
root.mainloop()