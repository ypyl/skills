---
name: pdf-extract
description: Use this skill when the user needs to extract data from PDF files - text, metadata, embedded images, or convert PDF pages to images. This is the go-to skill for any PDF extraction task including reading document content, getting page counts and properties, pulling out images, or converting pages to viewable formats. Use it whenever the user mentions extracting, reading, or analyzing PDF content.
---

# PDF Data Extraction Guide

## Overview

This skill provides command-line tools for extracting data from PDF files. All tools are bundled in the `scripts/` folder and can be executed directly without installation.

## When to Use This Skill

- Extracting text content from PDFs
- Getting PDF metadata (page count, author, creation date, etc.)
- Extracting embedded images from PDFs
- Converting PDF pages to image files (PNG/PPM)
- Analyzing PDF document structure

## Tool Reference

All tools are located in the skill's `scripts/` folder. Use relative paths or absolute paths to execute them.

### pdftotext - Extract Text from PDF

Converts PDF content to plain text.

**Basic usage:**
```bash
./scripts/pdftotext.exe input.pdf output.txt
```

**Preserve layout (maintains spacing and formatting):**
```bash
./scripts/pdftotext.exe -layout input.pdf output.txt
```

**Extract specific pages:**
```bash
./scripts/pdftotext.exe -f 1 -l 5 input.pdf output.txt    # Pages 1-5
./scripts/pdftotext.exe -f 3 -l 3 input.pdf page3.txt      # Page 3 only
```

**Extract to stdout (no file output):**
```bash
./scripts/pdftotext.exe input.pdf -
```

**Key flags:**
- `-layout`: Preserve original layout (spaces, columns)
- `-f N`: Start from page N
- `-l N`: Stop at page N
- `-raw`: Output raw text (no layout preservation)

### pdfinfo - Extract PDF Metadata

Displays document properties and metadata.

**Basic usage:**
```bash
./scripts/pdfinfo.exe input.pdf
```

**Output includes:**
- Title, Author, Subject, Creator
- Producer, CreationDate, ModDate
- Page count
- PDF version
- Page size
- Encrypted status

### pdfimages - Extract Embedded Images

Extracts raw images embedded in the PDF.

**Basic usage:**
```bash
./scripts/pdfimages.exe input.pdf output_prefix
```

**Output files:**
- `output_prefix-000.jpg` (JPEG images)
- `output_prefix-001.png` (PNG images)
- etc.

**Specify image format:**
```bash
./scripts/pdfimages.exe -j input.pdf output_prefix    # JPEG output
./scripts/pdfimages.exe -png input.pdf output_prefix  # PNG output
```

**Key flags:**
- `-j`: Convert to JPEG
- `-png`: Convert to PNG
- `-f N`: Start from page N
- `-l N`: Stop at page N
- `-list`: List images without extracting

### pdftopng - Convert PDF Pages to PNG

Converts PDF pages to PNG image files.

**Basic usage:**
```bash
./scripts/pdftopng.exe input.pdf output_prefix
```

**Specify DPI (higher = better quality):**
```bash
./scripts/pdftopng.exe -r 300 input.pdf output_prefix    # 300 DPI
./scripts/pdftopng.exe -r 150 input.pdf output_prefix    # 150 DPI (default)
```

**Convert specific pages:**
```bash
./scripts/pdftopng.exe -f 1 -l 3 input.pdf output_prefix    # Pages 1-3
```

**Key flags:**
- `-r N`: Resolution in DPI (default 150)
- `-f N`: Start from page N
- `-l N`: Stop at page N
- `-mono`: Monochrome output
- `-gray`: Grayscale output

### pdftoppm - Convert PDF Pages to PPM

Converts PDF pages to PPM/PGM/PBM image formats.

**Basic usage:**
```bash
./scripts/pdftoppm.exe input.pdf output_prefix
```

**Specify DPI:**
```bash
./scripts/pdftoppm.exe -r 300 input.pdf output_prefix
```

**Output format options:**
```bash
./scripts/pdftoppm.exe -png input.pdf output_prefix     # PNG output
./scripts/pdottoppm.exe -jpeg input.pdf output_prefix   # JPEG output
```

## Working Directory Guidance

### Output File Locations

By default, all tools create output files in the **current working directory**.

**Specify output directory:**
```bash
# Create output directory first
mkdir extracted_data

# Use full paths for output
./scripts/pdftotext.exe input.pdf ./extracted_data/content.txt
./scripts/pdfimages.exe input.pdf ./extracted_data/img
./scripts/pdftopng.exe input.pdf ./extracted_data/page
```

**Path considerations:**
- Use forward slashes `/` or escaped backslashes `\\` in paths
- If paths contain spaces, wrap in quotes: `"./my folder/output.txt"`
- Relative paths are resolved from the current working directory

## File Naming Patterns

### Single File Output
Tools like `pdftotext` and `pdfinfo` produce a single output file.

### Multi-File Output
Tools that extract multiple items use indexed naming:

**pdfimages:**
- `output_prefix-000.jpg`
- `output_prefix-001.png`
- `output_prefix-002.jpg`
- (format depends on source image type)

**pdftopng:**
- `output_prefix-1.png`
- `output_prefix-2.png`
- `output_prefix-3.png`

**pdftoppm:**
- `output_prefix-1.ppm`
- `output_prefix-2.ppm`
- etc.

## Common Workflows

### Extract Full Document Text
```bash
./scripts/pdftotext.exe -layout document.pdf document.txt
```

### Extract Text from Specific Pages
```bash
./scripts/pdftotext.exe -f 5 -l 10 document.pdf pages_5_10.txt
```

### Get Document Information
```bash
./scripts/pdfinfo.exe document.pdf
```

### Extract All Embedded Images
```bash
mkdir extracted_images
./scripts/pdfimages.exe -png document.pdf ./extracted_images/image
```

### Convert PDF Pages to Viewable Images
```bash
mkdir page_images
./scripts/pdftopng.exe -r 200 document.pdf ./page_images/page
```

### Complete Document Analysis
```bash
# Create output directory
mkdir pdf_analysis

# Get metadata
./scripts/pdfinfo.exe document.pdf > ./pdf_analysis/metadata.txt

# Extract text
./scripts/pdftotext.exe -layout document.pdf ./pdf_analysis/content.txt

# Extract images
./scripts/pdfimages.exe -png document.pdf ./pdf_analysis/image

# Convert pages to images
./scripts/pdftopng.exe -r 150 document.pdf ./pdf_analysis/page
```

## Troubleshooting

### "File not found" Errors
- Verify the PDF file path is correct
- Use absolute paths if relative paths fail
- Check for typos in filenames

### Permission Denied
- Ensure you have read access to the input PDF
- Ensure you have write access to the output directory
- Try running from a directory where you have full permissions

### No Text Extracted
- The PDF may be scanned images (not text-based)
- Try converting pages to images with `pdftopng` first, then use OCR
- Check if the PDF is encrypted/password-protected

### Garbled Text Output
- Try the `-layout` flag to preserve formatting
- Some PDFs use custom fonts that don't map to standard characters
- The `-raw` flag may help with certain encoding issues

### No Images Found
- The PDF may not contain embedded images
- Images might be vector graphics (not extractable as raster images)
- Try using `pdfimages -list` first to see if any images exist

### Empty Output Files
- Check that the PDF isn't corrupted
- Verify the page range flags (-f, -l) are within the document bounds
- Use `pdfinfo` to confirm the PDF has pages

## Quick Reference Table

| Task | Tool | Command |
|------|------|---------|
| Extract text | pdftotext | `./scripts/pdftotext.exe -layout input.pdf output.txt` |
| Get metadata | pdfinfo | `./scripts/pdfinfo.exe input.pdf` |
| Extract images | pdfimages | `./scripts/pdfimages.exe -png input.pdf prefix` |
| Pages to PNG | pdftopng | `./scripts/pdftopng.exe -r 200 input.pdf prefix` |
| Pages to PPM | pdftoppm | `./scripts/pdftoppm.exe -r 200 input.pdf prefix` |

## Important Notes

- All tools handle PDFs with standard encoding without issues
- Encrypted/password-protected PDFs require decryption first
- Very large PDFs may take time to process - be patient
- Image extraction preserves the original format when possible
- Text extraction works best on text-based PDFs (not scanned documents)
