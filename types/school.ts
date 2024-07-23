import {
  News,
  School,
  SchoolGallery,
  SchoolGalleryImage,
  SchoolLocation,
  SchoolLocationContact,
  SchoolLocationImage,
  SchoolProgram,
  SchoolScholarship,
  SchoolScholarshipImage,
  Student,
} from "@prisma/client";
import { AccelerateInfo } from "@prisma/extension-accelerate";

export type SchoolLib = {
  data: (School & {
    news: News[];
    galleries: (SchoolGallery & {
      images: SchoolGalleryImage[];
    })[];
    locations: (SchoolLocation & {
      contacts: SchoolLocationContact[];
      images: SchoolLocationImage[];
    })[];
    programs: (SchoolProgram & {
      studentPrograms: {
        student: {
          id: string;
          studentCode?: string;
          account: {
            name: string;
          };
          cover: string;
          degreeType: string;
          certificateType: string;
          gradeType: string;
          gradeScore: number;
          status: string;
        };
      }[];
    })[];
    scholarships: (SchoolScholarship & {
      images: SchoolScholarshipImage[];
      owners: {
        student: Student;
      }[];
    })[];
  })[];
  info: AccelerateInfo | null;
};
