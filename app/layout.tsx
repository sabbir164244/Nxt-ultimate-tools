// app/layout.tsx - Fully SEO Optimized Code (CORRECTED)

import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ====== SEO METADATA YAHAN SE SHURU HOTA HAI ======
export const metadata: Metadata = {
  // Title (Browser tab aur Google search mein dikhega)
  title: {
    default: "Nxt Ultimate Tools - 40+ Free Online Tools for Productivity", // Home page ka title
    template: "%s | Nxt Ultimate Tools", // Baaki pages ka title (jaise "PDF Generator | Nxt Ultimate Tools")
  },

  // Description (Google search mein title ke neeche dikhega)
  description: "Boost your productivity with 40+ free, secure, and offline-ready online tools. Compress images, generate PDFs, convert text to speech, create passwords, and much more.",
  
  // Keywords (Kuch search engines ke liye)
  keywords: ["online tools", "free tools", "productivity tools", "PDF generator", "image compressor", "text to speech", "password generator", "BMI calculator", "PDF merger", "developer tools", "online utilities"],
  
  // Website ke maalik ki jaankari
  authors: [{ name: "Nxt Ultimate Tools", url: "https://nxt-ultimate-tools.com" }],
  creator: "Nxt Ultimate Tools",
  publisher: "Nxt Ultimate Tools",
  
  // Google ko batata hai ki page ko index karna hai
  robots: "index, follow",

  // Social Media Sharing (WhatsApp, Facebook, etc.) ke liye
  openGraph: {
    title: "Nxt Ultimate Tools - Your All-in-One Productivity Suite",
    description: "Access over 40 professional tools for free. PDF, images, text, security, and more. Secure, fast, and works in your browser.",
    url: "https://nxt-ultimate-tools.com",
    siteName: "Nxt Ultimate Tools",
    images: [
      {
        url: "/og-image.png", // Yeh /public/og-image.png wali file hai
        width: 1200,
        height: 630,
        alt: "Nxt Ultimate Tools Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Sharing ke liye
  twitter: {
    card: "summary_large_image",
    title: "Nxt Ultimate Tools - 40+ Free Online Tools",
    description: "The ultimate toolkit for all your productivity needs. From PDF editing to image compression, get it all for free.",
    images: ["/og-image.png"], // Yahan bhi wahi image istemaal hogi
  },

  // Google Search Console Verification
  verification: {
    google: "T5_t0W_VnciBLS73kWVvHJ-aO1ndEnFPbLhlnqgWIOg",
  },
  
  // Website Icon (Favicon)
  icons: {
    icon: "/nxtools-icon.png",
    shortcut: "/nxtools-icon.png",
    apple: "/nxtools-icon.png",
  },
  
  // Canonical URL (Duplicate content se bachne ke liye)
  alternates: {
    canonical: "https://nxt-ultimate-tools.com",
  },
};
// ====== SEO METADATA YAHAN KHATAM HOTA HAI ======


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="theme-color" content="#1e293b" />
        
        {/* ====== GOOGLE KO AAPKI WEBSITE KI POORI JAANKARI DENE WALA CODE ====== */}
        <script
          type="application/ld+json" // <-- DEKHIYE, YEH LINE AB SAHI HAI
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
        {/* ====================================================================== */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
