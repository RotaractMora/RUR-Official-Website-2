"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditorJsRenderer from "@/components/blog/editorjs-renderer";
import { IBlog } from "@/interfaces/IBlog";
import { getPublicBlogBySlug } from "@/services/blogs.service";
import PublicNav from "@/components/blocks/public-nav";

export default function BlogDetailsPage() {
  const params = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      if (!params?.slug) {
        setError("Invalid blog slug.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await getPublicBlogBySlug(params.slug);
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
  }, [params?.slug]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-12 pt-28 dark:bg-gray-900">
      <PublicNav />
      <div className="mx-auto max-w-4xl space-y-4">
        <Link href="/blogs" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          Back to blogs
        </Link>

        {isLoading && (
          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
            <p className="text-gray-700 dark:text-gray-200">Loading blog...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        {!isLoading && !error && blog && (
          <article className="space-y-5">
            <header className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{blog.title}</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Published on{" "}
                {blog.publishedAt?.toDate?.().toLocaleDateString() ?? "Not published"}
              </p>
            </header>

            <EditorJsRenderer data={blog.content} />
          </article>
        )}
      </div>
    </main>
  );
}
