import { WrenchIcon } from "@heroicons/react/24/solid";

export default function AccountSettings() {
  return (
    <div className="mx-auto max-w-lg">
      <div className="title flex items-center justify-center gap-4">
        <span>
          <WrenchIcon className="h-8 w-8"></WrenchIcon>
        </span>
        Profile
      </div>
    </div>
  );
}
