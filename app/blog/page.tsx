import Header from "../components/header";
import Link from "next/link";
import { slugify } from "../lib/slugify";

type Post = {
  title: string;
  date: string;
  readTime: string;
  year: number;
};

const posts: Post[] = [
  {
    title: "Want to escape reality read this",
    date: "May 28, 2025",
    readTime: "2 min",
    year: 2025,
  },
  {
    title: "Transactions in Mongoose",
    date: "Jun 2, 2025",
    readTime: "3 min",
    year: 2025,
  },
  {
    title: "CORS under the hood",
    date: "July 2, 2025",
    readTime: "3 min",
    year: 2025,
  },
  {
    title: "Microservices: What?",
    date: "Oct 12, 2025",
    readTime: "3 min",
    year: 2025,
  },
];

export default function Blog() {
  const year = posts[0]?.year ?? new Date().getFullYear();

  return (
    <div className="min-h-screen text-gray-500 px-6 py-12 font-sans">
      <Header />
      <div className="max-w-3xl mx-auto pt-30">
        <h1 className="text-8xl font-bold tracking-tight opacity-10 text-outline animate-pulse slow-pulse">
          BLOG
        </h1>

        <p className="uppercase text-gray-400 tracking-wide mb-2 text-sm sm:text-base">
          I write with a cup of coffee ☕
        </p>
        <p className="text-gray-400 text-xs tracking-wide mb-10 select-none">
          <span>dev logs ✦ ideas ✦ reflections</span>
        </p>
        <h1 className="text-[100px] text-outline sm:text-[240px] font-bold text-outline-bold opacity-10 absolute top-70 px-72 sm:left-10 text-white pointer-events-none select-none z-0">
          {year}
        </h1>
        <ul className="space-y-4 text-gray-400 py-28">
          {posts.map((post, idx) => {
            const slug = slugify(post.title);
            return (
              <li key={idx} className="rounded-xl transition-all duration-300">
                <Link
                  href={`/blog/${slug}`}
                  className="flex flex-col sm:flex-row gap-10 sm:items-center hover:text-white cursor-pointer"
                >
                  <div className="text-lg font-medium">{post.title}</div>
                  <time className="text-sm">
                    {post.date} · {post.readTime}
                  </time>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
