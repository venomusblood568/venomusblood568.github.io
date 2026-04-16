// "use client";

// import { AnimeEntry } from "../lib/anilist";

// export default function AnimeCard({ entry }: { entry: AnimeEntry }) {
//   const anime = entry.anime;

//   return (
//     <div className="relative group w-[180px]">
//       {/* Cover */}
//       <img
//         src={anime.cover}
//         alt={anime.title}
//         className="rounded-lg transition-transform duration-300 group-hover:scale-105"
//       />

//       {/* Hover Card */}
//       <div className="pointer-events-none absolute bottom-0 left-0 w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
//         <div className="bg-black/80 backdrop-blur-md rounded-lg p-3 shadow-lg text-sm">
//           <h3 className="text-white font-semibold leading-tight">
//             {anime.title}
//           </h3>

//           {anime.nativeTitle && (
//             <p className="text-gray-400 text-xs">{anime.nativeTitle}</p>
//           )}

//           <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-300">
//             {anime.score && <span>⭐ {anime.score / 10}</span>}
//             {anime.format && <span>• {anime.format}</span>}
//             {anime.episodes && <span>• {anime.episodes} eps</span>}
//           </div>

//           {anime.genres.length > 0 && (
//             <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-gray-400">
//               {anime.genres.slice(0, 2).map((g) => (
//                 <span key={g}>{g}</span>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
