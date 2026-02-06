"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";
import { IBlog } from "@/interfaces/IBlog";
import { deleteBlog, getAdminBlogs, setBlogStatus } from "@/services/blogs.service";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sendGTMEvent({
      event: "page view",
      page: "admin",
      path: window.location.pathname,
    });
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const blogList = await getAdminBlogs();
      setBlogs(blogList);
    } catch (fetchError) {
      console.error("Failed to fetch blogs:", fetchError);
      setError("Failed to fetch blogs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId?: string) => {
    if (!blogId) {
      return;
    }

    const confirmed = window.confirm("Delete this blog permanently?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteBlog(blogId);
      await fetchBlogs();
    } catch (deleteError) {
      console.error("Failed to delete blog:", deleteError);
      setError("Failed to delete blog.");
    }
  };

  const handleStatusToggle = async (blog: IBlog) => {
    if (!blog.id) {
      return;
    }

    const nextStatus = blog.status === "published" ? "draft" : "published";

    try {
      await setBlogStatus(blog.id, nextStatus);
      await fetchBlogs();
    } catch (statusError) {
      console.error("Failed to update blog status:", statusError);
      setError("Failed to update blog status.");
    }
  };

  const formatDate = (blog: IBlog) => {
    const timestamp = blog.publishedAt ?? blog.updatedAt ?? blog.createdAt;
    return timestamp?.toDate?.().toLocaleString() ?? "-";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Blogs Management
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Create, edit, publish, and unpublish blogs.
            </p>
          </div>
          <Link
            href="/admin/dashboard/blogs/new"
            className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add Blog
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl bg-white shadow-sm dark:bg-gray-800">
          <table className="w-full min-w-[800px]">
            <thead className="border-b bg-gray-100 dark:border-gray-700 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-200">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-200">
                  Slug
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-200">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-200">
                  Updated
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-gray-600 dark:text-gray-200"
                  >
                    Loading blogs...
                  </td>
                </tr>
              )}

              {!isLoading && blogs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-gray-600 dark:text-gray-200"
                  >
                    <div className="space-y-3">
                      <p>No blogs found.</p>
                      <Link
                        href="/admin/dashboard/blogs/new"
                        className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                      >
                        Add Blog
                      </Link>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading &&
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-white">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      /blogs/{blog.slug}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(blog)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/admin/dashboard/blogs/${blog.id}/edit`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(blog)}
                          className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                          {blog.status === "published" ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(blog.id)}
                          className="text-sm font-semibold text-red-600 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <Link
            href="/admin/dashboard/blogs/new"
            className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
