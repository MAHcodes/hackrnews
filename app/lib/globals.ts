import { POOL, RELAYS } from "./constants";
import { Kind, Event } from "nostr-tools";

/**
 * @param {number} lastPostDate
 * @returns {Event<Kind.Article>} An array of Article Events(kind 30023) until "lastPostDate"
 * @link https://github.com/nostr-protocol/nips/blob/master/README.md#event-kinds
 */
export async function fetchFeed(
  lastPostDate: number
): Promise<Event<Kind.Article>[]> {
  const feed = await POOL.list(
    [RELAYS[0]],
    [
      {
        kinds: [Kind.Article],
        // limit * relays
        limit: 20,
        until: lastPostDate > 0 ? lastPostDate : Date.now(),
      },
    ],
    {
      verb: "REQ",
    }
  );

  // check the origin of the event
  feed.forEach((e) => {
    const relayOfOrigin = POOL.seenOn(e.id);
    console.log("relayOfOrigin: ", relayOfOrigin);
    console.log("id: ", e.id);
  });

  return feed;
}
