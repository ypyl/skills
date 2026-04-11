#!/usr/bin/env python3
"""
Render PDF pages as images using PyMuPDF.
This captures all visual content including any embedded images.
"""

import fitz  # PyMuPDF
import os


def render_pdf_pages(pdf_path, output_dir, dpi=200):
    """
    Render PDF pages as PNG images.

    Args:
        pdf_path: Path to the PDF file
        output_dir: Directory to save images
        dpi: Resolution for rendering (default 200)
    """
    print(f"Rendering PDF pages as images: {pdf_path}")
    print(f"Output DPI: {dpi}")

    # Open the PDF
    pdf_document = fitz.open(pdf_path)
    print(f"PDF has {len(pdf_document)} pages")

    saved_files = []

    # Calculate zoom factor from DPI (72 DPI is the base)
    zoom = dpi / 72
    mat = fitz.Matrix(zoom, zoom)

    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]
        print(f"\nRendering page {page_num + 1}...")

        # Render page as image
        pix = page.get_pixmap(matrix=mat)

        # Save as PNG
        output_filename = f"page_{page_num + 1:03d}.png"
        output_path = os.path.join(output_dir, output_filename)
        pix.save(output_path)

        print(f"  Saved: {output_filename} ({pix.width}x{pix.height})")
        saved_files.append(output_path)

    pdf_document.close()

    print(f"\n{'=' * 50}")
    print(f"Rendering complete!")
    print(f"Total pages saved: {len(saved_files)}")
    print(f"Files saved to: {output_dir}")
    print(f"{'=' * 50}")

    return saved_files


if __name__ == "__main__":
    pdf_path = r"C:\Users\ypyl\OneDrive\Documents\Yauhen_Pyl_CV_0.pdf"
    output_dir = r"C:\Users\ypyl\projects\skills\pdf-extract-workspace\iteration-1\eval-3-images\without_skill\outputs\extracted_images"

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Render PDF pages
    render_pdf_pages(pdf_path, output_dir, dpi=200)
