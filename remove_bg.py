from rembg import remove
import os

images = ["oktay-solmaz.png", "ugur-cicek.jpg", "ugur-dogan.jpg"]
public_dir = "public"

for img_name in images:
    input_path = os.path.join(public_dir, img_name)
    if os.path.exists(input_path):
        print(f"Processing {input_path}...")
        try:
            with open(input_path, 'rb') as i:
                input_data = i.read()
                
            output_data = remove(input_data)
            
            # Save as .png to support transparency
            new_name = os.path.splitext(img_name)[0] + ".png"
            new_path = os.path.join(public_dir, new_name)
            
            with open(new_path, 'wb') as o:
                o.write(output_data)
                
            if new_path != input_path:
                os.remove(input_path)
                print(f"Saved {new_path} and removed old {input_path}")
            else:
                print(f"Overwrote {new_path}")
        except Exception as e:
            print(f"Failed to process {img_name}: {e}")
    else:
        print(f"File not found: {input_path}")
