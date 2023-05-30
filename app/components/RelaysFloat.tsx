import React from "react";
import { RELAYS } from "../lib/constants";

export function RelaysFloat() {
  const relays = RELAYS;
  return (
    <ul className="popup bg-bg-accent dark:bg-zinc-700 p-1 w-full">
      {relays.map((relay) => (
        <li key={relay} className="card">{relay.split("wss://")[1]}</li>
      ))}
    </ul>
  );
}
