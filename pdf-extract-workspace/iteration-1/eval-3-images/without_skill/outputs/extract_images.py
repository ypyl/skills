#!/usr/bin/env python3
"""
Extract embedded images from a PDF file using PyMuPDF (fitz).
"""

import fitz  # PyMuPDF
import os
from PIL import Image
import io


def extract_images_from_pdf(pdf_path, output_dir):
    """
    Extract all embedded images from a PDF file and save them as PNG.

    Args:
        pdf_path: Path to the PDF file
        output_dir: Directory to save extracted images
    """
    print(f"Opening PDF: {pdf_path}")

    # Open the PDF
    pdf_document = fitz.open(pdf_path)
    print(f"PDF has {len(pdf_document)} pages")

    image_count = 0
    extracted_files = []

    # Iterate through all pages
    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]
        print(f"\nProcessing page {page_num + 1}...")

        # Get images on this page
        image_list = page.get_images()
        print(f"  Found {len(image_list)} images on page {page_num + 1}")

        # Extract each image
        for img_index, img in enumerate(image_list, start=1):
            xref = img[0]  # xref number
            base_image = pdf_document.extract_image(xref)

            if base_image:
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]

                # Create output filename
                image_count += 1
                output_filename = f"image_{image_count:03d}_page{page_num + 1}_{img_index}.{image_ext}"
                output_path = os.path.join(output_dir, output_filename)

                # Save the image
                with open(output_path, "wb") as f:
                    f.write(image_bytes)

                print(f"  Saved: {output_filename} ({len(image_bytes)} bytes)")
                extracted_files.append(output_path)

                # Also convert to PNG if it's not already PNG
                if image_ext.lower() != "png":
                    try:
                        png_filename = f"image_{image_count:03d}_page{page_num + 1}_{img_index}.png"
                        png_path = os.path.join(output_dir, png_filename)

                        # Convert to PNG using PIL
                        image = Image.open(io.BytesIO(image_bytes))
                        image.save(png_path, "PNG")
                        print(f"  Converted to PNG: {png_filename}")
                        extracted_files.append(png_path)
                    except Exception as e:
                        print(f"  Warning: Could not convert to PNG: {e}")

    pdf_document.close()

    print(f"\n{'=' * 50}")
    print(f"Extraction complete!")
    print(f"Total images extracted: {image_count}")
    print(f"Files saved to: {output_dir}")
    print(f"{'=' * 50}")

    return extracted_files


if __name__ == "__main__":
    pdf_path = r"C:\Users\ypyl\OneDrive\Documents\Yauhen_Pyl_CV_0.pdf"
    output_dir = r"C:\Users\ypyl\projects\skills\pdf-extract-workspace\iteration-1\eval-3-images\without_skill\outputs\extracted_images"

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Extract images
    extracted = extract_images_from_pdf(pdf_path, output_dir)

    # List all PNG files
    png_files = [f for f in os.listdir(output_dir) if f.endswith(".png")]
    print(f"\nPNG files in output directory: {len(png_files)}")
    for f in png_files:
        print(f"  - {f}")
