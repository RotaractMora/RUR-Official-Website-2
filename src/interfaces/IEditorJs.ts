export interface IEditorJsBlock {
  id?: string;
  type: string;
  data: Record<string, unknown>;
  tunes?: Record<string, unknown>;
}

export interface IEditorJsOutputData {
  time?: number;
  blocks: IEditorJsBlock[];
  version?: string;
}
