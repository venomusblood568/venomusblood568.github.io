import Header from "../components/header";

type Post = {
  title: string;
  date: string;
  readTime: string;
  year: number;
  lang: string;
};

const posts: Post[] = [
  {
    title: "Categorize Your Dependencies",
    date: "Apr 28",
    readTime: "8min",
    year: 2025,
    lang: "EN",
  },
];

function getMonthYear(post: Post): string {
  const [month] = post.date.split(" ");
  return `${month} ${post.year}`;
}

export default function Blog() {
  const groupedByMonthYear = posts.reduce<Record<string, Post[]>>(
    (acc, post) => {
      const key = getMonthYear(post);
      if (!acc[key]) acc[key] = [];
      acc[key].push(post);
      return acc;
    },
    {}
  );

  const monthOrder: Record<string, number> = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  const sortedKeys = Object.keys(groupedByMonthYear).sort((a, b) => {
    const [aMonth, aYear] = a.split(" ");
    const [bMonth, bYear] = b.split(" ");
    const aVal = Number(aYear) * 100 + monthOrder[aMonth];
    const bVal = Number(bYear) * 100 + monthOrder[bMonth];
    return bVal - aVal;
  });

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

        {sortedKeys.map((key) => (
          <section
            key={key}
            className="mb-12 border-b border-gray-700 pb-8 last:border-none"
          >
            <h2 className="text-2xl font-bold text-white/80 mb-6 tracking-wide border-b border-white/10 pb-2 animate-pulse slow-pulse">
              {key}
            </h2>
            <ul className="space-y-4">
              {groupedByMonthYear[key].map((post, idx) => (
                <li
                  key={idx}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-white/5 hover:shadow-md hover:text-white rounded-xl px-5 py-4 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                >
                  <div className="text-lg font-medium text-white/90">
                    {post.title}
                  </div>
                  <time className="text-sm text-gray-400 whitespace-nowrap">
                    {post.date} · {post.readTime}
                  </time>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
