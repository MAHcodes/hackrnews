import { userStore } from "../stores/user";
import { detectWebLNProvider } from "./detectWebLn";

export async function getProviders() {
  const webln = await detectWebLNProvider();
  const nostr = typeof window.nostr ? window.nostr : null;
  // const setPubkey = userStore(state => sta)

  return { webln, nostr };
}

export async function getPubkey(setPubkeyFn : (pkey : string) => void) {
  // const setPubkey = userStore((state) => state.setPubkey);
  try {
    const { webln, nostr } = await getProviders();
    // Enabling the lightning network
    if (!webln.enabled) {
      await webln.enable();
      console.debug("webln enabled!!");
    }

    // Get publicKey
    const publickey = await nostr.getPublicKey();
    // set to global store
    setPubkeyFn(publickey);
  } catch (error) {
    console.error("There was an error while loggin in -> ", error);
  }
}

// TODO: fetch user data and store it on global state
export async function fetchProfileData() {
  //
}