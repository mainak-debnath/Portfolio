"use client";

import { DATA } from "@/data/resume";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.16em] text-foreground/90 uppercase">
          {DATA.name}
        </Link>
        <span className="text-xs text-muted-foreground">{DATA.location}</span>
      </div>
    </header>
  );
}
