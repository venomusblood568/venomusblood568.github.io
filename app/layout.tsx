import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "Gourav Anand Jha",
  description: "Gourav's Portfolio",
  icons: "/icons8-oggy-96.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
