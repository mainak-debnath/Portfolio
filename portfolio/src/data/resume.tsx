import { Icons } from "@/components/icons";
import { BookOpen, FileText, HomeIcon } from "lucide-react";

export const DATA = {
  name: "Mainak Debnath",
  initials: "MD",
  url: "https://mainak-debnath.dev",
  location: "Bengaluru, India",
  locationLink: "https://www.google.com/maps/place/Kolkata",
  description:
    "Software engineer focused on building reliable products, polished user experiences, and practical AI-powered tools.",
  summary:
    "I'm a software engineer at [MRI Software](/#work), where I build and improve products used in the affordable housing space. My work spans responsive Angular frontends, backend services, performance tuning, and shipping features that reduce friction for real users. I graduated with a [B.Tech in Computer Science and Engineering](/#education) from St. Thomas' College of Engineering and Technology, and I enjoy working across the stack with technologies like Angular, Django, Python, and .NET. Outside of product engineering, I like exploring machine learning concepts and turning ideas into practical side projects.",
  avatarUrl: "/pic.png",
  skills: [
    "TypeScript",
    "Angular",
    "Python",
    "C#",
    ".NET Core",
    "SQL",
    "Machine Learning",
    "Django",
    "C++",
    "Git",
    "REST APIs",
    "Redis",
    "LLMs",
    "Agentic AI"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: BookOpen, label: "Blog" },
    { href: "/resume", icon: FileText, label: "Resume" },
  ],
  contact: {
    email: "debnath.mainak007@gmail.com",
    tel: "+91 9163630446",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/mainak-debnath",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/mainak-debnath-58aa47187/",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/MainakDebnath07",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:debnath.mainak007@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "MRI Software",
      href: "https://www.mrisoftware.com/",
      badges: [],
      location: "Bengaluru, India",
      logoUrl: "/mri_logo.jpg",
      positions: [
        {
          title: "Software Engineer 2",
          start: "February 2025",
          end: "Present",
          description: [
            "Integrated SecureSign into the Affordable Housing product to reduce manual paperwork and streamline e-signature flows.",
            "Improved document turnaround by 70% by simplifying signature workflows across the product experience.",
            "Partnered with product and infrastructure teams to deliver a stable rollout with reliable post-deployment monitoring.",
          ],
        },
        {
          title: "Software Engineer 1",
          start: "August 2022",
          end: "January 2025",
          description: [
            "Built responsive Angular interfaces for the Affordable Housing platform with a focus on usability and maintainability.",
            "Reduced load time by 30% through lazy loading, pagination, and targeted frontend performance improvements.",
            "Improved backend and SQL performance by 15% through optimized API logic and query tuning.",
          ],
        },
      ],
    },
  ],
  education: [
    {
      school: "St. Thomas' College Of Engineering & Technology",
      href: "https://stcet.ac.in/",
      degree: "B.Tech in Computer Science & Engineering",
      logoUrl: "/STCET-Logo.png",
      start: "2018",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "IntelliBlogger",
      href: "https://github.com/mainak-debnath/IntelliBlogger",
      dates: "April 2025 - June 2025",
      active: true,
      description:
        "A full-stack web app that turns YouTube videos into structured blog posts with authentication, secure API access, and AI-assisted content generation.",
      technologies: [
        "HTML",
        "CSS",
        "Angular",
        "Python",
        "Django",
        "Redis",
        "Gemini LLM",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/mainak-debnath/IntelliBlogger",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/intelliblogger.png",
      video: "",
    },
    {
      title: "ReviewPal",
      href: "https://github.com/mainak-debnath/ReviewPal",
      dates: "June 2025",
      active: true,
      description:
        "An AI-driven pull request reviewer that analyzes GitHub PR diffs and posts precise inline comments based on customizable engineering standards.",
      technologies: [
        "Python",
        "LangChain",
        "Gemini LLM",
        "HTTPX",
        "GitHub Actions",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/mainak-debnath/ReviewPal",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/reviewpal.png",
      video: "",
    },
    {
      title: "Transformations_2d",
      href: "https://pypi.org/project/transformations-2d/",
      dates: "Jul 2025",
      active: true,
      description:
        "A Python package for 2D geometric transformations on points and polygons, designed with an object-oriented and immutable API.",
      technologies: ["Python"],
      links: [
        {
          type: "Source",
          href: "https://github.com/mainak-debnath/transformations_2d",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/transformation.png",
      video: "",
    },
    {
      title: "Personalise",
      href: "https://github.com/mainak-debnath/Personalise",
      dates: "Sept 2021",
      active: true,
      description:
        "A text analysis application that predicts a user's Myers-Briggs personality type from written input.",
      technologies: [
        "HTML",
        "CSS",
        "Python",
        "Flask",
        "NLP",
        "Machine Learning",
        "Git",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/mainak-debnath/Personalise",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/personalise.png",
      video: "",
    },
  ],
} as const;
