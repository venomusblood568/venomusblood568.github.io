// // features/anilist/AniListWidget.tsx

// import { getAniListUser } from "../lib/anilist";
// import AniListCard from "./AniListCard";

// export default async function AniListWidget() {
//   try {
//     const user = await getAniListUser("ElysianEchos");
//     return <AniListCard user={user} />;
//   } catch (e) {
//     return (
//       <div className="text-sm text-neutral-500">
//         Failed to load AniList data
//       </div>
//     );
//   }
// }
