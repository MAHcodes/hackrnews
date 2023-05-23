import { mountStoreDevtool } from "simple-zustand-devtools";
import { feedStore } from "./stores/feed";
import { userStore } from "./stores/user";

// This is to debug zustand stores using react-dev-tools on your browser.

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("feedStore", feedStore);
  mountStoreDevtool("userStore", userStore);
}
