"use client";

import { useEffect, useId, useRef } from "react";
import { IEditorJsOutputData } from "@/interfaces/IEditorJs";
import { cn } from "@/lib/utils";
import { addFile } from "@/services/firebaseStorage.service";
import { getDownloadURL } from "firebase/storage";
import { EditorJsChangeApi, loadBundledEditorJs } from "@/lib/editorjs-tools";

type EditorInstance = {
  destroy: () => void;
  save: () => Promise<IEditorJsOutputData>;
};

interface EditorJsEditorProps {
  initialData: IEditorJsOutputData;
  onChange: (data: IEditorJsOutputData) => void;
  placeholder?: string;
  className?: string;
}

export default function EditorJsEditor({
  initialData,
  onChange,
  placeholder = "Write your blog content here...",
  className,
}: EditorJsEditorProps) {
  const editorRef = useRef<EditorInstance | null>(null);
  const onChangeRef = useRef(onChange);
  const holderId = useId().replace(/:/g, "");

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    let isMounted = true;

    const initializeEditor = async () => {
      const { EditorJS, tools } = await loadBundledEditorJs({
        imageUploader: {
          uploadByFile: async (file: File) => {
            const fileReference = await addFile(file);

            if (!fileReference) {
              throw new Error("Image upload failed.");
            }

            const url = await getDownloadURL(fileReference);
            return {
              success: 1,
              file: { url },
            };
          },
          uploadByUrl: async (url: string) => {
            if (!url.trim()) {
              throw new Error("Image URL is required.");
            }

            return {
              success: 1,
              file: { url },
            };
          },
        },
      });

      if (!isMounted || editorRef.current) {
        return;
      }

      const editor = new EditorJS({
        holder: holderId,
        placeholder,
        data: initialData,
        tools,
        async onChange(api: EditorJsChangeApi) {
          const savedData = await api.saver.save();
          onChangeRef.current(savedData);
        },
      });

      editorRef.current = editor as unknown as EditorInstance;
    };

    initializeEditor().catch((error) => {
      console.error("Failed to initialize Editor.js:", error);
    });

    return () => {
      isMounted = false;
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, [holderId, initialData, placeholder]);

  return (
    <div
      id={holderId}
      className={cn(
        "editorjs-shell min-h-[360px] rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
        className
      )}
    />
  );
}
