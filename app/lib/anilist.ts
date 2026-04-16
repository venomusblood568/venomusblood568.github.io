// app/lib/anilist.ts

const API_URL = "https://graphql.anilist.co";

// ─── TYPES ─────────────────────────────────────────

export interface AniListUser {
  id: number;
  name: string;
  avatar: { large: string };
  statistics: {
    anime: {
      count: number;
      minutesWatched: number;
      meanScore: number;
      genres: { genre: string; count: number }[];
    };
  };
}

export interface Anime {
  id: number;
  title: string;
  nativeTitle?: string;
  cover: string;
  score?: number;
  episodes?: number;
  format?: string;
  genres: string[];
}

export interface AnimeEntry {
  score: number;
  status: string;
  anime: Anime;
}

export interface ActivityEntry {
  status: string;
  progress: number | null;
  media: {
    title: { romaji: string };
    coverImage: { medium: string };
  };
}

export interface AniListData {
  user: AniListUser;
  animeList: AnimeEntry[];
  activities: ActivityEntry[];
}

// ─── NORMALIZER ─────────────────────────────────────

function normalizeAnime(media: any): Anime {
  return {
    id: media.id,
    title: media.title?.english || media.title?.romaji || "Unknown",
    nativeTitle: media.title?.native,
    cover: media.coverImage?.large,
    score: media.averageScore,
    episodes: media.episodes,
    format: media.format,
    genres: media.genres || [],
  };
}

// ─── API CALLS ─────────────────────────────────────

async function getUser(username: string): Promise<AniListUser> {
  const query = `
    query ($name: String) {
      User(name: $name) {
        id
        name
        avatar { large }
        statistics {
          anime {
            count
            minutesWatched
            meanScore
            genres { genre count }
          }
        }
      }
    }
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { name: username } }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  if (!json?.data?.User) throw new Error("Failed to fetch user");
  return json.data.User;
}

async function getAnimeList(username: string): Promise<AnimeEntry[]> {
  const query = `
    query ($name: String) {
      MediaListCollection(userName: $name, type: ANIME) {
        lists {
          entries {
            score
            status
            media {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
              }
              format
              episodes
              averageScore
              genres
            }
          }
        }
      }
    }
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { name: username } }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  if (!json?.data?.MediaListCollection) return [];

  return (
    json.data.MediaListCollection.lists?.flatMap((list: any) =>
      list.entries.map((e: any) => ({
        score: e.score,
        status: e.status,
        anime: normalizeAnime(e.media),
      })),
    ) || []
  );
}

async function getActivities(userId: number): Promise<ActivityEntry[]> {
  const query = `
    query ($userId: Int) {
      Page(perPage: 8) {
        activities(userId: $userId, type: ANIME_LIST) {
          ... on ListActivity {
            status
            progress
            media {
              title { romaji }
              coverImage { medium }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { userId } }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  return json?.data?.Page?.activities?.filter((a: any) => a.media) || [];
}

// ─── MAIN EXPORT ───────────────────────────────────

export async function getFullAniListData(
  username: string,
): Promise<AniListData> {
  const user = await getUser(username);

  const [animeList, activities] = await Promise.all([
    getAnimeList(username),
    getActivities(user.id),
  ]);

  return { user, animeList, activities };
}
