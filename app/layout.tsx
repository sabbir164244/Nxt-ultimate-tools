// app/layout.tsx - FINAL GUARANTEED FIX

import type { Metadata } from "next";
import "./globals.css";

// ====== SEO METADATA YAHAN SE SHURU HOTA HAI ======
export const metadata: Metadata = {
  title: {
    default: "Nxt Ultimate Tools - 40+ Free Online Tools for Productivity",
    template: "%s | Nxt Ultimate Tools",
  },
  description: "Boost your productivity with 40+ free, secure, and offline-ready online tools. Compress images, generate PDFs, convert text to speech, create passwords, and much more.",
  keywords: ["online tools", "free tools", "productivity tools", "PDF generator", "image compressor", "text to speech", "password generator", "BMI calculator", "PDF merger", "developer tools", "online utilities"],
  authors: [{ name: "Nxt Ultimate Tools", url: "https://nxt-ultimate-tools.com" }],
  creator: "Nxt Ultimate Tools",
  publisher: "Nxt Ultimate Tools",
  robots: "index, follow",
  openGraph: {
    title: "Nxt Ultimate Tools - Your All-in-One Productivity Suite",
    description: "Access over 40 professional tools for free. PDF, images, text, security, and more. Secure, fast, and works in your browser.",
    url: "https://nxt-ultimate-tools.com",
    siteName: "Nxt Ultimate Tools",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nxt Ultimate Tools Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nxt Ultimate Tools - 40+ Free Online Tools",
    description: "The ultimate toolkit for all your productivity needs. From PDF editing to image compression, get it all for free.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "T5_t0W_VnciBLS73kWVvHJ-aO1ndEnFPbLhlnqgWIOg",
  },
  icons: {
    icon: "/nxtools-icon.png",
    shortcut: "/nxtools-icon.png",
    apple: "/nxtools-icon.png",
  },
  alternates: {
    canonical: "https://nxt-ultimate-tools.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="theme-color" content="#1e293b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Nxt Ultimate Tools",
              "description": "A comprehensive suite of 40+ free online productivity tools, including PDF generators, image compressors, and password creators. All tools work offline in your browser.",
              "url": "https://nxt-ultimate-tools.com",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Any (Web Browser)",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "250"
              },
              "creator": {
                "@type": "Organization",
                "name": "Nxt Ultimate Tools",
                "url": "https://nxt-ultimate-tools.com"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
                  }
