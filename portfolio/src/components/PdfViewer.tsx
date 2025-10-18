// components/PdfViewer.tsx
"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer() {
    const [numPages, setNumPages] = useState<number | null>(null);

    return (
        <div className="flex flex-col items-center">
            <Document
                file="/resume.pdf"
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                onLoadError={(error) => console.error("PDF Load Error:", error)}
            >
                {Array.from(new Array(numPages || 0), (_, index) => (
                    <Page key={index} pageNumber={index + 1} scale={1.2} />
                ))}
            </Document>
        </div>
    );
}
