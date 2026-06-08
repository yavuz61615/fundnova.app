from PIL import Image

def remove_white(img_path, out_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    # Loop over all pixels
    for item in datas:
        # If the pixel is mostly white (e.g. RGB > 240)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0)) # Make it transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(out_path, "PNG")

if __name__ == "__main__":
    remove_white('public/logo.png', 'public/logo.png')
    print("Background removed from logo.png")
