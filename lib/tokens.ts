import { DegreeType } from "@prisma/client";
import { db } from "./db";
import { v4 } from "uuid";
import crypto from "crypto";

export const generateVerificationToken = async (email: string) => {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const generateStudentCode = (degreeType: DegreeType) => {
  const currentYear: number = new Date().getFullYear();
  const year: number = currentYear % 100;
  const yearCode = year.toString();

  const degreeCode = degreeType === DegreeType.HIGHSCHOOL ? "PT" : "DH";

  const token = crypto.randomInt(100_000, 1_000_000).toString();

  return `${yearCode}${degreeCode}${token}`;
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const getDeleteAccountTokenByEmail = async (email: string) => {
  try {
    const deleteAccountToken = await db.deleteAccountToken.findFirst({
      where: { email },
    });

    return deleteAccountToken;
  } catch {
    return null;
  }
};

export const getDeleteAccountTokenByToken = async (token: string) => {
  try {
    const deleteAccountToken = await db.deleteAccountToken.findUnique({
      where: { token },
    });

    return deleteAccountToken;
  } catch {
    return null;
  }
};

export const generateDeleteAccountToken = async (email: string) => {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getDeleteAccountTokenByEmail(email);

  if (existingToken) {
    await db.deleteAccountToken.delete({
      where: { id: existingToken.id },
    });
  }

  const deleteAccountToken = await db.deleteAccountToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return deleteAccountToken;
};
