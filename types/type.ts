import {
  Account,
  DegreeType,
  GradeType,
  Profile,
  School,
  SchoolLocation,
  SchoolProgram,
  Student,
  StudentSchoolLocation,
  StudentSchoolProgram,
  StudentStatus,
} from "@prisma/client";

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

// const student: ({
//   account: {
//       id: string;
//       email: string;
//       emailVerified: Date | null;
//       password: string;
//       name: string;
//       dob: Date;
//       gender: $Enums.Gender;
//       phoneNumber: string;
//       idCardNumber: string;
//       ... 4 more ...;
//       updatedAt: Date;
//   };
//   school: {
//       ...;
//   };
//   profile: {
//       ...;
//   } | null;
//   program: ({
//       ...;
//   } & {
//       ...;
//   }) | null;
//   location: {
//       ...;
//   } | null;
// } & {
//   ...;
// }) | null

export type StudentLib =
  | (Student & {
      account: Account | null;
      school: School | null;
      profile: Profile | null;
      program:
        | (StudentSchoolProgram & {
            program: SchoolProgram;
          })
        | null;
      location:
        | (StudentSchoolLocation & {
            location: SchoolLocation;
          })
        | null;
    })
  | null;
