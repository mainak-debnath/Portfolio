// app/resume/page.tsx

import BlurFade from "@/components/magicui/blur-fade";

export const metadata = {
    title: "Resume",
    description: "View or download my resume",
};

export default function ResumePage() {
    return (
        <section className="flex flex-col items-center px-4 pt-8">
            <BlurFade delay={0.05}>
                <h1 className="text-2xl font-bold mb-6">My Resume</h1>
            </BlurFade>

            <div className="w-full max-w-4xl h-[80vh] border rounded-md shadow-md overflow-hidden">
                <iframe
                    src="/resume.pdf"
                    title="Resume PDF"
                    className="w-full h-full"
                />
            </div>

            <a
                href="/resume.pdf"
                download
                className="mt-6 text-blue-600 dark:text-blue-400 hover:underline transition-all"
            >
                Download Resume
            </a>
        </section>
    );
}
