// app/anime/page.tsx

import { getFullAniListData } from "../lib/anilist";
import AniListPage from "../components/Anilistpage";

export const metadata = {
  title: "Anime · Gourav Anand",
  description: "My AniList watch history and stats",
};

export default async function Page() {
  try {
    const data = await getFullAniListData("ElysianEchos");
    return <AniListPage data={data} />;
  } catch {
    return (
      <main
        className="min-h-screen flex items-center justify-center font-mono"
        style={{ backgroundColor: "#0a0a0a", color: "#9ca3af" }}
      >
        <p style={{ color: "#4ade80" }}>✗ failed to load AniList data</p>
      </main>
    );
  }
}
