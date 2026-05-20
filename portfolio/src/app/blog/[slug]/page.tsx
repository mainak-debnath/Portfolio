import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  const post = await getPost(params.slug);

  if (!post) {
    return undefined;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? `${DATA.url}${image}`
    : `${DATA.url}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="blog" className="space-y-8 pb-16">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          } as const),
        }}
      />

      <div className="space-y-5 rounded-[2rem] border bg-card/80 p-6 shadow-sm backdrop-blur sm:p-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>
        <div className="space-y-3">
          <div className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            Technical Writing
          </div>
          <h1 className="max-w-[720px] text-3xl font-bold tracking-tighter sm:text-5xl">
            {post.metadata.title}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
            {post.metadata.summary}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{formatDate(post.metadata.publishedAt)}</span>
          <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/70 sm:inline-block" />
          <span>By {DATA.name}</span>
        </div>
      </div>

      <div className="rounded-[2rem] border bg-card/85 p-6 shadow-sm backdrop-blur sm:p-10">
        <article
          className="prose prose-lg prose-neutral max-w-none text-pretty dark:prose-invert prose-headings:scroll-mt-24 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.source }}
        />
      </div>
    </section>
  );
}
