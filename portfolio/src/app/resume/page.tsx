// app/resume/page.tsx
import BlurFade from "@/components/magicui/blur-fade";
import PdfViewer from "@/components/PdfViewer";
import { Download } from "lucide-react";

export const metadata = {
    title: "Resume",
    description: "View or download my resume",
};

export default function ResumePage() {
    return (
        <section className="flex flex-col items-center px-4 pt-8">
            <BlurFade delay={0.05}>
                <h1 className="text-3xl font-bold mb-6">My Resume</h1>
            </BlurFade>

            <div className="w-full max-w-4xl border rounded-lg shadow-md bg-muted">
                <PdfViewer />
            </div>
            <br></br>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-md">
                💡 Tip: Use the zoom controls for better readability or download the
                PDF for offline viewing
            </p>

            <a
                href="/resume.pdf"
                download
                className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline transition-all"
            >
                <Download className="w-4 h-4" />
                Download Resume
            </a>
        </section>
    );
}
