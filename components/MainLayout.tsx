import React from "react";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import ClientSideWrapper from "./Loading";
import ContactBtn from "./ContactBtn";
import { Toaster } from "./ui/toaster";
import Footer from "./Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="overflow-hidden mt-24">
        {children}
        <ScrollToTop />
        <ContactBtn />
        <Toaster />
        <ClientSideWrapper />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
