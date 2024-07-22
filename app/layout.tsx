import type { Metadata } from "next";
import { Inter, Lusitana } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { EdgeStoreProvider } from "@/lib/edgestore";

const lusitana = Lusitana({ weight: ["400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
