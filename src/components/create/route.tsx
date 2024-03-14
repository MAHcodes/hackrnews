import { IRoute } from "@/utils/routes/types";
import { twJoin } from "tailwind-merge";
import Link from "next/link";

interface IRouteProps extends IRoute {}

export default function Route({ path, name, accent, Icon }: IRouteProps) {
	return (
		<Link
			href={path}
			className={twJoin(
				accent,
				"flex items-center flex-1 rounded-xl gap-3 md:gap-6 font-bold justify-center p-6",
				name === "Post"
					? "md:col-span-2 flex-col md:flex-row md:py-10"
					: "flex-col",
			)}
		>
			{Icon}
			<span className="text-lg">{name}</span>
		</Link>
	);
}
