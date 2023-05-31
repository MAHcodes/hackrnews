"use client";
import ArticleList from "./ArticleList";
import { fetchFeed } from "./lib/globals";
import { feedStore } from "./stores/feed";
import "./debug";
import { RelaysFloat } from "./components/RelaysFloat";
export default function Home() {
  const setFeed = feedStore((state) => state.setFeed);

  const lastPostDate = feedStore((state) => state.lastPostDate);

  async function refreshFeed() {
    setFeed(await fetchFeed(lastPostDate));
  }

  return (
    <div className="xl:grid xl:grid-cols-9">
      <div className="hidden border xl:col-span-2 xl:block ">col1</div>
      <section className="col-span- grow-1 flex flex-col items-center border lg:col-span-5">
        <button onClick={refreshFeed}>Get Feed</button>

        <ArticleList />
      </section>

      <section className="hidden px-1 xl:col-span-2 xl:block">
        <div className="sticky top-16 p-1">
          <RelaysFloat />
        </div>
      </section>
    </div>
  );
}
