"use client";
import { ArrowRightOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../lib/cookieHandlers";
import { getProviders, getPubkey } from "../lib/loginUtils";
import { userStore } from "../stores/user";
import Modal from "@/app/components/Modal";

export default function LoginModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  let [hasExt, setHasExt] = useState(false);
  const user = userStore();
  const cookie = getCookie("rememberMe") || "false";

  const openModal = async () => {
    // Verify webln and nostr availability
    if (!hasExt) {
      const { webln, nostr } = await getProviders();

      if (webln && nostr) {
        setHasExt(true);
      } else {
        setHasExt(false);
      }
    }
    setIsOpen(true);
  };

  const loginHandler = async () => {
    const pubkey = await getPubkey();
    user.login(pubkey);

    if (cookie === "false") {
      setCookie("rememberMe", rememberMe.toString(), 30);
    }
  };

  useEffect(() => {
    const cookie = getCookie("rememberMe");
    if (cookie === "true") {
      setRememberMe(true);
      loginHandler();
    } else {
      setRememberMe(false);
    }
  }, []);

  return (
    <>
      <button type="button" onClick={openModal} className="fill-round-button">
        <UserIcon className="h-5 w-5" />
      </button>

      <Modal
        title={hasExt ? "LOGIN" : "Oops!"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {hasExt ? (
          <>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                inputs go here, styles needed
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-gray-500">
                <input
                  type="checkbox"
                  name="remember-me"
                  onClick={(ev) => {
                    setRememberMe(ev.currentTarget.checked);
                  }}
                />
                <label className="ml-2 text-sm" htmlFor="remember-me">
                  Remember me for 30 days.
                </label>
              </div>

              <button
                type="button"
                className="fill-button ml-auto"
                onClick={loginHandler}
              >
                login <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : (
          <DownloadExtension />
        )}
      </Modal>
    </>
  );
}

const DownloadExtension = () => {
  return (
    <>
      <p className="text-sm text-gray-500">
        It seems you don&apos;t have a supported extension.
      </p>
      <p>
        Consult{" "}
        <a href="https://www.webln.guide/ressources/webln-providers">here</a>{" "}
        for more information
      </p>
    </>
  );
};
