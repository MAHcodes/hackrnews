import React, { ReactNode } from "react";

// IMPORTANT: These components can only be used on the client ("use client")
// To take advantage of the server side rendering there will be classnames with the same styles
// check global.css

type ButtonProps = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export const FillButton = (props: ButtonProps) => {
  return (
    <button
      onClick={() => props.onClick && props.onClick()}
      className={`flex items-center gap-2 rounded-md bg-primary px-4 py-2 
      text-white outline-offset-2 outline-primary transition-all ease-in-out hover:bg-opacity-70 active:bg-primary/50
      ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
};

export function BorderedButton(props: ButtonProps) {
  return (
    <button
      onClick={() => props.onClick && props.onClick()}
      className={`flex items-center gap-2 rounded-md border border-primary px-4 py-2 text-primary 
      outline-offset-4 outline-primary ring-0 transition-all ease-in-out hover:bg-primary/10 active:bg-primary/30
      ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

export function GhostButton(props: ButtonProps) {
  return (
    <button
      onClick={() => props.onClick && props.onClick()}
      className={`ease-in-out; rounded-md px-4 py-2 outline-offset-2 outline-primary
      transition-all hover:bg-gray-400/60
      ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

export const FillRoundButton = (props: ButtonProps) => {
  return (
    <button
      onClick={() => props.onClick && props.onClick()}
      className={`rounded-full bg-primary p-2 text-white 
      outline-offset-2 outline-primary transition-all ease-in-out hover:bg-opacity-70 active:bg-primary/50
      ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
};

export function BorderedRoundButton(props: ButtonProps) {
  return (
    <button
      onClick={() => props.onClick && props.onClick()}
      className={`rounded-full border border-primary p-2 text-primary outline-offset-4 
      outline-primary ring-0 transition-all ease-in-out hover:bg-primary/10 active:bg-primary/30
      ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

export function GhostRoundButton(props: ButtonProps) {
  return (
    <button
      onClick={() => props.onClick && props.onClick()}
      className={`ease-in-out; rounded-full p-2 outline-offset-2 outline-primary
      transition-all hover:bg-gray-400/60
      ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}
