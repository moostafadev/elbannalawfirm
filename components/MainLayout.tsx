import React, { Suspense } from "react";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";
import ContactBtn from "./ContactBtn";
import { Toaster } from "./ui/toaster";
import Footer from "./Footer";
import Loading from "./Loading";
import ViewCount from "./ViewCount";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mt-24 overflow-x-clip">
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <ScrollToTop />
        <ContactBtn />
        <ViewCount />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default MainLayout;
