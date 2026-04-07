import { Mail, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#about" },
  { label: "COURSES", href: "#courses" },
  { label: "STUDENT CORNER", href: "#gallery" },
  { label: "ONLINE ADMISSION", href: "#contact" },
  { label: "OUR BRANCHES", href: "#about" },
  { label: "CONTACT US", href: "#contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Layer 1 - Top green info bar */}
      <div className="bg-[#2d7a2d] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            <span>Call us on 7206755141</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" />
              <a href="mailto:diespindia@gmail.com" className="hover:underline">
                diespindia@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-300 transition-colors"
                data-ocid="nav.link"
              >
                <SiFacebook className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-sky-300 transition-colors"
                data-ocid="nav.link"
              >
                <SiX className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-300 transition-colors"
                data-ocid="nav.link"
              >
                <SiInstagram className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 2 - Main header with logo and institute name */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo + Name */}
          <a
            href="#home"
            className="flex items-center gap-3"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/disha-logo-transparent.dim_120x120.png"
              alt="Disha Institute Logo"
              className="h-20 w-20 object-contain rounded-full border-2 border-green-200"
            />
            <div>
              <div
                className="text-3xl font-extrabold leading-tight"
                style={{ color: "#cc0000", fontFamily: "Georgia, serif" }}
              >
                Disha Institute of Professional Studies™
              </div>
              <div className="text-sm font-medium text-gray-600 mt-0.5">
                (Allied Healthcare and Management Institute)
              </div>
            </div>
          </a>

          {/* 16 Years Badge */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className="relative flex flex-col items-center justify-center rounded-full border-4 text-center"
              style={{
                width: 90,
                height: 90,
                borderColor: "#cc0000",
                background: "radial-gradient(circle, #fff8f0, #ffe8e8)",
                boxShadow: "0 0 0 3px #cc000033",
              }}
            >
              <span
                className="text-2xl font-extrabold leading-none"
                style={{ color: "#cc0000" }}
              >
                16
              </span>
              <span className="text-[9px] font-bold uppercase tracking-tight text-gray-700 leading-tight mt-0.5">
                Years of
                <br />
                Progress
              </span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Layer 3 - Navigation bar */}
      <div className="bg-white border-b-2 border-[#2d7a2d]">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="hidden lg:flex items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid="nav.link"
                className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-[#2d7a2d] border-b-2 border-transparent hover:border-[#2d7a2d] transition-all duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-200"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#2d7a2d] hover:bg-green-50 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
