import { VerificationEmail } from "@/template/verification-email";
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

  const confirmLink = `https://study-abroad-canada.vercel.app/auth/new-verification?token=${token}`;

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
