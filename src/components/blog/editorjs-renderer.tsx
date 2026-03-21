"use client";

import { useEffect, useId, useRef } from "react";
import { IEditorJsOutputData } from "@/interfaces/IEditorJs";
import { loadBundledEditorJs } from "@/lib/editorjs-tools";

type RendererInstance = {
  destroy: () => void;
};

interface EditorJsRendererProps {
  data: IEditorJsOutputData;
}

export default function EditorJsRenderer({ data }: EditorJsRendererProps) {
  const editorRef = useRef<RendererInstance | null>(null);
  const holderId = useId().replace(/:/g, "");

  useEffect(() => {
    let isMounted = true;

    const initializeRenderer = async () => {
      const { EditorJS, tools } = await loadBundledEditorJs();

      if (!isMounted || editorRef.current) {
        return;
      }

      const editor = new EditorJS({
        holder: holderId,
        data,
        tools,
        readOnly: true,
        minHeight: 0,
      });

      editorRef.current = editor as unknown as RendererInstance;
    };

    initializeRenderer().catch((error) => {
      console.error("Failed to initialize Editor.js renderer:", error);
    });

    return () => {
      isMounted = false;
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [data, holderId]);

  return (
    <div
      id={holderId}
      className="editorjs-shell rounded-lg  p-6 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
    />
  );
}
