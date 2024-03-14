import Editor from "@/components/editor";
import { twJoin } from "tailwind-merge";

export default function Page() {
	return (
		<div
			className={twJoin("float-border rounded-md overflow-hidden", "flex")}
			style={{ height: "80vh" }}
		>
      <Editor className="w-full" />
      <div className="w-full">preview</div>
		</div>
	);
}
