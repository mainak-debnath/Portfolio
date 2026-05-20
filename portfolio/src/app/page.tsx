import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-16 pb-16">
      <section id="hero" className="space-y-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-3xl border bg-card/60 p-8 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col space-y-4">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              yOffset={8}
              text={`Hi, I'm ${DATA.name.split(" ")[0]}.`}
            />
            <BlurFadeText
              className="max-w-[640px] text-base text-muted-foreground md:text-xl"
              delay={BLUR_FADE_DELAY}
              text={DATA.description}
            />
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/resume"
                  className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
                >
                  View resume
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Read blog posts
                </Link>
              </div>
            </BlurFade>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Avatar className="size-28 border sm:size-32">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </section>

      <section id="about" className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-2xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-base text-muted-foreground dark:prose-invert md:text-lg">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-2xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, workIdx) => (
            <div key={work.company} className="space-y-4">
              <BlurFade delay={BLUR_FADE_DELAY * (6 + workIdx)}>
                <ResumeCard
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  href={work.href}
                  badges={work.badges}
                />
              </BlurFade>
              <div className="ml-0 flex flex-col gap-4 sm:ml-10">
                {work.positions.map((pos, idx) => (
                  <BlurFade
                    key={`${pos.title}-${pos.start}-${idx}`}
                    delay={BLUR_FADE_DELAY * (6 + workIdx) + idx * 0.05}
                  >
                    <ResumeCard
                      title={pos.title}
                      subtitle={work.location}
                      period={`${pos.start} - ${pos.end}`}
                      description={pos.description as string[]}
                    />
                  </BlurFade>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-2xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-2xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge className="rounded-full px-3 py-1 text-sm">
                  {skill}
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="space-y-8 py-4">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="space-y-3 text-center">
              <div className="inline-block rounded-full bg-foreground px-3 py-1 text-sm text-background">
                Selected Projects
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Things I&apos;ve built recently
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                A few projects that reflect how I like to work: practical,
                user-focused, and technically curious.
              </p>
            </div>
          </BlurFade>
          <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 sm:grid-cols-2">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="writing">
        <div className="space-y-4 rounded-3xl border bg-muted/40 p-6 sm:p-8">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="space-y-2">
              <div className="inline-block rounded-full border px-3 py-1 text-sm">
                Writing
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Notes on machine learning and engineering
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                I also write technical explainers, especially around machine
                learning fundamentals, deep learning models, and TensorFlow.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:opacity-90"
            >
              Explore blog posts
            </Link>
          </BlurFade>
        </div>
      </section>

      <section id="contact">
        <div className="grid w-full items-center justify-center gap-4 px-4 py-4 text-center md:px-6">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="space-y-3">
              <div className="inline-block rounded-full bg-foreground px-3 py-1 text-sm text-background">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Let&apos;s build something useful
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                If you&apos;re hiring, collaborating, or just want to talk
                through an idea, reach out on{" "}
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </Link>{" "}
                or email me at{" "}
                <a
                  href={DATA.contact.social.email.url}
                  className="text-blue-500 hover:underline"
                >
                  {DATA.contact.email}
                </a>
                .
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
