import { create } from "zustand";
import { RELAYS } from "../lib/constants";

export type Relays = {
  relays: string[];
  setRelays: (relays: string[]) => void;
  deleteRelay: (relay: string) => void;
};

export const relaysStore = create<Relays>((set) => ({
  // default relays
  relays: RELAYS,
  setRelays: (relays) => set({ relays }),
  deleteRelay: (relay: string) =>
    set((state) => ({ relays: state.relays.filter((x) => x !== relay) })),
  addRelay: (relay: string) =>
    set((state) => ({ relays: [...state.relays, relay] })),
}));
