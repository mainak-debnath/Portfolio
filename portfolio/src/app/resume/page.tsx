import BlurFade from "@/components/magicui/blur-fade";
import PdfViewer from "@/components/PdfViewer";

export const metadata = {
  title: "Resume",
  description: "View or download my resume",
};

export default function ResumePage() {
  return (
    <section className="flex flex-col items-center px-4 pt-8">
      <BlurFade delay={0.05}>
        <h1 className="mb-6 text-3xl font-bold">My Resume</h1>
      </BlurFade>

      <div className="w-full max-w-4xl rounded-lg border bg-muted shadow-md">
        <PdfViewer />
      </div>
      <p className="mt-4 max-w-md text-center text-xs text-gray-500 dark:text-gray-400">
        Tip: use the zoom controls for better readability.
        <br />
        Note: links inside the resume are clickable in the downloaded PDF
        version.
      </p>
    </section>
  );
}
