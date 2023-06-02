import { userStore } from "@/app/stores/user";
import { Popover, Transition } from "@headlessui/react";
import {
  Cog8ToothIcon,
  PencilIcon,
  TrashIcon,
  KeyIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import ProfileModal from "@/app/components/ProfileModal";

export function Menu() {
  const userProfiles = userStore((state) => state.profiles);
  const seed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${seed}`;
  const pubkey = userStore((state) => state.pubkey);
  const [activeProfile, setActiveProfile] = useState(userProfiles[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleProfileClick = (profile: any) => {
    setActiveProfile(profile);
    setIsOpen(true);
  };

  return (
    <>
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

                <ul className="relative max-h-72 space-y-2 overflow-y-auto p-1">
                  {userProfiles.map((profile) => (
                    <ProfileCard
                      pubkey={pubkey}
                      key={profile.relay}
                      name={profile.name}
                      displayName={profile.display_name}
                      profilePic={profile.picture}
                      nip05={profile.nip05}
                      relay={profile.relay}
                      onClick={() => handleProfileClick(profile)}
                    />
                  ))}
                </ul>
                <button className="mt-2 flex w-full items-center justify-center rounded border border-dashed border-gray-400 p-2 text-sm font-bold uppercase text-gray-400 hover:border-primary hover:text-primary">
                  <PlusCircleIcon className="mr-2 h-6 w-6" />
                  Add new Relay
                </button>
              </Popover.Panel>
            </Transition>
          </div>
        )}
      </Popover>
      {isOpen && (
        <ProfileModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          profile={activeProfile}
        />
      )}
    </>
  );
}

function ProfileCard({
  profilePic,
  name,
  displayName,
  nip05,
  pubkey,
  relay,
  onClick,
}: {
  profilePic?: string;
  name?: string;
  displayName?: string;
  nip05?: string;
  pubkey: string;
  relay: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="h-26 group grid w-full grid-cols-5 grid-rows-2 gap-2 rounded-md p-1 shadow-sm ring-1
      ring-black/5 hover:bg-orange-600/10 hover:ring-primary"
    >
      {/* profile pic */}
      <div className="row-span-2">
        <DisplayImg img={profilePic} />
      </div>

      {/* Profile data - name, display_name, nip05, pubkey, ... */}
      <div className="col-span-3">
        <DisplayName pubkey={pubkey} name={name} displayName={displayName} />
        <DisplayNip05 nip05={nip05} />
      </div>

      {/* Relay */}
      <div className="col-span-3 col-start-2 row-start-2">
        <DisplayRelay relay={relay} />
      </div>

      {/* Actions */}
      <div className="col-start-5 row-span-2 row-start-1 transition duration-500 ease-in-out lg:opacity-0 lg:group-hover:opacity-100">
        <DisplayActions />
      </div>
    </button>
  );
}

function DisplayName({
  name,
  displayName,
  pubkey,
}: {
  name?: string;
  displayName?: string;
  pubkey: string;
}) {
  if (displayName) {
    return (
      <span>
        {displayName}
        <span className="text-xs text-gray-500">({name})</span>
      </span>
    );
  } else if (!displayName && name) {
    return <span className="">{name}</span>;
  }
  return (
    <div className="flex max-w-full items-center">
      <KeyIcon className="mr-1 h-4 w-4" />
      <span className="w-[80%] truncate">{pubkey}</span>
    </div>
  );
}

function DisplayNip05({ nip05 }: { nip05?: string }) {
  if (nip05) return <p className="text-xs font-bold">{nip05}</p>;
  return <></>;
}

function DisplayRelay({ relay }: { relay: string; className?: string }) {
  return (
    <span className="rounded-xl border border-secondary px-2 py-1 text-sm text-secondary">
      {relay.slice(6, -1)}
    </span>
  );
}

function DisplayImg({ img }: { img?: string }) {
  const seed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${seed}`;

  return (
    <div className="flex h-full items-center">
      <img src={img || avatarUrl} alt="Avatar" className="w-full rounded-md" />
    </div>
  );
}

function DisplayActions() {
  return (
    <div className="flex flex-col items-end gap-6">
      <button className="ghost-round-button">
        <PencilIcon className="h-4 w-4" />
      </button>
      <button className="fill-round-button">
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
