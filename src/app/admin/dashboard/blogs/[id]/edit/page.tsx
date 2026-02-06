"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BlogFullPageEditor from "@/components/blog/blog-full-page-editor";
import { IEditorJsOutputData } from "@/interfaces/IEditorJs";
import { IBlog } from "@/interfaces/IBlog";
import { getBlogById, updateBlog } from "@/services/blogs.service";

const EMPTY_EDITOR_DATA: IEditorJsOutputData = {
  blocks: [],
};

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      if (!params?.id) {
        setError("Invalid blog id.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await getBlogById(params.id);
        setBlog(result);
        if (!result) {
          setError("Blog not found.");
        }
      } catch (fetchError) {
        console.error("Failed to fetch blog:", fetchError);
        setError("Failed to load blog.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, [params?.id]);

  const handleUpdate = async ({
    title,
    content,
    status,
  }: {
    title: string;
    content: IEditorJsOutputData;
    status: "draft" | "published";
  }) => {
    if (!params?.id) {
      throw new Error("Invalid blog id.");
    }

    await updateBlog(params.id, { title, content, status });
    router.push("/admin/dashboard/blogs");
  };

  return (
    <>
      {isLoading && (
        <div className="min-h-screen bg-[#fdfdfb] px-4 py-8 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl">
            <p className="text-gray-700 dark:text-gray-200">Loading blog...</p>
          </div>
        </div>
      )}

      {!isLoading && error && (
        <div className="min-h-screen bg-[#fdfdfb] px-4 py-8 dark:bg-gray-900">
          <div className="mx-auto max-w-4xl">
            <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200">
              {error}
            </p>
          </div>
        </div>
      )}

      {!isLoading && !error && blog && (
        <BlogFullPageEditor
          backHref="/admin/dashboard/blogs"
          storyLabel="Edit story"
          initialTitle={blog.title}
          initialContent={blog.content ?? EMPTY_EDITOR_DATA}
          initialStatus={blog.status}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
}
