import { School } from "@prisma/client";

export type SchoolLib = {
  id: string;
  name: string;
  logo: string;
};

export type SchoolExtend = School & {
  locations: { name: string; address: string }[];
  programs: { name: string }[];
  galleries: { name: string }[];
  students: { account: { name: string } }[];
};
