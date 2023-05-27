import { Kind } from "nostr-tools";
import { create } from "zustand";
import { POOL, RELAYS } from "../lib/constants";

// This is the structure found on the "content" property of a nostr event after parsed to JSON
export type User = {
  about: string;
  display_name: string;
  lud06: string;
  name: string;
  nip05: string;
  picture: string;
  website: string;
};

export interface Profile extends User {
  relay: string;
}

export type UserStore = {
  profiles: Profile[];
  pubkey: string;
  // This will return an array of profiles for each of the selected relays (only if the user has a
  // profile defined in that relay)
  login: (pubkey: string) => void;
};

export const userStore = create<UserStore>((set) => ({
  profiles: [],
  pubkey: "",
  login: async (pubkey) => {
    const profiles = await getProfiles(pubkey);
    set({ profiles, pubkey });
  },
}));

async function getProfiles(pubkey: string): Promise<Profile[]> {
  // Fetch all profiles per relay
  const listRes = await POOL.list(RELAYS, [
    {
      authors: [pubkey],
      kinds: [Kind.Metadata],
    },
  ]);
  console.log("listRes: ", listRes);

  const profiles: Profile[] = listRes.map((e) => {
    let profile: User = JSON.parse(e.content);
    console.log("profile: ", profile);
    const relayOfOrigin = POOL.seenOn(e.id)[0];

    return {
      ...profile,
      relay: relayOfOrigin,
    };
  });

  console.log("json profiles: ", profiles);
  return profiles;
}
