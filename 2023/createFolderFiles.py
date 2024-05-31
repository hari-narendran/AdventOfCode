import os

# Create the directory
dir_name = 'Day00'
if not os.path.exists(dir_name):
    os.makedirs(dir_name)

# Create the text files and .ipynb files inside the directory
file_names = ['day00.txt', 'day00_sample.txt', 'Day00_Part01_v1.ipynb', 'Day00_Part02_v1.ipynb']

for file_name in file_names:
    with open(os.path.join(dir_name, file_name), 'w') as file:
        # This creates each file. You can also write content into the file if needed.
        pass

print(f"Directory '{dir_name}' and files created successfully.")