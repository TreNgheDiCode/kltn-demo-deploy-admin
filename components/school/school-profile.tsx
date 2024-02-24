"use client";

import { School } from "@prisma/client";

interface SchoolProfileProps {
  school: School;
}

export const SchoolProfile = ({ school }: SchoolProfileProps) => {
  return <div>School Profile</div>;
};
