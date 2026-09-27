import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import remarkSlug from "remark-slug";
import html from "remark-html";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/header";
import ReadingProgress from "../blog_components/ReadingProgress";
import TableOfContents, { TocHeading } from "../blog_components/TableOfContents";

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

function extractHeadings(contentHtml: string): TocHeading[] {
  const headingRegex = /<h([23]) id="([^"]+)">(.*?)<\/h\1>/g;
  const headings: TocHeading[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(contentHtml)) !== null) {
    const level = parseInt(match[1], 10);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const fullPath = path.join(process.cwd(), "content", `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    notFound();
  }

  let contentHtml = "";
  let headings: TocHeading[] = [];
  let frontmatter = {
    title: "",
    date: "",
    readTime: "",
    tags: [] as string[],
  };

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = await remark()
      .use(remarkSlug as any)
      .use(html)
      .process(content);
    contentHtml = processedContent.toString();
    headings = extractHeadings(contentHtml);
    frontmatter = {
      title: data.title ?? "",
      date: data.date ?? "",
      readTime: data.readTime ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
    };
  } catch (err) {
    console.error(`Error loading blog post: ${fullPath}`, err);
    notFound();
  }

  return (
    <div className="blog-page min-h-screen flex flex-col font-mono transition-colors duration-300">
      <ReadingProgress />
      <TableOfContents headings={headings} />

      <Header />

      <main className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
        <div className="w-full max-w-3xl">
          {/* Breadcrumb */}
          <p className="blog-accent text-sm mb-6">$ cat ./blog/{slug}.md</p>

          {/* Back link */}
          <Link href="/blog" className="blog-back text-xs mb-10 inline-block">
            &gt; cd ..
          </Link>

          {/* Title */}
          <h1 className="blog-title text-3xl sm:text-4xl font-normal leading-snug mt-8 mb-3">
            {frontmatter.title}
          </h1>

          <p className="blog-meta text-xs mb-4">
            {frontmatter.date} · {frontmatter.readTime}
          </p>

          {/* Tag pills, sourced directly from post frontmatter */}
          {frontmatter.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-8">
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="blog-tag-pill">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="blog-divider mb-10" />

          {/* Prose — font size bumped from text-sm (13px) to text-base
              (16px) since 13px is too small for sustained reading */}
          <div
            className="blog-prose text-base leading-[1.85]"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <div className="blog-divider mt-12 mb-8" />

          {/* Footer back */}
          <Link href="/blog" className="blog-back text-xs">
            &gt; cd ..
          </Link>
        </div>
      </main>
    </div>
  );
}
