import os
from PIL import Image

def resize_to_4_3(image_path, output_path):
    with Image.open(image_path) as img:
        width, height = img.size
        target_ratio = 4 / 3
        current_ratio = width / height

        if current_ratio > target_ratio:
            # Too wide, crop the sides
            new_width = int(height * target_ratio)
            left = (width - new_width) / 2
            right = (width + new_width) / 2
            img = img.crop((left, 0, right, height))
        elif current_ratio < target_ratio:
            # Too tall, crop the top and bottom
            new_height = int(width / target_ratio)
            top = (height - new_height) / 2
            bottom = (height + new_height) / 2
            img = img.crop((0, top, width, bottom))
        
        # Resize to a standard high-quality size (e.g., 1024x768)
        img = img.resize((1024, 768), Image.Resampling.LANCZOS)
        img.save(output_path, "PNG")
        print(f"Resized {image_path} to {output_path}")

# JJK mapping
jjk_files = {
    "jjk_1_itadori_holding_finger_1778645632859.png": "jjk-1.png",
    "jjk_2_gojo_with_students_1778645661637.png": "jjk-2.png",
    "jjk_3_megumi_divine_dogs_1778645691001.png": "jjk-3.png",
    "jjk_4_nobara_action_hammer_1778645705353.png": "jjk-4.png",
    "jjk_5_scary_curse_civilian_1778645720729.png": "jjk-5.png",
    "jjk_6_panda_character_1778645749876.png": "jjk-6.png",
    "jjk_7_gojo_blindfold_eyes_1778645763156.png": "jjk-7.png",
    "jjk_8_inumaki_mouth_markings_1778645784953.png": "jjk-8.png",
    "jjk_9_nanami_salaryman_suit_1778645806200.png": "jjk-9.png",
    "jjk_10_domain_expansion_infinite_void_1778645827402.png": "jjk-10.png",
}

base_dir = r"C:\Users\kimjo\.gemini\antigravity\brain\c4ad44d0-a289-44bd-96dd-233c14fbab32"
output_dir = r"c:\Users\kimjo\Downloads\oz-team-project\public\assets\quiz\jjk-img"

for src, dest in jjk_files.items():
    src_path = os.path.join(base_dir, src)
    dest_path = os.path.join(output_dir, dest)
    if os.path.exists(src_path):
        resize_to_4_3(src_path, dest_path)
    else:
        print(f"Source not found: {src_path}")
