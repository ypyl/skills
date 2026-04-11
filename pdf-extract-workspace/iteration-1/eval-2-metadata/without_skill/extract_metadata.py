#!/usr/bin/env python3
"""
Extract metadata from PDF file using PyPDF2
"""

import sys
from pathlib import Path
from datetime import datetime


def extract_pdf_metadata(pdf_path):
    """Extract metadata from a PDF file using PyPDF2."""
    try:
        from PyPDF2 import PdfReader
    except ImportError:
        print("PyPDF2 not installed. Installing...")
        import subprocess

        subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
        from PyPDF2 import PdfReader

    pdf_path = Path(pdf_path)
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF file not found: {pdf_path}")

    reader = PdfReader(str(pdf_path))

    # Get number of pages
    num_pages = len(reader.pages)

    # Extract metadata
    metadata = reader.metadata

    # Prepare output
    output = []
    output.append("=" * 60)
    output.append("PDF METADATA EXTRACTION REPORT")
    output.append("=" * 60)
    output.append(f"\nFile: {pdf_path}")
    output.append(f"File Size: {pdf_path.stat().st_size / 1024:.2f} KB")
    output.append("")
    output.append("-" * 60)
    output.append("DOCUMENT INFORMATION")
    output.append("-" * 60)
    output.append(f"Number of Pages: {num_pages}")

    if metadata:
        output.append("")
        output.append("-" * 60)
        output.append("METADATA")
        output.append("-" * 60)

        # Standard metadata fields
        fields = {
            "author": "Author",
            "creator": "Creator",
            "producer": "Producer",
            "subject": "Subject",
            "title": "Title",
            "creation_date": "Creation Date",
            "modification_date": "Modification Date",
        }

        for key, label in fields.items():
            value = getattr(metadata, key, None)
            if value:
                output.append(f"{label}: {value}")

        # Raw metadata dictionary
        output.append("")
        output.append("-" * 60)
        output.append("RAW METADATA")
        output.append("-" * 60)
        for key, value in metadata.items():
            output.append(f"{key}: {value}")
    else:
        output.append("\nNo metadata found in this PDF.")

    output.append("")
    output.append("=" * 60)
    output.append("EXTRACTION COMPLETE")
    output.append("=" * 60)

    return "\n".join(output)


if __name__ == "__main__":
    pdf_path = r"C:\Users\ypyl\OneDrive\Documents\Yauhen_Pyl_CV_0.pdf"
    output_dir = r"C:\Users\ypyl\projects\skills\pdf-extract-workspace\iteration-1\eval-2-metadata\without_skill\outputs"

    print(f"Extracting metadata from: {pdf_path}")
    print(f"Output directory: {output_dir}")

    try:
        result = extract_pdf_metadata(pdf_path)
        print("\n" + result)

        # Save to file
        output_file = Path(output_dir) / "metadata.txt"
        output_file.write_text(result, encoding="utf-8")
        print(f"\n[OK] Metadata saved to: {output_file}")

    except Exception as e:
        print(f"\n[ERROR] Error: {e}")
        sys.exit(1)
