import { CogIcon, HeartIcon, UserIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function About() {
  return (
    <div className="relative h-full space-x-2 space-y-2 p-4">
      {/* <FillButton onClick={alerto}>Primary Button</FillButton> */}
      {/* <BorderedButton>Border Button</BorderedButton> */}
      {/* <GhostButton onClick={alerto}>Ghost Button</GhostButton> */}
      <button className="fill-button inline-block">button</button>
      <button className="bordered-button inline-block">button</button>
      <button className="ghost-button inline-block shadow">button</button>

      <button className="fill-round-button">
        <HeartIcon className="h-5 w-5" />
      </button>
      <button className="bordered-round-button">
        <UserIcon className="h-5 w-5" />
      </button>
      <button className="ghost-round-button shadow">
        <CogIcon className="h-5 w-5" />
      </button>

      <h1 className="title">I am a title</h1>
      <h2 className="subtitle">I am a subtitle</h2>
      <p className="txt-color">This is a normal paragraph</p>

      {/* for a popup it is required to make the parent as relative and specify the position */}
      <div className="popup right-0 top-0 flex h-40 w-52 items-center justify-center">
        this is a popup
      </div>

      <div className="card p-4">This is a card (with hoover effect)</div>
      <div className="link">www.this-is-a-link.org</div>

      <span className="bordered-crumb m-2">#crumb</span>
      <span className="fill-crumb m-2">#crumb</span>
    </div>
  );
}
