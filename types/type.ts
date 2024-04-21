import { DegreeType, GradeType, School, StudentStatus } from "@prisma/client";

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

export type SchoolStudentExtend = {
  id: string;
  studentCode: string | null;
  program: {
    program: {
      name: string;
    };
  } | null;
  status: StudentStatus;
  gradeType: GradeType;
  gradeScore: number;
  account: {
    image: string | null;
    name: string;
    dob: Date;
  };
  degreeType: DegreeType;
};

export type SchoolLocationExtend = {
  id: string;
  name: string;
  address: string;
  cover: string | null;
  isMain: boolean;
};

export type SchoolProgramExtend = {
  id: string;
  name: string;
  description: string;
  cover: string | null;
  isPublished: boolean;
};

export type Ward = {
  Id: string;
  Name: string;
  Level: string;
};

export type District = {
  Id: string;
  Name: string;
  Wards: Ward[];
};

export type City = {
  Id: string;
  Name: string;
  Districts: District[];
};
