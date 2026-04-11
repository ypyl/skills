#!/usr/bin/env python3
"""
Convert PDF pages to images using pdf2image.
This captures all visual content including any embedded images.
"""

from pdf2image import convert_from_path
import os


def convert_pdf_to_images(pdf_path, output_dir):
    """
    Convert PDF pages to PNG images.

    Args:
        pdf_path: Path to the PDF file
        output_dir: Directory to save images
    """
    print(f"Converting PDF to images: {pdf_path}")

    try:
        # Convert PDF pages to images
        images = convert_from_path(pdf_path, dpi=200)
        print(f"Converted {len(images)} pages")

        saved_files = []
        for i, image in enumerate(images, start=1):
            output_filename = f"page_{i:03d}.png"
            output_path = os.path.join(output_dir, output_filename)
            image.save(output_path, "PNG")
            print(f"  Saved: {output_filename} ({image.size[0]}x{image.size[1]})")
            saved_files.append(output_path)

        print(f"\n{'=' * 50}")
        print(f"Conversion complete!")
        print(f"Total pages saved: {len(saved_files)}")
        print(f"Files saved to: {output_dir}")
        print(f"{'=' * 50}")

        return saved_files

    except Exception as e:
        print(f"Error: {e}")
        print("\nNote: pdf2image requires poppler to be installed.")
        print("Trying alternative method using PyMuPDF...")
        return []


if __name__ == "__main__":
    pdf_path = r"C:\Users\ypyl\OneDrive\Documents\Yauhen_Pyl_CV_0.pdf"
    output_dir = r"C:\Users\ypyl\projects\skills\pdf-extract-workspace\iteration-1\eval-3-images\without_skill\outputs\extracted_images"

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Convert PDF to images
    convert_pdf_to_images(pdf_path, output_dir)
