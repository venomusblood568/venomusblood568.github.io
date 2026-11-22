"use client";

import { usePathname } from "next/navigation";
import DuckFooter from "./DuckFooter";

// Hidden on these routes and everything under them. Edit freely.
const HIDDEN_ON = ["/resume", "/researchPaper"];

// Hidden only on the child routes: "/blog/some-post" is hidden,
// but the "/blog" list page still shows the duck.
const HIDDEN_ON_CHILDREN_ONLY = ["/blog"];

export default function SiteFooter() {
  const pathname = usePathname() ?? "";
  const hidden =
    HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    HIDDEN_ON_CHILDREN_ONLY.some((p) => pathname.startsWith(`${p}/`));

  if (hidden) return null;

  return (
    <footer className="relative mt-auto" style={{ zIndex: 1 }}>
      <DuckFooter showTagline={false} />
    </footer>
  );
}