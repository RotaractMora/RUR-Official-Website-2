import { IEditorJsOutputData } from "@/interfaces/IEditorJs";

type EditorJsConstructor = new (config: Record<string, unknown>) => Record<string, unknown>;

type ImageUploader = {
  uploadByFile: (file: File) => Promise<{ success: number; file: { url: string } }>;
  uploadByUrl: (url: string) => Promise<{ success: number; file: { url: string } }>;
};

export const loadBundledEditorJs = async (options?: {
  imageUploader?: ImageUploader;
}): Promise<{
  EditorJS: EditorJsConstructor;
  tools: Record<string, unknown>;
}> => {
  const [
    { default: EditorJS },
    { default: Header },
    { default: List },
    { default: Quote },
    { default: Delimiter },
    { default: ImageTool },
    { default: Table },
  ] = await Promise.all([
    import("@editorjs/editorjs"),
    import("@editorjs/header"),
    import("@editorjs/list"),
    import("@editorjs/quote"),
    import("@editorjs/delimiter"),
    import("@editorjs/image"),
    import("@editorjs/table"),
  ]);

  const tools: Record<string, unknown> = {
    header: {
      class: Header,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
    },
    delimiter: Delimiter,
    table: {
      class: Table,
      inlineToolbar: true,
    },
    image: options?.imageUploader
      ? {
          class: ImageTool,
          config: {
            uploader: options.imageUploader,
          },
        }
      : {
          class: ImageTool,
        },
  };

  return {
    EditorJS: EditorJS as unknown as EditorJsConstructor,
    tools,
  };
};

export type EditorJsChangeApi = {
  saver: {
    save: () => Promise<IEditorJsOutputData>;
  };
};
