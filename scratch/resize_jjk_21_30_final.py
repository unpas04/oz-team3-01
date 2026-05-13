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

# Final list for 21-30 resizing
jjk_21_30_final = [
    "jjk-27.png",
    "jjk-choso.png", # Q22 (Index 21)
    "jjk-21.png",
    "jjk-22.png",
    "jjk-23.png",
    "jjk-24.png",
    "jjk-25.png",
    "jjk-26.png",
    "jjk-29.png",
    "jjk-30.png",
]

for filename in jjk_21_30_final:
    path = os.path.join(img_dir, filename)
    if os.path.exists(path):
        resize_to_4_3(path, path)
    else:
        print(f"File not found: {path}")
