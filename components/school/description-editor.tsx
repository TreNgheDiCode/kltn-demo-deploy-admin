"use client";

import { useEdgeStore } from "@/hooks/edgestore";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css";
import { useTheme } from "next-themes";
import * as Select from "../ui/select";
import * as Button from "../ui/button";
import * as Tabs from "../ui/tabs";
import * as Popover from "../ui/popover";
import * as Label from "../ui/label";
import * as Input from "../ui/input";
import { useEffect, useState } from "react";

interface EditorProps {
  editable: boolean;
  initialContent?: string;
  onChange?: (value: string) => void;
}
const Editor = ({ editable, initialContent, onChange }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor = useCreateBlockNote({
    uploadFile: handleUpload,
  });

  useEffect(() => {
    async function loadInitialBlocks() {
      if (initialContent) {
        const blocks = await editor.tryParseMarkdownToBlocks(initialContent);

        editor.replaceBlocks(editor.document, blocks);
      }
    }

    loadInitialBlocks();
  }, [editor, initialContent]);

  return (
    <BlockNoteView
      editable={editable}
      onChange={async () => {
        const markdown = await editor.blocksToMarkdownLossy(editor.document);

        onChange?.(markdown);
      }}
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      shadCNComponents={{
        Select,
        Button,
        Tabs,
        Popover,
        Label,
        Input,
      }}
    />
  );
};

export default Editor;
