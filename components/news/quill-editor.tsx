"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const Quill = dynamic(() => import("react-quill"), { ssr: false });

interface QuillEditorProps {
  preview?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

export const QuillEditor = ({ preview, value, onChange }: QuillEditorProps) => {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  return (
    <Quill
      readOnly={preview}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={quillModules}
      formats={quillFormats}
      className="w-full mt-10 bg-white"
    />
  );
};
