import { setCookie } from "./cookieHandlers";
import { detectWebLNProvider } from "./detectWebLn";

export async function getProviders() {
  const webln = await detectWebLNProvider();
  const nostr = typeof window.nostr ? window.nostr : null;

  return { webln, nostr };
}

// NOTE: The getPubkeyFunction when called from useEfftect during development mode will be called
// more than once, making it to appear errors on the console
export async function getPubkey() {
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
    return publickey;
  } catch (error) {
    console.error("There was an error while loggin in -> ", error);
  }
}

// TODO: fetch user data and store it on global state
export async function fetchProfileData() {
  //
  // console.log("Needs to fetch profile data")
}

export function logout() {
  setCookie("rememberMe", "false");

  // delete global user state
}
