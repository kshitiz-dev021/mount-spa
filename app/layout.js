import "./globals.css";
import { Inter, Cormorant_Garamond, Jost } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Mount Heaven Spa — Relax, Restore, Revive",
  description:
    "Book a luxury spa treatment at Mount Heaven Spa. Swedish massage, deep tissue, aromatherapy and more. Located in Nepal.",
  keywords: "spa, massage, Nepal, relaxation, wellness, booking",
  openGraph: {
    title: "Mount Heaven Spa",
    description: "Luxury spa treatments in Nepal. Book your session today.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {children}
      </body>
    </html>
  );
}