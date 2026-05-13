import os
from PIL import Image

def resize_to_4_3_top_focus(image_path, output_path):
    try:
        with Image.open(image_path) as img:
            img = img.convert("RGB")
            width, height = img.size
            target_ratio = 4 / 3
            current_ratio = width / height

            if current_ratio > target_ratio:
                # Wider than target: Crop sides (center horizontally)
                new_width = int(height * target_ratio)
                left = (width - new_width) / 2
                right = (width + new_width) / 2
                img = img.crop((left, 0, right, height))
            elif current_ratio < target_ratio:
                # Taller than target: Crop bottom (keep top focus)
                new_height = int(width / target_ratio)
                top = 0 # Favor the top
                bottom = new_height
                img = img.crop((0, top, width, bottom))
            
            img = img.resize((1024, 768), Image.Resampling.LANCZOS)
            img.save(output_path, "PNG")
            print(f"Resized {image_path} to {output_path} (Top Focus)")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

img_dir = r"c:\Users\kimjo\Downloads\oz-team-project\public\assets\quiz\fate-img"

# List all files in the directory
files = os.listdir(img_dir)

for filename in files:
    if filename.lower().endswith((".png", ".jpg", ".jpeg")):
        src_path = os.path.join(img_dir, filename)
        # Standardize to .png as per fate.js
        base_name = os.path.splitext(filename)[0]
        dest_path = os.path.join(img_dir, base_name + ".png")
        
        resize_to_4_3_top_focus(src_path, dest_path)
        
        # If it was a jpg/jpeg and we created a png, delete the original to keep clean
        if filename.lower().endswith((".jpg", ".jpeg")):
            try:
                os.remove(src_path)
                print(f"Deleted original {src_path}")
            except:
                pass
