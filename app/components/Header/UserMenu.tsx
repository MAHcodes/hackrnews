"use client";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { nip19 } from "nostr-tools";
import React, { Fragment, useState } from "react";
import { DUMMY_PROFILE_API } from "../../lib/avatars";
import { userStore } from "../../stores/user";

export const UserMenu = () => {
  const pubkey = userStore((state) => state.pubkey);
  const [picture, setPicture] = useState(
    DUMMY_PROFILE_API(nip19.npubEncode(pubkey))
  );

  return (
    <div className="flex items-center">
      <Menu
        as={"div"}
        className="inline-block max-w-sm text-left align-baseline"
      >
        {({ open }) => (
          <>
            {/* Avatar */}
            <Menu.Button
              className={`ghost-round-button relative overflow-hidden ${
                open ? "bg-black/30" : "bg-transparent"
              }`}
            >
              <img src={picture} className="h-6 w-6 rounded" />
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
                <Link href={`u/${pubkey}`}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {}}
                        className={` flex w-full items-center rounded-md border px-2 py-2 text-sm ${
                          active
                            ? "border-orange-600 bg-stone-200 text-orange-600 dark:bg-stone-800 "
                            : "txt-color border-transparent"
                        }`}
                      >
                        <span className="ml-2">Settings</span>
                      </button>
                    )}
                  </Menu.Item>
                </Link>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      //TODO: Handle logout
                      onClick={() => {}}
                      className={` flex w-full items-center rounded-md border px-2 py-2 text-sm ${
                        active
                          ? "border-orange-600 bg-stone-200 text-orange-600 dark:bg-stone-800 "
                          : "txt-color border-transparent"
                      }`}
                    >
                      <span className="ml-2">Logout</span>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};
