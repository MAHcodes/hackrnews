"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";
import { editor } from "monaco-editor";

type TEditor = editor.IStandaloneCodeEditor | null;

interface IEditorContext {
	editor: TEditor;
	setEditor: Dispatch<SetStateAction<TEditor>>;
}

const EditorContext = createContext<IEditorContext | null>(null);

const EditorProvider = ({ children }: { children: ReactNode }) => {
	const [editor, setEditor] = useState<TEditor>(null);

	return (
		<EditorContext.Provider value={{ editor, setEditor }}>
			{children}
		</EditorContext.Provider>
	);
};

export const useEditor = () => {
	const context = useContext(EditorContext);

	if (!context) {
		throw new Error("useEditor should be used inside of EditorProvider");
	}

	return context;
};

export default EditorProvider;
