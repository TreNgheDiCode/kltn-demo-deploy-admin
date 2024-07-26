"use client";

import { UploadCloudIcon, X } from "lucide-react";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export type BackgroundFile = {
  file: File | string | undefined;
  progress?: "PENDING" | "COMPLETE" | number;
};

export const BackgroundDropzone = () => {};
