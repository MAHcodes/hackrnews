"use client";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import "@/styles/globals.css";
import Link from "next/link";
import Logo from "@/app/Logo";
import { ColorTheme } from "../ColorTheme";
import { links } from "./links";
import LoginModal from "../LoginModal";
import { userStore } from "@/app/stores/user";
import { UserMenu } from "./UserMenu";
import { Menu } from "./UserMenu/Menu";

const Header = () => {
  const pubkey = userStore((state) => state.pubkey);

  return (
    <header className="txt-color sticky top-0 z-30 bg-bg-accent px-4 py-1 shadow-lg dark:bg-zinc-700">
      <nav className="body-content flex items-center justify-evenly">
        {/* Logo */}
        <div className="flex h-full grow ">
          <Logo />
        </div>

        {/* links */}
        <div className="hidden grow-0 items-center  justify-center space-x-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="ghost-button flex items-center gap-2"
            >
              <span
                className="h-5 w-5"
                dangerouslySetInnerHTML={{ __html: link.icon }}
              ></span>
              {link.name}
            </Link>
          ))}
          <Link href={"/post"} className="bordered-button">
            <PencilSquareIcon className="h-5 w-5" />
            Post
          </Link>
        </div>

        <div className="relative flex grow items-center justify-end gap-4">
          <form className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </span>
            <input
              type="text"
              placeholder="/"
              className="block cursor-pointer rounded-md bg-transparent px-2 py-1 pl-9 ring-1 ring-gray-500 focus:w-auto focus:cursor-auto"
            />
          </form>

          <ColorTheme />

          {/* {pubkey ? <UserMenu /> : <LoginModal />} */}
          {pubkey ? <Menu /> : <LoginModal />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
