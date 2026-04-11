import pdfplumber

pdf_path = r"C:\Users\ypyl\OneDrive\Documents\Yauhen_Pyl_CV_0.pdf"
output_path = r"C:\Users\ypyl\projects\skills\pdf-extract-workspace\iteration-1\eval-1-text-extraction\without_skill\outputs\cv_text.txt"

with pdfplumber.open(pdf_path) as pdf:
    full_text = ""
    for i, page in enumerate(pdf.pages):
        text = page.extract_text(layout=True)  # layout=True preserves formatting
        if text:
            full_text += f"\n--- Page {i + 1} ---\n"
            full_text += text
            full_text += "\n"

# Write to output file
with open(output_path, "w", encoding="utf-8") as f:
    f.write(full_text)

print(f"Successfully extracted text to: {output_path}")
print(f"Total pages processed: {len(pdf.pages)}")
print(f"Extracted text length: {len(full_text)} characters")
