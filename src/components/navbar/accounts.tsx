"use client";

import SpinningLoader from "@/ui/spinning-loader";
import { Profile, retrieveProfile } from "@/utils/actions/auth";
import { getProviders } from "@/utils/nostr";
import { Button, OutlineButton } from "@ui/buttons";
import { User2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Accounts({ profiles }: { profiles: Profile[] | null }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profiles) console.log("profiles: ", profiles);
  });

  async function loginWithExtension() {
    setIsLoading(true);
    try {
      const { webln, nostr } = await getProviders();
      // Enabling the lightning network
      if (!webln.enabled) {
        await webln.enable();
        console.info("webln enabled!!");
      }

      // Get publicKey
      const publickey = await nostr.getPublicKey();
      console.log("public key:", publickey);

      await retrieveProfile(publickey);
    } catch (error) {
      // TODO: handle error properly
      console.error("There was an error while loggin in -> ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {profiles ? (
        <Button variant="ghost" className="flex -space-x-4">
          {profiles.map((account) => (
            <img
              key={account.relay}
              className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-success"
              width={8}
              height={8}
              src={account.picture}
              alt="Profile Picus"
            />
          ))}
        </Button>
      ) : (
        <OutlineButton
          variant="primary"
          onClick={loginWithExtension}
          className="flex -space-x-4"
        >
          {isLoading ? (
            <SpinningLoader />
          ) : (
            <User2Icon className="h-5 w-5" />
          )}
          Login
        </OutlineButton>
      )}
    </>
  );
}
