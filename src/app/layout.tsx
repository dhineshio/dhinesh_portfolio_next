import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dhines.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dhinesh — Full Stack & Mobile Developer",
    template: "%s | Dhinesh",
  },
  description:
    "Full-stack freelancer specializing in web apps, mobile apps (Flutter), and cloud deployment on AWS. Available for hire worldwide.",
  keywords: [
    "Full Stack Developer",
    "Mobile App Developer",
    "Flutter Developer",
    "Next.js Developer",
    "React Developer",
    "Python Django",
    "AWS",
    "Freelancer",
    "Tamil Nadu",
    "India",
  ],
  authors: [{ name: "Dhinesh", url: BASE_URL }],
  creator: "Dhinesh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Dhinesh Portfolio",
    title: "Dhinesh — Full Stack & Mobile Developer",
    description:
      "Full-stack freelancer specializing in web, mobile & cloud solutions. Available for hire worldwide.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Dhinesh — Full Stack & Mobile Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhinesh — Full Stack & Mobile Developer",
    description:
      "Full-stack freelancer specializing in web, mobile & cloud solutions.",
    images: ["/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: BASE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dhinesh",
  url: BASE_URL,
  email: "dhinesh.tech2001@gmail.com",
  jobTitle: "Full Stack & Mobile Developer",
  description:
    "Full-stack freelancer specializing in web apps, mobile apps (Flutter), and cloud deployment on AWS.",
  sameAs: ["https://github.com/dhineshio"],
  knowsAbout: [
    "Next.js", "React", "TypeScript", "Tailwind CSS",
    "Flutter", "Dart", "Python", "Django", "AWS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtmId  = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4Id  = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={cn("h-full antialiased", inter.variable, "font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      {ga4Id  && <GoogleAnalytics  gaId={ga4Id}  />}
    </html>
  );
}
