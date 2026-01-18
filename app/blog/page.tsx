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
  {
    title: "Simply create portal",
    date: "Dec 30, 2025",
    readTime: "3 min",
    year: 2025,
  },
  {
    title: "When Analytics Miss a User",
    date: "Jan 18, 2026",
    readTime: "3 min",
    year: 2026,
  },
];

export default function Blog() {
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Group posts by year
  const postsByYear = sortedPosts.reduce((acc, post) => {
    if (!acc[post.year]) {
      acc[post.year] = [];
    }
    acc[post.year].push(post);
    return acc;
  }, {} as Record<number, Post[]>);

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

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

        {years.map((year) => (
          <div key={year} className="relative mb-40">
            <h1 className="text-[100px] sm:text-[240px] font-bold text-outline-bold opacity-10 absolute top-0 sm:left-10 text-white pointer-events-none select-none z-0">
              {year}
            </h1>
            <ul className="space-y-4 text-gray-400 relative z-10 pt-28">
              {postsByYear[year].map((post, idx) => {
                const slug = slugify(post.title);
                const isLatest = year === years[0] && idx === 0;

                return (
                  <li
                    key={idx}
                    className="rounded-xl transition-all duration-300"
                  >
                    <Link
                      href={`/blog/${slug}`}
                      className="flex flex-col sm:flex-row gap-10 sm:items-center hover:text-white cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {isLatest && (
                          <span className="text-white-500 animate-pulse">
                            ✦
                          </span>
                        )}
                        <div className="text-lg font-medium">{post.title}</div>
                      </div>
                      <time className="text-sm">
                        {post.date} · {post.readTime}
                      </time>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
