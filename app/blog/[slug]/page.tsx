/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";
import Header from "../../components/header";

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

export default async function BlogPost(props: any) {
  const slug = (props.params as any).slug;
  const fullPath = path.join(process.cwd(), "content", `${slug}.md`);

  // ── 404 ──────────────────────────────────────────────────────────────────
  if (!fs.existsSync(fullPath)) {
    return (
      <div className="blog-page min-h-screen flex flex-col font-mono">
        <Header />
        <div className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
          <div className="w-full max-w-3xl">
            <p className="blog-accent text-sm mb-8">$ cat ./blog/{slug}.md</p>
            <div className="blog-card rounded-lg p-8 text-center">
              <p className="blog-ghost-num text-6xl font-normal mb-4">404</p>
              <p className="blog-meta text-sm mb-4">
                Post not found — still writing with a cup of coffee.
              </p>
              <Link
                href="/blog"
                className="blog-accent text-xs transition-opacity hover:opacity-75"
              >
                &gt; cd ..
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Load post ─────────────────────────────────────────────────────────────
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);

    return (
      <div className="blog-page min-h-screen flex flex-col font-mono transition-colors duration-300">
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
              {data.title}
            </h1>

            <p className="blog-meta text-xs mb-10">
              {data.date} · {data.readTime}
            </p>

            <div className="blog-divider mb-10" />

            {/* Prose */}
            <div
              className="blog-prose text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
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
  } catch (err) {
    console.error(`Error loading blog post: ${fullPath}`, err);
    return (
      <div className="blog-page min-h-screen flex flex-col font-mono">
        <Header />
        <div className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
          <div className="w-full max-w-3xl">
            <div className="blog-card rounded-lg p-8 text-center">
              <p className="blog-meta text-sm mb-4">
                Something went wrong loading this post.
              </p>
              <Link
                href="/blog"
                className="blog-accent text-xs transition-opacity hover:opacity-75"
              >
                &gt; cd ..
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
