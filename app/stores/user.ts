import { Kind } from "nostr-tools";
import { create } from "zustand";
import { POOL, RELAYS } from "../lib/constants";

export type User = {
  about: string
  display_name: string
  lud06: string
  name: string
  nip05: string
  picture: string
  website: string
  pubkey: string
};


export interface UserState extends User {
  setUser: (user: User) => void;
  setPubkey: (pubkey: string) => void;
}

export const userStore = create<UserState>((set) => ({
  about: "",
  display_name: "",
  lud06: "",
  name: "",
  nip05: "",
  picture: "",
  website: "",
  pubkey: "",
  setUser: (user: User) => {
    return set({
      about: user.about,
      display_name: user.display_name,
      lud06: user.lud06,
      name: user.name,
      nip05: user.nip05,
      picture: user.picture,
      website: user.website,
    });
  },
  setPubkey: (pubkey: string) => {
    return set({
      pubkey: pubkey,
    });
  },
}));

export type User2 = {
  about: string
  display_name: string
  lud06: string
  name: string
  nip05: string
  picture: string
  website: string
  pubkey: string
  getUser: (pubkey: string) => void
};

export const userStore2 = create<User2>((set) => ({
  about: "",
  display_name: "",
  lud06: "",
  name: "",
  nip05: "",
  picture: "",
  website: "",
  pubkey: "",
  getUser: (pubkey: string) => {
    login(pubkey, set)
  }
}))

// TODO:
// refactor this to get instead of a subscription
// rename to fetch profile instead of login
function login(pubkey: string, callback: (user: User) => void) {

  const sub = POOL.sub(RELAYS, [
    {
      kinds: [Kind.Metadata],
      authors: [pubkey],
    },
  ])

  // Depending on the design decion of hackrnews this should only be of length 1
  console.log(RELAYS)
  let profile: User[] = new Array<User>()

  sub.on("event", (event) => {
    profile.push(JSON.parse(event.content))
  })

  sub.on("eose", () => {
    console.log(profile)
    if (profile.length > 0) {
      callback({ ...profile[0], pubkey })
      console.log("Profile: ", profile)
    } else {
      console.log("no profile")
    }
    sub.unsub()
  })
}
