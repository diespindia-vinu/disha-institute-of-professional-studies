import { Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full"
      style={{ height: "calc(100vh - 0px)", paddingTop: "160px" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/hero-institute.dim_1400x700.jpg')`,
        }}
      />

      {/* Bottom-left: Online Admission button */}
      <a
        href="#contact"
        data-ocid="hero.primary_button"
        className="absolute bottom-8 left-8 z-10 flex items-center gap-2 px-6 py-3 rounded-md text-white font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "#e85d04" }}
      >
        Online Admission Form
      </a>

      {/* Bottom-right: WhatsApp button */}
      <a
        href="https://wa.me/917206755141"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="hero.secondary_button"
        aria-label="WhatsApp us"
        className="absolute bottom-8 right-8 z-10 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:opacity-90 transition-opacity text-white font-bold text-xl"
        style={{ backgroundColor: "#25d366" }}
      >
        <Phone className="h-6 w-6" />
      </a>
    </section>
  );
}
