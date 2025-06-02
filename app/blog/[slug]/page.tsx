/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import Link from "next/link";

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
  // Use type assertion to bypass TypeScript checking
  const slug = (props.params as any).slug;
  const fullPath = path.join(process.cwd(), "content", `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return (
      <div className="min-h-screen bg-black text-gray-300 px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mt-20">
          <h1 className="text-3xl font-semibold text-red-500">
            404 - Not Found
          </h1>
          <p className="text-gray-500 mt-2">Still writing with a cup of coffee</p>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-gray-400 font-mono"
          >
            <br />  
            {">"} cd ..
          </Link>
        </div>
      </div>
    );
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);

    return (
      <div className="min-h-screen bg-black text-gray-300 px-4 py-8 pt-40">
        <main className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {data.title}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            {data.date} · {data.readTime}
          </p>

          <span className="animate-slide-up">
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: processedContent.toString() }}
            />
          </span>

          <div className="mt-10 text-sm">
            <Link
              href="/blog"
              className="text-gray-700 hover:text-gray-400 font-mono"
            >
              {">"} cd ..
            </Link>
          </div>
        </main>
      </div>
    );
  } catch (err) {
    console.error(`Error loading blog post: ${fullPath}`, err);
    return (
      <div className="min-h-screen bg-black text-gray-300 px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mt-20">
          <h1 className="text-3xl font-semibold text-yellow-500">
            Error Loading Post
          </h1>
          <p className="text-gray-500 mt-2">Something went wrong.</p>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-gray-400 font-mono"
          >
            {">"} cd ..
          </Link>
        </div>
      </div>
    );
  }
}
