import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/header";
import HexBackground from "../../components/Hexbackground";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content");

  if (!fs.existsSync(postsDirectory)) {
    console.error("Content directory not found at build time");
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ""),
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const fullPath = path.join(process.cwd(), "content", `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  let contentHtml = "";
  let frontmatter = { title: "", date: "", readTime: "" };

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    contentHtml = processedContent.toString();
    frontmatter = {
      title: data.title ?? "",
      date: data.date ?? "",
      readTime: data.readTime ?? "",
    };
  } catch (err) {
    console.error(`Error loading blog post: ${fullPath}`, err);
    notFound();
  }

  return (
    <div className="blog-page min-h-screen flex flex-col font-mono transition-colors duration-300">
      {/* ✅ HexBackground — self-detects dark mode since this is a server component */}
      <HexBackground />
      <Header />

      <main className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
        <div className="w-full max-w-3xl">
          {/* Breadcrumb */}
          <p className="blog-accent text-sm mb-6">$ cat ./blog/{slug}.md</p>

          {/* Back link */}
          <Link
            href="/blog"
            className="blog-back text-xs mb-10 inline-block transition-opacity duration-150 hover:opacity-75"
          >
            &gt; cd ..
          </Link>

          {/* Title */}
          <h1 className="blog-title text-3xl sm:text-4xl font-normal leading-snug mt-8 mb-3">
            {frontmatter.title}
          </h1>

          <p className="blog-meta text-xs mb-10">
            {frontmatter.date} · {frontmatter.readTime}
          </p>

          <div className="blog-divider mb-10" />

          {/* Prose */}
          <div
            className="blog-prose text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div className="blog-divider mt-12 mb-8" />

          {/* Footer back */}
          <Link
            href="/blog"
            className="blog-back text-xs transition-opacity duration-150 hover:opacity-75"
          >
            &gt; cd ..
          </Link>
        </div>
      </main>
    </div>
  );
}
