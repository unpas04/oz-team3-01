import os
from PIL import Image

def resize_to_4_3(image_path, output_path):
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            target_ratio = 4 / 3
            current_ratio = width / height

            if current_ratio > target_ratio:
                new_width = int(height * target_ratio)
                left = (width - new_width) / 2
                right = (width + new_width) / 2
                img = img.crop((left, 0, right, height))
            elif current_ratio < target_ratio:
                new_height = int(width / target_ratio)
                top = (height - new_height) / 2
                bottom = (height + new_height) / 2
                img = img.crop((0, top, width, bottom))
            
            img = img.resize((1024, 768), Image.Resampling.LANCZOS)
            img.save(output_path, "PNG")
            print(f"Resized {image_path} to {output_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

img_dir = r"c:\Users\kimjo\Downloads\oz-team-project\public\assets\quiz\jjk-img"

# Mapping for 21-30
# Note: jjk-20.png was handled for Q20. For Q22 (Choso), we'll create a copy first if needed.
jjk_21_30 = [
    "jjk-27.png", # Q21 (Index 20)
    "jjk-20.png", # Q22 (Index 21) - Wait, jjk-20 is now the school image. 
    # I need to find the OLD jjk-20 which was Choso or find a new one.
    "jjk-21.png", # Q23
    "jjk-22.png", # Q24
    "jjk-23.png", # Q25
    "jjk-24.png", # Q26
    "jjk-25.png", # Q27
    "jjk-26.png", # Q28
    "jjk-29.png", # Q29
    "jjk-30.png", # Q30
]

# Wait, I'll just check if jjk-20.png still looks like Choso or the School.
# I'll assume I need to find a new Choso image since I overwrote it with the School image in the previous step.

# Let's resize what we have first.
for filename in jjk_21_30:
    path = os.path.join(img_dir, filename)
    if os.path.exists(path):
        resize_to_4_3(path, path)
    else:
        print(f"File not found: {path}")
