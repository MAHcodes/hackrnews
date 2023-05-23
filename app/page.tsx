"use client";
import ArticleList from "./ArticleList";
import { fetchFeed } from "./lib/globals";
import { feedStore } from "./stores/feed";

export default function Home() {
  const setFeed = feedStore((state) => state.setFeed);

  const lastPostDate = feedStore((state) => state.lastPostDate);

  async function refreshFeed() {
    setFeed(await fetchFeed(lastPostDate));
  }

  return (
    <div className="flex flex-col items-center">
      <button onClick={refreshFeed}>Get Feed</button>

      <ArticleList />
    </div>
  );
}
