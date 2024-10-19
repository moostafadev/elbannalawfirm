import React from "react";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import ClientSideWrapper from "./Loading";
import ContactBtn from "./ContactBtn";
import { Toaster } from "./ui/toaster";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="overflow-hidden mt-24">{children}</main>
      <ScrollToTop />
      <ContactBtn />
      <Toaster />
      <ClientSideWrapper />
    </>
  );
};

export default MainLayout;
