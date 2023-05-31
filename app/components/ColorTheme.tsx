"use client";
import { Menu, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState } from "react";
import { getCookie, setCookie } from "../lib/cookieHandlers";
import { themeResolver } from "../lib/theme";
export const ColorTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [displayIcon, setDisplayIcon] = useState(
    <ComputerDesktopIcon className="h-5 w-5" />
  );
  const themeOptions = [
    { name: "System", icon: <ComputerDesktopIcon className="h-5 w-5" /> },
    { name: "Light", icon: <SunIcon className="h-5 w-5" /> },
    { name: "Dark", icon: <MoonIcon className="h-5 w-5" /> },
  ];

  function changeTheme(value: string | undefined) {
    if (value === undefined) value = getCookie("theme") || "system";
    setCookie("theme", value);
    setSelectedTheme(value);
    switch (value) {
      case "light":
        setDisplayIcon(<SunIcon className="h-5 w-5" />);
        themeResolver("light");
        break;
      case "dark":
        setDisplayIcon(<MoonIcon className="h-5 w-5" />);
        themeResolver("dark");
        break;
      default:
        setDisplayIcon(<ComputerDesktopIcon className="h-5 w-5" />);
        themeResolver("system");
    }
  }

  useEffect(() => {
    changeTheme(undefined);
  }, []);

  return (
    <Menu as={"div"} className="relative inline-block max-w-sm text-left">
      {({ open }) => (
        <>
          <Menu.Button
            className={`ghost-round-button ${
              open ? "bg-black/30" : "bg-transparent"
            }`}
          >
            {displayIcon}
          </Menu.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="popup right-0 mt-1 w-40 origin-top-right ">
              {themeOptions.map((theme) => {
                return (
                  <Menu.Item key={theme.name}>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          changeTheme(theme.name.toLowerCase());
                        }}
                        className={` flex w-full items-center rounded-md border px-2 py-2 text-sm ${
                          active
                            ? "border-orange-600 bg-stone-200 text-orange-600 dark:bg-stone-800 "
                            : "txt-color border-transparent"
                        }`}
                      >
                        {theme.icon}
                        <span className="ml-2">{theme.name}</span>
                        {theme.name.toLowerCase() === selectedTheme ? (
                          <CheckIcon className="ml-auto h-5 w-5" />
                        ) : (
                          <></>
                        )}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
