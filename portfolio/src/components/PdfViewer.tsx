"use client";

import {
    ChevronLeft,
    ChevronRight,
    Download,
    Expand,
    Loader2,
    Shrink,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer() {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
    // ✅ NEW STATE: To store the calculated height of the rendered page
    const [pageHeight, setPageHeight] = useState<number | '75vh'>(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Initial scale calculation (Fit to Width)
    useEffect(() => {
        if (containerRef.current && pageDimensions.width > 0) {
            const containerWidth = containerRef.current.offsetWidth - 32; // - 32 for p-4
            const optimalScale = containerWidth / pageDimensions.width;
            setScale(Math.min(optimalScale, 1.5));
        }
    }, [pageDimensions.width]);

    // ✅ EFFECT: Calculate page height whenever scale or dimensions change
    useEffect(() => {
        if (pageDimensions.height > 0) {
            // Calculate the actual rendered pixel height of the page
            const calculatedHeight = pageDimensions.height * scale;

            // Set the new height, plus a little padding (e.g., 32px for p-4)
            setPageHeight(calculatedHeight + 32);
        } else {
            // Fallback for initial load
            setPageHeight('75vh');
        }
    }, [scale, pageDimensions.height]);

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
    const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () =>
        setPageNumber((prev) => Math.min(prev + 1, numPages || 1));

    const handleFitToWidth = () => {
        if (containerRef.current && pageDimensions.width > 0) {
            const containerWidth = containerRef.current.offsetWidth - 32;
            const optimalScale = containerWidth / pageDimensions.width;
            setScale(optimalScale);
        }
    };

    const handleFitToPage = () => {
        if (scrollContainerRef.current && pageDimensions.width > 0) {
            const containerWidth = scrollContainerRef.current.offsetWidth - 32;
            const containerHeight = scrollContainerRef.current.offsetHeight - 32;

            const scaleWidth = containerWidth / pageDimensions.width;
            const scaleHeight = containerHeight / pageDimensions.height;

            const optimalScale = Math.min(scaleWidth, scaleHeight);
            setScale(optimalScale);
        }
    };

    return (
        <div className="flex flex-col items-center w-full gap-4">
            {/* Controls Bar (no changes needed here) */}
            <div className="flex flex-wrap items-center justify-center gap-3 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <button
                    onClick={handlePrevPage}
                    disabled={pageNumber <= 1}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-sm font-medium min-w-[75px] sm:min-w-[100px] text-center">
                    Page {pageNumber} of {numPages || "?"}
                </span>

                <button
                    onClick={handleNextPage}
                    disabled={pageNumber >= (numPages || 1)}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next page"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>

                <div className="mx-2 h-6 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>

                <button
                    onClick={handleZoomOut}
                    disabled={scale <= 0.5}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Zoom out"
                >
                    <ZoomOut className="w-4 h-4" />
                </button>

                <span className="text-sm font-medium min-w-[40px] sm:min-w-[50px] text-center">
                    {Math.round(scale * 100)}%
                </span>

                <button
                    onClick={handleZoomIn}
                    disabled={scale >= 2.5}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Zoom in"
                >
                    <ZoomIn className="w-4 h-4" />
                </button>

                <button
                    onClick={handleFitToWidth}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Fit to width"
                >
                    <Expand className="w-4 h-4" />
                </button>

                <button
                    onClick={handleFitToPage}
                    className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Fit to page"
                >
                    <Shrink className="w-4 h-4" />
                </button>

                <div className="mx-2 h-6 w-px bg-gray-300 dark:bg-gray-600 hidden sm:block"></div>

                <a
                    href="/resume.pdf"
                    download="Resume_Mainak_Debnath.pdf"
                    className="flex items-center gap-2 px-2 sm:px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline-block">Download</span>
                </a>
            </div>

            {/* PDF Viewer Container */}
            <div
                ref={containerRef}
                className="relative w-full max-w-5xl border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-900 overflow-hidden"
            >
                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800"
                    // ✅ CHANGE 1: We remove the fixed h-[75vh] class
                    // ✅ CHANGE 2: We apply the dynamic height style
                    style={{
                        height: pageHeight,
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(156, 163, 175, 0.5) transparent",
                    }}
                >
                    <Document
                        file="/resume.pdf"
                        loading={
                            // ... (loading spinner JSX) ...
                            <div className="flex flex-col items-center justify-center h-full">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Loading PDF...
                                </p>
                            </div>
                        }
                        onLoadSuccess={({ numPages }) => {
                            setNumPages(numPages);
                            setLoading(false);
                        }}
                        onLoadError={(err) => {
                            console.error("PDF Load Error:", err);
                            setError(true);
                            setLoading(false);
                        }}
                    >
                        {!error ? (
                            <div className="inline-block min-w-min">
                                <Page
                                    pageNumber={pageNumber}
                                    scale={scale}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="shadow-xl"
                                    onLoadSuccess={(page) => {
                                        setPageDimensions({
                                            width: page.originalWidth,
                                            height: page.originalHeight,
                                        });
                                    }}
                                />
                            </div>
                        ) : (
                            // ... (error message JSX) ...
                            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-3">
                                    <span className="text-2xl">⚠️</span>
                                </div>
                                <p className="text-red-600 dark:text-red-400 font-medium mb-2">
                                    Failed to load PDF
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Please try downloading instead
                                </p>
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                                >
                                    Download Resume
                                </a>
                            </div>
                        )}
                    </Document>
                </div>

                {/* Page Counter Overlay */}
                {!loading && !error && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-xs font-medium">
                        {pageNumber} / {numPages}
                    </div>
                )}
            </div>
        </div>
    );
}