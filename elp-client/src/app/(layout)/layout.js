"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

import Navbar from "@/components/shared/Navbar";
import NavigationMenu from "@/components/shared/NavigationMenu";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {/* <Header /> */}
      {/* <NavigationMenu/> */}

      {children}
      <Footer />
    </>
  );
}
