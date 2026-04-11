# PDF Text Extraction - Transcript

## Task
Extract all text from the PDF file: `C:\Users\ypyl\OneDrive\Documents\Yauhen_Pyl_CV_0.pdf`
Save the extracted text to `cv_text.txt` in the output directory while preserving layout and formatting.

## Skill Used
- **Skill Path:** `C:\Users\ypyl\projects\skills\skills\pdf-extract`
- **Tool Used:** `pdftotext.exe` with `-layout` flag

## Command Executed
```bash
C:\Users\ypyl\projects\skills\skills\pdf-extract\assets\pdftotext.exe -layout "C:\Users\ypyl\OneDrive\Documents\Yauhen_Pyl_CV_0.pdf" "C:\Users\ypyl\projects\skills\pdf-extract-workspace\iteration-1\eval-1-text-extraction\with_skill\outputs\cv_text.txt"
```

## Why This Flag Was Used
The `-layout` flag was used to preserve the original document spacing and formatting, which is important for a CV where the structure and alignment matter.

## Output
The text was successfully extracted to:
- **Output File:** `C:\Users\ypyl\projects\skills\pdf-extract-workspace\iteration-1\eval-1-text-extraction\with_skill\outputs\cv_text.txt`
- **Status:** Success
- **Lines Extracted:** 52 lines

## Summary of Extracted Content
The CV contains:
- Name: Yauhen Pyl
- Title: Full-Stack Developer / GenAI / 10+ years of experience / 3+ years as Tech/Team Lead
- Contact information
- Key Skills (Languages, Frameworks, Databases, Cloud, Leadership)
- Work Experience at multiple companies
- Education and Certifications

The layout and formatting have been preserved as requested.
