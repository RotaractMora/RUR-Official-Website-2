"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IEditorJsOutputData } from "@/interfaces/IEditorJs";
import { IBlog } from "@/interfaces/IBlog";
import { getPublicBlogs } from "@/services/blogs.service";
import PublicNav from "@/components/blocks/public-nav";

const stripHtml = (value: string): string => value.replace(/<[^>]+>/g, "").trim();

const createExcerpt = (content: IEditorJsOutputData): string => {
  const block = content.blocks?.find((item) =>
    ["paragraph", "header", "quote", "list"].includes(item.type)
  );

  if (!block?.data) {
    return "No preview available yet.";
  }

  const textValue = block.data.text;
  if (typeof textValue === "string") {
    const text = stripHtml(textValue);
    return text.length > 180 ? `${text.slice(0, 180)}...` : text;
  }

  const listValue = block.data.items;
  if (Array.isArray(listValue)) {
    const text = stripHtml(
      listValue
        .map((item) => (typeof item === "string" ? item : ""))
        .join(" ")
    );
    return text.length > 180 ? `${text.slice(0, 180)}...` : text;
  }

  return "No preview available yet.";
};

export default function InfoPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const publicBlogs = await getPublicBlogs();
        setBlogs(publicBlogs);
      } catch (fetchError) {
        console.error("Failed to fetch public blogs:", fetchError);
        setError("Failed to load informational pages.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-12 pt-28 dark:bg-gray-900">
      <PublicNav />
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Informational Pages
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Informational updates from the Are You Ready? team.
        </p>

        {isLoading && (
          <div className="mt-8 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-200">Loading informational pages...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="mt-8 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        {!isLoading && !error && blogs.length === 0 && (
          <div className="mt-8 rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-200">
              No published informational pages yet. Check back soon.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {!isLoading &&
            !error &&
            blogs.map((blog) => (
              <article key={blog.id} className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{blog.title}</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {blog.publishedAt?.toDate?.().toLocaleDateString() ?? "Unpublished"}
                </p>
                <p className="mt-3 text-gray-700 dark:text-gray-200">
                  {createExcerpt(blog.content)}
                </p>
                <Link
                  href={`/info/${blog.slug}`}
                  className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Read more
                </Link>
              </article>
            ))}
        </div>
      </div>
    </main>
  );
}
