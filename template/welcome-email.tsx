import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Head } from "@react-email/head";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Img } from "@react-email/img";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Text } from "@react-email/text";

interface WelcomeEmailProps {
  name: string;
  studentCode: string;
}

const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : "";

export const WelcomeEmail = ({ name, studentCode }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Your account application has been approved, please check further detail
      below!
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src={`${baseUrl}/static/logo_icon_light.png`}
            width="49"
            height="21"
            alt="CEMC Co. Ltd"
          />
          <Hr style={hr} />
          <Text style={paragraph}>Hi {name},</Text>
          <Text style={paragraph}>
            Thanks for submitting your account information. You&apos;re now
            ready to customize your student details, and more!
          </Text>
          <Text style={paragraph}>
            You can view a variety of other information about your account right
            from your dashboard, use the student code below to get access into
            your account.
          </Text>
          <Section style={codeBox}>
            <Text style={confirmationCodeText}>{studentCode}</Text>
          </Section>
          <Text style={paragraph}>
            <strong>🏫 Canadian Student Management Center</strong>
          </Text>
          <Hr style={hr} />
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};
