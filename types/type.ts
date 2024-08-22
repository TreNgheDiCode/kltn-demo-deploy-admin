import {
  Account,
  DegreeType,
  Feedback,
  GradeType,
  News,
  Profile,
  School,
  SchoolLocation,
  SchoolProgram,
  SchoolScholarship,
  SchoolScholarshipImage,
  Student,
  StudentSchoolLocation,
  StudentSchoolProgram,
  StudentSchoolScholarship,
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

export type SchoolScholarshipExtend = SchoolScholarship & {
  images: SchoolScholarshipImage[];
  owners: (StudentSchoolScholarship & { student: Student })[];
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

export type AccountLib = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  dob: Date;
  emailVerified: Date | null;
  phoneNumber: string;
  address: string;
  idCardNumber: string;
  isTwoFactorEnabled: boolean;
  student: {
    id: string;
    studentCode: string | null;
    status: StudentStatus;
  } | null;
  isLocked: boolean;
};

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

export type NewsLib = News & {
  school: {
    name: string;
  } | null;
};

export type FeedbackLib = Feedback & {
  school: {
    logo: string;
    color: string;
    name: string;
  } | null;
};
