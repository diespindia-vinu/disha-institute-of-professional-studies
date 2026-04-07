import { Toaster } from "@/components/ui/sonner";
import AboutSection from "./components/AboutSection";
import AlumniSection from "./components/AlumniSection";
import ContactSection from "./components/ContactSection";
import CoursesSection from "./components/CoursesSection";
import Footer from "./components/Footer";
import GallerySection from "./components/GallerySection";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import NoticeBoard from "./components/NoticeBoard";
import RecruitersSection from "./components/RecruitersSection";
import ResultsSection from "./components/ResultsSection";
import StudentSearch from "./components/StudentSearch";
import TestimonialsSection from "./components/TestimonialsSection";
import AdminPanel from "./pages/AdminPanel";

export default function App() {
  const isAdmin = window.location.pathname === "/admin";

  if (isAdmin) {
    return (
      <>
        <AdminPanel />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CoursesSection />
        <AlumniSection />
        <NoticeBoard />
        <ResultsSection />
        <StudentSearch />
        <GallerySection />
        <RecruitersSection />
        <TestimonialsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
