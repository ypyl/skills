# PDF Metadata Extraction - Transcript

## Task
Extract metadata and document information from PDF file:
- Input: `C:\Users\ypyl\OneDrive\Documents\Yauhen_Pyl_CV_0.pdf`
- Output: `C:\Users\ypyl\projects\skills\pdf-extract-workspace\iteration-1\eval-2-metadata\without_skill\outputs\`

## Approach
Used Python with PyPDF2 library to extract metadata from the PDF file.

## Steps Taken

### 1. Created Python Extraction Script
Created `extract_metadata.py` that:
- Imports PyPDF2 (auto-installs if not present)
- Opens the PDF file and extracts metadata
- Retrieves document information (page count, file size)
- Formats the output in a readable report format
- Saves results to `metadata.txt`

### 2. Executed Extraction
Ran the script which:
- Installed PyPDF2 library (not previously present)
- Successfully opened and read the PDF
- Extracted all available metadata fields

### 3. Results

#### Document Information
| Property | Value |
|----------|-------|
| **File Path** | C:\Users\ypyl\OneDrive\Documents\Yauhen_Pyl_CV_0.pdf |
| **File Size** | 89.00 KB |
| **Number of Pages** | 1 |

#### Metadata Fields
| Field | Value |
|-------|-------|
| **Title** | Yauhen_Pyl_CV_Short |
| **Producer** | Skia/PDF m146 Google Docs Renderer |

#### Missing Metadata
The following metadata fields were not present in the PDF:
- Author: Not specified
- Creator: Not specified
- Subject: Not specified
- Creation Date: Not specified
- Modification Date: Not specified

## Output Files Created
- `extract_metadata.py` - Python script for metadata extraction
- `outputs/metadata.txt` - Formatted metadata report

## Notes
- The PDF was created using Google Docs (Skia/PDF renderer)
- Minimal metadata is present (only Title and Producer fields)
- No author information or dates are embedded in the PDF
- The document is a single-page CV

## Completion Status
✅ Task completed successfully - metadata extracted and saved to metadata.txt
