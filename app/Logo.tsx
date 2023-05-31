import Link from "next/link";
import { FC } from "react";

const Logo: FC = () => (
  <Link className="text-xl font-bold md:text-2xl" href="/">
    <div className="flex flex-row">
      {/* <FaBlog size="25" /> */}
      <span className="">
        hackr<span className="text-orange-600">news</span>
      </span>
    </div>
  </Link>
);

export default Logo;
