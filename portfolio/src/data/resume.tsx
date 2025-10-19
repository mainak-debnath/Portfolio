import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Mainak Debnath",
  initials: "MD",
  url: "https://dillion.io",
  location: "Kolkata, WB",
  locationLink: "https://www.google.com/maps/place/Bengaluru",
  description:
    "Software Engineer. I love building things and solving complex tech challenges.",
  summary:
    "I'm a software engineer at [MRI Software](/#work), where I get to build and improve products that make life easier for users. I graduated with a [B.Tech in Computer Science and Engineering](/#education) from St. Thomas' College of Engineering and Technology, where I picked up skills in coding, software development, and problem-solving. I work with tech like Angular, Django, and .NET to create products that are not just efficient but also user-friendly. I’m always excited to learn new things and take on projects where I can make a real impact.",
  avatarUrl: "/pic.png",
  skills: [
    "Typescript",
    "Angular",
    "Python",
    "C#",
    ".Net",
    "Sql",
    "Machine Learning",
    "Django",
    "Flask",
    "C++",
    "Git"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    //{ href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/resume", icon: NotebookIcon, label: "Resume" },
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
      //title: "Software Engineer 1",
      logoUrl: "/mri_logo.jpg",
      //start: "August 2022",
      //end: "Present",
      positions: [
        {
          title: "Software Engineer 2",
          start: "February 2025",
          end: "Present",
          description: [
            "Integrated SecureSign (e-signature) into Affordable Housing product, eliminating manual paperwork.",
            "Improved document turnaround by 70% by streamlining signature workflows.",
            "Collaborated with product and infra teams to ensure stable rollout and post-deployment monitoring."
          ]
        },
        {
          title: "Software Engineer 1",
          start: "August 2022",
          end: "January 2025",
          description: [
            "Developed responsive Angular UIs for Affordable Housing platform, improving user experience.",
            "Reduced load time by 30% with lazy loading and pagination.",
            "Enhanced API performance by 15% through optimized backend logic and SQL queries."
          ]
        }
      ]
    }
  ],
  education: [
    {
      school: "St. Thomas' College Of Engineering & Technology",
      href: "https://stcet.ac.in/",
      degree: "B.Tech in Computer Science & Engineering",
      logoUrl: "/STCET-Logo.png",
      start: "2018",
      end: "2022",
    }
  ],
  projects: [
    {
      title: "IntelliBlogger",
      href: "https://github.com/mainak-debnath/IntelliBlogger",
      dates: "April 2025 - June 2025",
      active: true,
      description:
        "IntelliBlogger is a full-stack web app that uses AI to convert YouTube videos into structured blog posts. It supports user authentication, secure API access, and intelligent content generation.",
      technologies: [
        "Html",
        "CSS",
        "Angular",
        "Python",
        "Django",
        "Redis",
        "Gemini LLM"
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
        "ReviewPal is an AI-driven pull request reviewer that automates code reviews on GitHub by analyzing PR diffs and posting precise, actionable inline comments based on customizable coding standards. Works with any language—just plug in your own standards.",
      technologies: [
        "Python",
        "Langchain",
        "Gemini LLM",
        "HTTPX",
        "Github actions",
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
        "Developed a Python package for performing 2D geometric transformations (translation, scaling, rotation, shearing, reflection) on points and polygons using an object-oriented and immutable design.",
      technologies: [
        "Python",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/mainak-debnath/transformations_2d",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/transformation.png",
      video:
        "",
    },
    {
      title: "Personalise",
      href: "https://github.com/mainak-debnath/Personalise",
      dates: "Sept 2021",
      active: true,
      description:
        "An application where user can write a piece of text and get to know about their Myers–Briggs Type Indicator",
      technologies: [
        "Html",
        "CSS",
        "Python",
        "Flask",
        "NLP",
        "Machine Learning",
        "Git"
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
    }
  ]
} as const;
