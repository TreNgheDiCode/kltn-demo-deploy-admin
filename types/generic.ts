export type SingleFileDropzone = {
  file: File | string | undefined;
  key?: string;
  progress?: "PENDING" | "COMPLETE" | number;
};
