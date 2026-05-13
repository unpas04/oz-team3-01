import os
from PIL import Image

def resize_to_4_3(image_path, output_path):
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

# Fate mapping
fate_files = {
    "fate_1_magic_circuits_glow_1778645858253.png": "fate-1.png",
    "fate_2_saber_artoria_reveal_1778645877594.png": "fate-2.png",
    "fate_3_seven_servant_classes_1778645895318.png": "fate-3.png",
    "fate_4_shirou_projection_sparks_1778645910514.png": "fate-4.png",
    "fate_5_rin_tohsaka_magus_1778645927678.png": "fate-5.png",
    "fate_6_lancer_unlucky_pose_1778645957751.png": "fate-6.png",
    "fate_7_servant_spiritualization_effect_1778645980370.png": "fate-7.png",
}

base_dir = r"C:\Users\kimjo\.gemini\antigravity\brain\c4ad44d0-a289-44bd-96dd-233c14fbab32"
output_dir = r"c:\Users\kimjo\Downloads\oz-team-project\public\assets\quiz\fate-img"

for src, dest in fate_files.items():
    src_path = os.path.join(base_dir, src)
    dest_path = os.path.join(output_dir, dest)
    if os.path.exists(src_path):
        resize_to_4_3(src_path, dest_path)
    else:
        print(f"Source not found: {src_path}")
