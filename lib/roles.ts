import { Roles } from "@/types/global";
import { auth } from "@clerk/nextjs";

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};
