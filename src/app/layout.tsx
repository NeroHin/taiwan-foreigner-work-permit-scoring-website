import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "僑外生留台工作評點制計算器",
  description:
    "協助僑外生快速計算評點制分數，了解是否達到 70 分門檻取得工作許可",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
