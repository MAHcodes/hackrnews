import { userStore } from "@/app/stores/user";
import { Popover, Transition } from "@headlessui/react";
import {
  Cog8ToothIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

export function Menu() {
  const userProfiles = userStore((state) => state.profiles);
  const seed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${seed}`;
  const pubkey = userStore((state) => state.pubkey);

  return (
    <Popover className="relative">
      {({ open }) => (
        <div className="relative">
          <Popover.Button className="bordered-button">Account</Popover.Button>
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
            <Popover.Panel className="popup right-0 mt-1 w-screen max-w-sm lg:max-w-sm">
              {/* settings button */}
              <button className="ghost-round-button mb-1 ml-auto block p-1">
                <Cog8ToothIcon className="rounded-btn h-5 w-5" />
              </button>

              <ul className="space-y-2">
                {userProfiles.map((profile) => (
                  // <li
                  //   key={profile.relay}
                  //   className="rounded-md p-2 ring-1 ring-black/10 relative hover:ring-primary hover:bg-orange-600/10"
                  // >
                  //   {/* Card actions */}
                  //   <div className="flex justify-end gap-3 mb-2">
                  //     <button className="fill-round-button">
                  //       <PencilIcon className="w-4 h-4" />
                  //     </button>
                  //     <button>
                  //       <TrashIcon className="w-4 h-4" />
                  //     </button>
                  //   </div>

                  //   {/* Card Main */}
                  //   <div className="flex">
                  //     <img
                  //       src={profile.picture || avatarUrl}
                  //       alt="avatar"
                  //       className="w-10 h-10 rounded-md"
                  //     />
                  //     <div className="w-full">
                  //       <div className="flex justify-between">
                  //         <DisplayName
                  //           name={profile.name}
                  //           displayName={profile.display_name}
                  //         />
                  //         <DisplayRelay relay={profile.relay} />
                  //       </div>
                  //       <DisplayNip05 nip05={profile.nip05} />
                  //     </div>
                  //   </div>
                  // </li>
                  <ProfileCard
                    pubkey={pubkey}
                    key={profile.relay}
                    name={profile.name}
                    displayName={profile.display_name}
                    profilePic={profile.picture}
                    nip05={profile.nip05}
                  />
                ))}
              </ul>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
}

function DisplayName({
  name,
  displayName,
  pubkey,
  nip05,
}: {
  name?: string;
  displayName?: string;
  pubkey: string;
  nip05?: string;
}) {
  if (displayName)
    return (
      <>
        <span className="">
          {displayName}
          <span className="text-xs text-gray-500">({name})</span>
        </span>
        <div className="overflow-hidden text-ellipsis text-xs">
          <span className="mr-1">
            <KeyIcon className="h-4 w-4" />
          </span>{" "}
          {pubkey}
        </div>
      </>
    );
  return (
    <>
      <span className="">{name}</span>
    </>
  );
}

function DisplayNip05({ nip05 }: { nip05?: string }) {
  if (nip05) return <p className="text-xs font-bold">{nip05}</p>;
  return <></>;
}

function DisplayRelay({
  relay,
  className,
}: {
  relay: string;
  className?: string;
}) {
  return (
    <span
      className={
        "rounded-xl bg-secondary px-2 py-1 text-xs font-black text-heading1-dark" +
        className
      }
    >
      {relay.slice(6, -1)}
    </span>
  );
}

function DisplayImg({ img }: { img?: string }) {
  const seed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${seed}`;

  return <img src={img || avatarUrl} alt="Avatar" className="rounded-md" />;
}

function ProfileCard({
  profilePic,
  name,
  displayName,
  nip05,
  pubkey,
}: {
  profilePic?: string;
  name?: string;
  displayName?: string;
  nip05?: string;
  pubkey: string;
}) {
  return (
    <div className="grid grid-cols-6 grid-rows-3 gap-2 rounded-md border p-1 hover:border-primary">
      <div className="col-span-2 row-span-3">
        <DisplayImg img={profilePic} />
      </div>

      {/* Profile data - name, display_name, nip05, pubkey, ... */}
      <div className="col-span-3 col-start-3 row-span-2 border">
        <DisplayName
          pubkey={pubkey}
          name={name}
          nip05={nip05}
          displayName={displayName}
        />
      </div>

      <div className="col-span-4 col-start-3 row-start-3 border">Relay</div>

      <div className="col-start-6 row-span-2 row-start-1 border">Actions</div>
    </div>
  );
}
