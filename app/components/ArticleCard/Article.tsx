"use client";

import {
  ArrowUpIcon,
  BoltIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getRelativeTime, shortenHash } from "@/app/lib/utils";
import { Event, nip19 } from "nostr-tools";
import { useRelays } from "@/app/stores/relays";
import { userProfiles } from "@/app/stores/profiles";

// definitions missing like sats, upvotes, author (author link etc etc)
type PostDetails = {
  title: string;
  createdAt: number;
  source: string;
};

export default function Article({ event, index }: any) {
  // const [title, setTitle] = useState("");
  // const [url, setUrl] = useState("")
  // const [createdAt, setCreatedAt] = useState("")
  // const [client, setClient] = useState("")

  const [postDetails, setPostDetails] = useState<PostDetails | null>(null);
  const { activeRelay } = useRelays((state) => state);

  const { profiles, reload } = userProfiles();

  const getTagValue = (name: string, tags: string[][]) => {
    const [itemTag] = tags.filter((tag: string[]) => tag[0] === name);
    const [, item] = itemTag || [, undefined];
    return item;
  };
  const [author, setAuthor] = useState<{ name: string; picture: string }>({
    name: "",
    picture: "",
  });
  const npub = nip19.npubEncode(event.pubkey);

  useEffect(() => {
    setAuthor({
      name: getName(event),
      picture: getPicture(event),
    });
  }, [activeRelay, reload]);

  const getName = (event: Event) => {
    if (!activeRelay) return shortenHash(npub);

    const relayUrl = activeRelay.url.replace("wss://", "");
    const profileKey = `profile_${relayUrl}_${event.pubkey}`;
    const profile = profiles[profileKey];

    if (profile && profile.content) {
      const profileContent = JSON.parse(profile.content);
      return profileContent.name || shortenHash(npub);
    }

    return shortenHash(npub);
  };

  const getPicture = (event: Event) => {
    if (!activeRelay) return;

    const relayUrl = activeRelay.url.replace("wss://", "");
    const profileKey = `profile_${relayUrl}_${event.pubkey}`;
    const profile = profiles[profileKey];

    if (profile && profile.content) {
      // TODO: check if this exists
      const profileContent = JSON.parse(profile.content);
      if (profileContent.picture === "") {
        return;
      }

      return profileContent.picture;
    }

    return;
  };

  // NOTE: Use temporal api for date
  useEffect(() => {
    const tags: string[][] = event.tags;
    // setTitle(getTagValue("title", tags));
    setPostDetails({
      title: getTagValue("title", tags),
      source: "https://www.insert-link-here.org",
      createdAt: event.created_at,
    });
    // console.log("EVENT:", event);
  }, []);

  // for now this will use mockdata
  return (
    <li className="card group relative flex items-center py-1 lg:gap-4">
      {/* Post index */}
      <span className="grow-0 text-center font-mono text-2xl font-light text-gray-500 group-hover:text-primary">
        {index}.
      </span>

      {/* Midle content (title, views, etc)*/}
      <div className="grow py-1 pl-6">
        {/* Description */}
        <h3 className="subtitle line-clamp-2">{postDetails?.title}</h3>

        {/* URL */}
        {postDetails?.source && (
          <Link className="flex items-center" href={postDetails.source}>
            <LinkIcon className="mr-1 h-3 w-3" />[
            <span className="link inline-block text-clip align-bottom uppercase">
              {postDetails.source}
            </span>
            ]
          </Link>
        )}

        <div className="flex gap-1 pt-1 align-top text-xs text-gray-500 dark:text-gray-400 lg:gap-4">
          {/* Views */}
          <div className="flex items-center ">
            <EyeIcon className="mr-1 h-3 w-3" />
            <span>35</span>
          </div>

          {/* sats */}
          <div className="flex cursor-pointer items-center hover:underline">
            {/* <IconBitcoin className="mr-1"></IconBitcoin> */}
            <button>
              <BoltIcon className="mr-1 h-3 w-3" />
            </button>
            35 sats
          </div>

          {/* Upvotes */}
          <div className="flex cursor-pointer items-center hover:underline">
            {/* <IconBitcoin className="mr-1"></IconBitcoin> */}
            <ArrowUpIcon className="mr-1 h-3 w-3" />
            237 upvotes
          </div>

          {/* Replies */}
          <div className="flex cursor-pointer items-center hover:underline">
            <ChatBubbleOvalLeftEllipsisIcon className="mr-1 h-3 w-3" />
            35 comments
          </div>
        </div>
      </div>

      <div className="flex shrink-0 basis-1/3 items-center py-1">
        {/* User Avatar */}
        <img
          className="mx-2 h-10 w-10 rounded-full"
          width={10}
          height={10}
          src={author.picture || "/avatar.png"}
          alt=""
        />
        {/* Post details*/}
        <div className="">
          <div className="cursor-pointer text-xs font-bold text-gray-500 hover:underline dark:text-gray-400">
            by: <span className="txt-color">{author.name}</span>
          </div>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            created <span>{getRelativeTime(postDetails?.createdAt!)}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
