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
    <Suspense fallback={<Loading />}>
      <Header />
      <main className="overflow-hidden mt-24">
        {children}
        <ScrollToTop />
        <ContactBtn />
        <Toaster />
        <ViewCount />
      </main>
      <Footer />
    </Suspense>
  );
};

export default MainLayout;
