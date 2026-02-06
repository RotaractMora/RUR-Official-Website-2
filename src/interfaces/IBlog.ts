import { Timestamp } from "firebase/firestore";
import { IEditorJsOutputData } from "@/interfaces/IEditorJs";

export type BlogStatus = "draft" | "published";

export interface IBlog {
  id?: string;
  title: string;
  slug: string;
  content: IEditorJsOutputData;
  status: BlogStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp | null;
}

export interface ICreateBlogInput {
  title: string;
  content: IEditorJsOutputData;
  status?: BlogStatus;
}

export interface IUpdateBlogInput {
  title: string;
  content: IEditorJsOutputData;
  status: BlogStatus;
}
