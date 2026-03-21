import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "./firebaseConfig";
import { slugify } from "@/lib/slugify";
import { BlogStatus, IBlog, ICreateBlogInput, IUpdateBlogInput } from "@/interfaces/IBlog";
import { IEditorJsOutputData } from "@/interfaces/IEditorJs";

const BLOGS_COLLECTION = "info-blogs";

const getBlogsCollectionRef = () => {
  const db = getFirestore(app);
  return collection(db, BLOGS_COLLECTION);
};

const serializeEditorContentForFirestore = (
  content: IEditorJsOutputData
): IEditorJsOutputData => {
  const blocks = (content.blocks ?? []).map((block) => {
    if (block.type !== "table") {
      return block;
    }

    const tableData = block.data as {
      withHeadings?: boolean;
      stretched?: boolean;
      content?: unknown;
    };

    const contentRows = Array.isArray(tableData?.content) ? tableData.content : [];

    const rows = contentRows.map((row) => {
      const cells = Array.isArray(row)
        ? row.map((cell) => (typeof cell === "string" ? cell : String(cell ?? "")))
        : [];

      return { cells };
    });

    return {
      ...block,
      data: {
        withHeadings: Boolean(tableData?.withHeadings),
        stretched: Boolean(tableData?.stretched),
        rows,
      },
    };
  });

  return {
    ...content,
    blocks,
  };
};

const deserializeEditorContentFromFirestore = (
  content: IEditorJsOutputData
): IEditorJsOutputData => {
  const blocks = (content.blocks ?? []).map((block) => {
    if (block.type !== "table") {
      return block;
    }

    const tableData = block.data as {
      withHeadings?: boolean;
      stretched?: boolean;
      rows?: unknown;
      content?: unknown;
    };

    const restoredContent = Array.isArray(tableData?.rows)
      ? tableData.rows.map((row) => {
          const cells =
            row &&
            typeof row === "object" &&
            "cells" in row &&
            Array.isArray((row as { cells?: unknown }).cells)
              ? (row as { cells: unknown[] }).cells
              : [];

          return cells.map((cell) => (typeof cell === "string" ? cell : String(cell ?? "")));
        })
      : Array.isArray(tableData?.content)
      ? tableData.content
      : [];

    return {
      ...block,
      data: {
        withHeadings: Boolean(tableData?.withHeadings),
        stretched: Boolean(tableData?.stretched),
        content: restoredContent,
      },
    };
  });

  return {
    ...content,
    blocks,
  };
};

const mapDocToBlog = (id: string, data: Record<string, unknown>): IBlog => {
  const rawContent = (data.content as IEditorJsOutputData) ?? { blocks: [] };

  return {
    id,
    title: (data.title as string) ?? "",
    slug: (data.slug as string) ?? "",
    content: deserializeEditorContentFromFirestore(rawContent),
    status: (data.status as BlogStatus) ?? "draft",
    createdAt: (data.createdAt as Timestamp) ?? Timestamp.now(),
    updatedAt: (data.updatedAt as Timestamp) ?? Timestamp.now(),
    publishedAt: (data.publishedAt as Timestamp | null | undefined) ?? null,
  };
};

const sortByTimestampDesc = (a?: Timestamp | null, b?: Timestamp | null): number => {
  const aMs = a?.toMillis?.() ?? 0;
  const bMs = b?.toMillis?.() ?? 0;
  return bMs - aMs;
};

export const generateUniqueSlug = async (title: string, excludeId?: string): Promise<string> => {
  const blogsCollectionRef = getBlogsCollectionRef();
  const baseSlug = slugify(title);
  let currentSlug = baseSlug;
  let suffix = 2;

  while (true) {
    const existingSlugSnapshot = await getDocs(
      query(blogsCollectionRef, where("slug", "==", currentSlug), limit(1))
    );

    if (existingSlugSnapshot.empty) {
      return currentSlug;
    }

    const matchedDoc = existingSlugSnapshot.docs[0];
    if (excludeId && matchedDoc.id === excludeId) {
      return currentSlug;
    }

    currentSlug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
};

export const getAdminBlogs = async (): Promise<IBlog[]> => {
  const blogsCollectionRef = getBlogsCollectionRef();
  const snapshot = await getDocs(blogsCollectionRef);

  const blogs = snapshot.docs.map((docSnapshot) =>
    mapDocToBlog(docSnapshot.id, docSnapshot.data())
  );

  return blogs.sort((a, b) => sortByTimestampDesc(a.updatedAt, b.updatedAt));
};

export const getPublicBlogs = async (): Promise<IBlog[]> => {
  const blogsCollectionRef = getBlogsCollectionRef();
  const snapshot = await getDocs(query(blogsCollectionRef, where("status", "==", "published")));

  const blogs = snapshot.docs.map((docSnapshot) =>
    mapDocToBlog(docSnapshot.id, docSnapshot.data())
  );

  return blogs.sort((a, b) => {
    const primary = sortByTimestampDesc(a.publishedAt, b.publishedAt);
    if (primary !== 0) {
      return primary;
    }
    return sortByTimestampDesc(a.updatedAt, b.updatedAt);
  });
};

export const getBlogById = async (id: string): Promise<IBlog | null> => {
  const blogDocRef = doc(getBlogsCollectionRef(), id);
  const snapshot = await getDoc(blogDocRef);

  if (!snapshot.exists()) {
    return null;
  }

  return mapDocToBlog(snapshot.id, snapshot.data());
};

export const getPublicBlogBySlug = async (slug: string): Promise<IBlog | null> => {
  const blogsCollectionRef = getBlogsCollectionRef();
  const snapshot = await getDocs(query(blogsCollectionRef, where("slug", "==", slug), limit(1)));

  if (snapshot.empty) {
    return null;
  }

  const docSnapshot = snapshot.docs[0];
  const blog = mapDocToBlog(docSnapshot.id, docSnapshot.data());

  if (blog.status !== "published") {
    return null;
  }

  return blog;
};

export const createBlog = async (input: ICreateBlogInput): Promise<string> => {
  const blogsCollectionRef = getBlogsCollectionRef();
  const now = Timestamp.now();
  const status: BlogStatus = input.status ?? "draft";
  const slug = await generateUniqueSlug(input.title);
  const serializedContent = serializeEditorContentForFirestore(input.content);

  const newBlog = {
    title: input.title.trim(),
    slug,
    content: serializedContent,
    status,
    createdAt: now,
    updatedAt: now,
    publishedAt: status === "published" ? now : null,
  };

  const docRef = await addDoc(blogsCollectionRef, newBlog);
  return docRef.id;
};

export const updateBlog = async (id: string, input: IUpdateBlogInput): Promise<void> => {
  const blogDocRef = doc(getBlogsCollectionRef(), id);
  const snapshot = await getDoc(blogDocRef);

  if (!snapshot.exists()) {
    throw new Error("Blog not found.");
  }

  const existingBlog = mapDocToBlog(snapshot.id, snapshot.data());
  const now = Timestamp.now();
  const shouldGenerateSlug = !existingBlog.slug;
  const slug = shouldGenerateSlug
    ? await generateUniqueSlug(input.title, id)
    : existingBlog.slug;

  const nextPublishedAt =
    input.status === "published" ? existingBlog.publishedAt ?? now : null;
  const serializedContent = serializeEditorContentForFirestore(input.content);

  await updateDoc(blogDocRef, {
    title: input.title.trim(),
    content: serializedContent,
    status: input.status,
    slug,
    updatedAt: now,
    publishedAt: nextPublishedAt,
  });
};

export const setBlogStatus = async (id: string, status: BlogStatus): Promise<void> => {
  const blogDocRef = doc(getBlogsCollectionRef(), id);
  const snapshot = await getDoc(blogDocRef);

  if (!snapshot.exists()) {
    throw new Error("Blog not found.");
  }

  const existingBlog = mapDocToBlog(snapshot.id, snapshot.data());
  const now = Timestamp.now();

  await updateDoc(blogDocRef, {
    status,
    updatedAt: now,
    publishedAt: status === "published" ? existingBlog.publishedAt ?? now : null,
  });
};

export const deleteBlog = async (id: string): Promise<void> => {
  const blogDocRef = doc(getBlogsCollectionRef(), id);
  await deleteDoc(blogDocRef);
};
