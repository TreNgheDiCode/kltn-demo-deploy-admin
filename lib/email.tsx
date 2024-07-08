import DeleteAccountEmail from "@/template/delete-account-email";
import ResetPasswordEmail from "@/template/reset-password-email";
import { VerificationEmail } from "@/template/verification-email";
import WelcomeEmail from "@/template/welcome-email";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

export const sendVerificationEmail = async (
  name: string,
  senderEmail: string,
  email: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gabayan170@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const confirmLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-verification?token=${token}`;

  const emailHtml = render(
    <VerificationEmail
      name={name}
      senderEmail={senderEmail}
      confirmLink={confirmLink}
    />
  );

  const options = {
    from: "gabayan170@gmail.com",
    to: email,
    subject: "Confirm your email",
    html: emailHtml,
  };

  await transporter.sendMail(options);
};

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gabayan170@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/new-password?token=${token}`;

  const emailHtml = render(
    <ResetPasswordEmail name={name} resetLink={resetLink} />
  );

  const options = {
    from: "gabayan170@gmail.com",
    to: email,
    subject: "Reset your password",
    html: emailHtml,
  };

  await transporter.sendMail(options);
};

export const sendDeleteAccountEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gabayan170@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const deleteLink = `${process.env.NEXT_PUBLIC_URL}/auth/delete-account?token=${token}`;

  const emailHtml = render(
    <DeleteAccountEmail name={name} resetLink={deleteLink} />
  );

  const options = {
    from: "gabayan170@gmail.com",
    to: email,
    subject: "Delete your account",
    html: emailHtml,
  };

  await transporter.sendMail(options);
};

export const sendWelcomeEmail = async (
  name: string,
  studentCode: string,
  email: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gabayan170@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const emailHtml = render(
    <WelcomeEmail name={name} studentCode={studentCode} />
  );

  const options = {
    from: "gabayan170@gmail.com",
    to: email,
    subject: "Welcome to Canadian Student Management Center",
    html: emailHtml,
  };

  await transporter.sendMail(options);
};
