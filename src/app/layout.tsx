import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import gsplplusLogo from "../gsplplus_logo.png";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2026-04-21 콘텐츠 한국어 톤 통일: 검색·미리보기용 사이트 설명을 한국어로 정리함.
const siteTitle =
  "가스펠플러스(GSPLPLUS) | 임베디드 하드웨어·소프트웨어 개발";
const siteDescription =
  "가스펠플러스(GSPLPLUS, gspls.kr)는 임베디드 하드웨어·소프트웨어 개발, 전장설계, 회로설계, 보드개발, 시스템 통합, 점검장비 및 시뮬레이터 개발을 수행하는 엔지니어링 기업입니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://gspls.kr"),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "가스펠플러스",
    "GSPLPLUS",
    "gspls",
    "gspls.kr",
    "임베디드 하드웨어",
    "임베디드 소프트웨어",
    "전장설계",
    "회로설계",
    "보드개발",
    "시스템 통합",
  ],
  alternates: {
    canonical: "https://gspls.kr/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://gspls.kr/",
    siteName: "가스펠플러스(GSPLPLUS)",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="siteHeader">
          <div className="siteHeaderInner">
            <Link className="siteBrand" href="/" aria-label="GSPLPLUS 홈">
              <Image
                className="siteBrandImage"
                src={gsplplusLogo}
                alt="GSPLPLUS"
                priority
              />
            </Link>
            <nav className="siteNav" aria-label="주요 메뉴">
              <Link href="/about">회사 소개</Link>
              <Link href="/work">하는 일</Link>
              <Link href="/location">오시는 길</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
