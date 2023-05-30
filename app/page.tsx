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
      <div className="hidden xl:block xl:col-span-2 border ">col1</div>
      <section className="col-span- lg:col-span-5 flex grow-1 flex-col items-center border">
        <button onClick={refreshFeed}>Get Feed</button>

        <ArticleList />
      </section>

      <section className="hidden xl:block px-1 xl:col-span-2">
        <div className="p-1 sticky top-16">
          <RelaysFloat />
        </div>
      </section>
    </div>
  );
}
