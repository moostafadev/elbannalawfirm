import React from "react";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import ClientSideWrapper from "./Loading";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="overflow-hidden mt-24">{children}</main>
      <ScrollToTop />
      <ClientSideWrapper />
    </>
  );
};

export default MainLayout;
