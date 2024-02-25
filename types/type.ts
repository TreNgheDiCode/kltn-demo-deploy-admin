import { History, School } from "@prisma/client";

export type SchoolLib = {
  id: string;
  name: string;
  logoUrl: string;
};

export type SchoolExtend = School & {
  locations: { name: string; address: string }[];
  programs: { name: string }[];
  galleries: { name: string }[];
  users: { name: string }[];
  history: History | null;
};
