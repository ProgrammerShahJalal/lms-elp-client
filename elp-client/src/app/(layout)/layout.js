"use client";

import Footer from "@/components/shared/Footer";
import MainNavber from "@/components/shared/MainNavber";

export default function RootLayout({ children }) {
  return (
    <>
      <MainNavber />

      {children}
      <Footer />
    </>
  );
}
