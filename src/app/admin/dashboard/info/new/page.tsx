"use client";

import { useRouter } from "next/navigation";
import BlogFullPageEditor from "@/components/blog/blog-full-page-editor";
import { IEditorJsOutputData } from "@/interfaces/IEditorJs";
import { createBlog } from "@/services/blogs.service";

const EMPTY_EDITOR_DATA: IEditorJsOutputData = {
  blocks: [],
};

export default function CreateBlogPage() {
  const router = useRouter();

  const handleCreate = async ({
    title,
    content,
    status,
  }: {
    title: string;
    content: IEditorJsOutputData;
    status: "draft" | "published";
  }) => {
    await createBlog({ title, content, status });
    router.push("/admin/dashboard/info");
  };

  return (
    <BlogFullPageEditor
      backHref="/admin/dashboard/info"
      storyLabel="New story"
      initialTitle=""
      initialContent={EMPTY_EDITOR_DATA}
      initialStatus="draft"
      onSubmit={handleCreate}
    />
  );
}
