"use client";

import { useEdgeStore } from "@/hooks/edgestore";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";
import { useState } from "react";

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

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      // const saveBlocksAsMarkdown = async () => {
      //   const markdown: string = await editor.blocksToMarkdownLossy(
      //     editor.topLevelBlocks
      //   );
      //   setMarkdown(markdown);
      // };

      // saveBlocksAsMarkdown();

      onChange?.(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default Editor;
