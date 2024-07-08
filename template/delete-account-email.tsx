import * as React from "react";
import { Html } from "@react-email/html";
import { Head } from "@react-email/head";
import { Link } from "@react-email/link";
import { Preview } from "@react-email/preview";
import { Button } from "@react-email/button";
import { Body } from "@react-email/body";
import { Text } from "@react-email/text";
import { Img } from "@react-email/img";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

interface DeleteAccountEmailProps {
  name: string;
  resetLink: string;
}

export const DeleteAccountEmail = ({
  name,
  resetLink,
}: DeleteAccountEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Delete your account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={``} width="40" height="33" alt="Logo" />
          <Section>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Someone recently requested to delete account for your 🏫 Canadian
              Student Management Center account. If this was you, you can click
              here to navigate to delete account page:
            </Text>
            <Button style={button} href={resetLink}>
              Delete account
            </Button>
            <Text style={text}>
              If you don&apos;t want to delete your account or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. See our Help Center for{" "}
              <Link style={anchor} href="kltn-demo-deploy-admin.vercel.app">
                more security tips.
              </Link>
            </Text>
            <Text style={text}>Happy Learning!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

DeleteAccountEmail.PreviewProps = {
  name: "Canadian Student Management Center",
  resetLink: "kltn-demo-deploy-admin.vercel.app",
} as DeleteAccountEmailProps;

export default DeleteAccountEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#7D1F1F",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
