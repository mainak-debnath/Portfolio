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
  const [pageDimensions, setPageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [pageHeight, setPageHeight] = useState<number | "75vh">(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && pageDimensions.width > 0) {
      const containerWidth = containerRef.current.offsetWidth - 32;
      const optimalScale = containerWidth / pageDimensions.width;
      setScale(Math.min(optimalScale, 1.5));
    }
  }, [pageDimensions.width]);

  useEffect(() => {
    if (pageDimensions.height > 0) {
      const calculatedHeight = pageDimensions.height * scale;
      setPageHeight(calculatedHeight + 32);
    } else {
      setPageHeight("75vh");
    }
  }, [pageDimensions.height, scale]);

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

      setScale(Math.min(scaleWidth, scaleHeight));
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <button
          onClick={handlePrevPage}
          disabled={pageNumber <= 1}
          className="rounded p-2 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="min-w-[75px] text-center text-sm font-medium sm:min-w-[100px]">
          Page {pageNumber} of {numPages || "?"}
        </span>

        <button
          onClick={handleNextPage}
          disabled={pageNumber >= (numPages || 1)}
          className="rounded p-2 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <div className="mx-2 hidden h-6 w-px bg-gray-300 dark:bg-gray-600 sm:block" />

        <button
          onClick={handleZoomOut}
          disabled={scale <= 0.5}
          className="rounded p-2 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
          aria-label="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>

        <span className="min-w-[40px] text-center text-sm font-medium sm:min-w-[50px]">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          disabled={scale >= 2.5}
          className="rounded p-2 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>

        <button
          onClick={handleFitToWidth}
          className="rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Fit to width"
        >
          <Expand className="h-4 w-4" />
        </button>

        <button
          onClick={handleFitToPage}
          className="rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label="Fit to page"
        >
          <Shrink className="h-4 w-4" />
        </button>

        <div className="mx-2 hidden h-6 w-px bg-gray-300 dark:bg-gray-600 sm:block" />

        <a
          href="/Mainak_Debnath_Resume.pdf"
          download="Resume_Mainak_Debnath.pdf"
          className="flex items-center gap-2 rounded bg-blue-600 px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 sm:px-3"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline-block">Download</span>
        </a>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-lg dark:border-gray-700 dark:bg-gray-900"
      >
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-auto bg-gray-100 p-4 dark:bg-gray-800"
          style={{
            height: pageHeight,
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(156, 163, 175, 0.5) transparent",
          }}
        >
          <Document
            file="/Mainak_Debnath_Resume.pdf"
            loading={
              <div className="flex h-full flex-col items-center justify-center">
                <Loader2 className="mb-2 h-8 w-8 animate-spin text-blue-600" />
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
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                  <span className="text-2xl">!</span>
                </div>
                <p className="mb-2 font-medium text-red-600 dark:text-red-400">
                  Failed to load PDF
                </p>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Please try downloading it instead.
                </p>
                <a
                  href="/Mainak_Debnath_Resume.pdf"
                  download
                  className="rounded bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
                >
                  Download Resume
                </a>
              </div>
            )}
          </Document>
        </div>

        {!loading && !error && (
          <div className="absolute bottom-4 right-4 rounded bg-black/70 px-3 py-1 text-xs font-medium text-white">
            {pageNumber} / {numPages}
          </div>
        )}
      </div>
    </div>
  );
}
