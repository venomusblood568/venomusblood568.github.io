// import Image from "next/image";

// export default function AnimeDashboard({ data }: any) {
//   if (!data || !data.user) {
//     return <div className="text-white p-6">No data available</div>;
//   }

//   const { user, animeList, activities } = data;

//   const animeStats = user.statistics?.anime || {};

//   const daysWatched = animeStats.minutesWatched
//     ? (animeStats.minutesWatched / 60 / 24).toFixed(1)
//     : 0;

//   const topGenres = (animeStats.genres || [])
//     .sort((a: any, b: any) => b.count - a.count)
//     .slice(0, 4);

//   const topAnime = (animeList || []).slice(0, 6);

//   return (
//     <div className="max-w-6xl mx-auto p-6 text-white">
//       {/* Stats */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <Stat title="Total Anime" value={animeStats.count || 0} />
//         <Stat title="Days Watched" value={daysWatched} />
//         <Stat title="Mean Score" value={animeStats.meanScore || 0} />
//       </div>

//       {/* Genres */}
//       <div className="mb-6">
//         <h3 className="mb-2 opacity-70">Genre Overview</h3>
//         <div className="flex gap-3 flex-wrap">
//           {topGenres.map((g: any) => (
//             <div key={g.genre} className="px-3 py-2 bg-neutral-800 rounded-lg">
//               {g.genre} ({g.count})
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Anime */}
//       <div className="mb-6">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
//           {topAnime.map((anime: any) => (
//             <Image
//               key={anime.id}
//               src={anime.coverImage?.large}
//               alt={anime.title?.romaji || "anime"}
//               width={120}
//               height={160}
//               className="rounded-lg"
//             />
//           ))}
//         </div>
//       </div>

//       {/* Activity */}
//       <div className="space-y-3">
//         {(activities || []).map((act: any, i: number) => (
//           <div key={i} className="flex gap-3 bg-neutral-900 p-3 rounded-lg">
//             <Image
//               src={act.media?.coverImage?.medium}
//               alt=""
//               width={50}
//               height={70}
//               className="rounded"
//             />
//             <p className="text-sm">
//               {act.status} {act.progress} of {act.media?.title?.romaji}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function Stat({ title, value }: any) {
//   return (
//     <div className="bg-neutral-900 p-4 rounded-lg text-center">
//       <p className="text-xl font-semibold">{value}</p>
//       <p className="text-sm opacity-60">{title}</p>
//     </div>
//   );
// }
