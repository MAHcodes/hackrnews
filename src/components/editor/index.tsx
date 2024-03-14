"use client";

import { useTheme } from "next-themes";
import * as monaco from "monaco-editor";
import { ElementRef, useEffect, useRef } from "react";
import sample from "./sample";

// @ts-expect-error
import { initVimMode } from "monaco-vim";

export default function Editor(opts) {
	const monacoRef = useRef<ElementRef<"div">>(null);
	const { resolvedTheme = "light" } = useTheme();

	const editorTheme = {
		light: "light",
		dark: "vs-dark",
	}[resolvedTheme];

	useEffect(() => {
		const editor = monaco.editor.create(monacoRef?.current!, {
			value: sample,
			language: "markdown",
			theme: editorTheme,
			minimap: {
				enabled: false,
			},
		});

		initVimMode(editor);

		return () => {
			editor.dispose();
		};
	}, [editorTheme]);

	return <div ref={monacoRef} {...opts} />;
}
