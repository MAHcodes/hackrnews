import { Kind, Event } from "nostr-tools";
import { create } from "zustand";

export type FeedStore = {
  feed: Event<Kind.Article>[];
  lastPostDate: number;
  setFeed: (evArr: Event<Kind.Article>[]) => void;
};

export const feedStore = create<FeedStore>((set) => ({
  feed: [],
  lastPostDate: 0,
  setFeed: (evArr) =>
    set((state) => {
      console.debug("to be stated: ", evArr);
      state.feed.push(...evArr);
      return {
        lastPostDate: evArr.at(-1)!.created_at,
        feed: state.feed,
      };
    }),
}));
