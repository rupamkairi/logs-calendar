import type { Metadata } from "next";
import {
  /* Inter, Merriweather, Poppins, */ Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const space_grotesk = Space_Grotesk({
  weight: ["400", "700"],
  subsets: ["latin"],
});
// const merriweather = Merriweather({
//   weight: ["400", "700"],
//   subsets: ["latin"],
// });
// const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });
// const inter = Inter({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Log Calendar",
  description: "Log over your Calendar, Right way.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={space_grotesk.className}>{children}</body>
    </html>
  );
}
