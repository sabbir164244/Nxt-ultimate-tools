import type { Metadata } from "next";
// Sahi Imports: Pacifico Google se aur Geist apne package se
import { Pacifico } from "next/font/google";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
});

// Sahi tareeke se Geist fonts ko initialize kiya gaya hai
const geistSans = GeistSans({
  variable: "--font-geist-sans",
});

const geistMono = GeistMono({
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Nxt Ultimate Tools - 40+ Free Online Tools for Productivity",
    template: "%s | Nxt Ultimate Tools",
  },
  description: "Boost your productivity with 40+ free, secure, and offline-ready online tools. Compress images, generate PDFs, convert text to speech, create passwords, and much more.",
  keywords: ["online tools", "free tools", "productivity tools", "PDF generator", "image compressor", "text to speech", "password generator", "BMI calculator", "PDF merger", "developer tools", "online utilities"],
  authors: [{ name: "Nxt Ultimate Tools", url: "https://nexttools.netlify.app" }],
  creator: "Nxt Ultimate Tools",
  publisher: "Nxt Ultimate Tools",
  robots: "index, follow",
  openGraph: {
    title: "Nxt Ultimate Tools - Your All-in-One Productivity Suite",
    description: "Access over 40 professional tools for free. PDF, images, text, security, and more. Secure, fast, and works in your browser.",
    url: "https://nexttools.netlify.app",
    siteName: "Nxt Ultimate Tools",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Nxt Ultimate Tools Banner" }],
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
    canonical: "https://nexttools.netlify.app",
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
              "url": "https://nexttools.netlify.app",
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
                "url": "https://nexttools.netlify.app"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
        
        {/* ====== SOCIAL BAR AD CODE YAHAN HAI ====== */}
        <script async type='text/javascript' src='//nastylayer.com/92/c9/40/92c940085d7700d0fcc1aef760ccc038.js'></script>
        {/* =========================================== */}

      </body>
    </html>
  );
}
