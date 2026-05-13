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

# Mapping for 11-20
# Question Index (1-based) -> Source File -> Target File
jjk_11_20 = {
    11: ("jjk-11-new.png", "jjk-11.png"),
    12: ("jjk-12.png", "jjk-12.png"),
    13: ("jjk-13.png", "jjk-13.png"),
    14: ("jjk-14.png", "jjk-14.png"),
    15: ("jjk-15.png", "jjk-15.png"),
    16: ("jjk-16.png", "jjk-16.png"),
    17: ("jjk-17.png", "jjk-17.png"),
    18: ("jjk-18.png", "jjk-18.png"),
    19: ("jjk-19.png", "jjk-19.png"),
    20: ("jjk-20-new.png", "jjk-20.png"),
}

for q_num, files in jjk_11_20.items():
    src, dest = files
    src_path = os.path.join(img_dir, src)
    dest_path = os.path.join(img_dir, dest)
    if os.path.exists(src_path):
        # If src and dest are same, it will overwrite after resizing
        resize_to_4_3(src_path, dest_path)
    else:
        print(f"Source not found: {src_path}")
