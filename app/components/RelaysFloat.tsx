import React from "react";
import { RELAYS } from "../lib/constants";

export function RelaysFloat() {
  const relays = RELAYS;
  return (
    <ul className="popup w-full bg-bg-accent p-1 dark:bg-zinc-700">
      {relays.map((relay) => (
        <li key={relay} className="card">
          {relay.split("wss://")[1]}
        </li>
      ))}
    </ul>
  );
}
