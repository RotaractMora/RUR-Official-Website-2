"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import EditorJsEditor from "@/components/blog/editorjs-editor";
import { BlogStatus } from "@/interfaces/IBlog";
import { IEditorJsOutputData } from "@/interfaces/IEditorJs";

interface BlogFullPageEditorProps {
  backHref: string;
  storyLabel: string;
  initialTitle: string;
  initialContent: IEditorJsOutputData;
  initialStatus: BlogStatus;
  onSubmit: (payload: {
    title: string;
    content: IEditorJsOutputData;
    status: BlogStatus;
  }) => Promise<void>;
}

const isContentEmpty = (content: IEditorJsOutputData): boolean => {
  return !content.blocks || content.blocks.length === 0;
};

export default function BlogFullPageEditor({
  backHref,
  storyLabel,
  initialTitle,
  initialContent,
  initialStatus,
  onSubmit,
}: BlogFullPageEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState<IEditorJsOutputData>(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<BlogStatus>(initialStatus);
  const [error, setError] = useState<string | null>(null);
  const editorInitialContent = useRef(initialContent);

  const handleSubmit = async (nextStatus: BlogStatus) => {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setError("Title is required.");
      return;
    }

    if (isContentEmpty(content)) {
      setError("Blog content is required.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await onSubmit({ title: normalizedTitle, content, status: nextStatus });
      setStatus(nextStatus);
    } catch (submitError) {
      console.error("Failed to save blog:", submitError);
      setError("Failed to save blog. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfb] dark:bg-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href={backHref}
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              Back
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-300">{storyLabel}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 dark:text-gray-300 sm:block">
              Status: <span className="font-semibold capitalize">{status}</span>
            </span>
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              disabled={isSaving}
              className="rounded-full border border-gray-400 px-4 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 dark:border-gray-500 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              {isSaving ? "Saving..." : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("published")}
              disabled={isSaving}
              className="rounded-full bg-brand-blue px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 pb-20 pt-8 sm:px-6">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          className="mb-6 w-full border-none bg-transparent text-4xl font-bold tracking-tight text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500 sm:text-6xl"
        />

        <EditorJsEditor
          initialData={editorInitialContent.current}
          onChange={setContent}
          placeholder="Tell your story..."
          className="min-h-[60vh] border-0 bg-transparent p-0"
        />

        {error && (
          <p className="mt-6 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}
