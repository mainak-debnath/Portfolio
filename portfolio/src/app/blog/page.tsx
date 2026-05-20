import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description:
    "Technical writing on machine learning, deep learning architectures, TensorFlow, and software engineering.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const sortedPosts = posts.sort((a, b) =>
    new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
  );

  return (
    <section className="space-y-8 pb-16">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="space-y-3">
          <div className="inline-block rounded-full border px-3 py-1 text-sm">
            Blog
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Writing and explainers
          </h1>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            A collection of posts covering machine learning concepts, model
            architectures, computer vision, and implementation-focused notes.
          </p>
        </div>
      </BlurFade>

      <div className="grid gap-4">
        {sortedPosts.map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link
              className="block rounded-2xl border bg-card/60 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              href={`/blog/${post.slug}`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <p className="text-lg font-semibold tracking-tight">
                    {post.metadata.title}
                  </p>
                  <p className="max-w-2xl text-sm text-muted-foreground">
                    {post.metadata.summary}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-muted-foreground">
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
