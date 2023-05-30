import { userStore } from "@/app/stores/user";
import { Popover, Transition } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export function Menu() {
  const userProfiles = userStore((state) => state.profiles);
  const seed = Math.random().toString(36).substring(2, 10);
  const avatarUrl = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${seed}`;

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
              <button className="ghost-round-button p-1 block ml-auto mb-1">
                <Cog8ToothIcon className="w-5 h-5 rounded-btn" />
              </button>

              <ul className="space-y-2">
                {userProfiles.map((profile) => (
                  <li
                    key={profile.relay}
                    className="gap-2 rounded-md p-2 ring-1 ring-black/10 dark:ring-white/10  flex relative hover:ring-primary hover:bg-orange-600/10"
                  >
                    <img
                      src={profile.picture || avatarUrl}
                      alt="avatar"
                      className="w-10 h-10 rounded-md"
                    />
                    <div className="w-full">
                      <div className="flex justify-between">
                      <DisplayName
                        name={profile.name}
                        displayName={profile.display_name}
                      />
                      <span className="text-xs rounded-xl text-heading1-dark bg-secondary p-1 font-black">
                        {profile.relay.slice(6, -1)}
                      </span>
                      </div>
                      <DisplayNip05 nip05={profile.nip05} />
                    </div>
                  </li>
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
}: {
  name: string;
  displayName: string | null;
}) {
  if (displayName)
    return (
      <>
        <span className="">
          {displayName}
          <span className="text-xs text-gray-500">({name})</span>
        </span>
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
