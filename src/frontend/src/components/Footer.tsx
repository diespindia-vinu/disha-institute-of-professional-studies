import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Notice Board", href: "#notices" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact Us", href: "#contact" },
  { label: "Admin Panel", href: "/admin" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      style={{ background: "oklch(0.18 0.06 240)" }}
      className="text-white/80"
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src="/assets/generated/disha-logo-transparent.dim_120x120.png"
                alt="Disha Institute"
                className="h-10 w-10 object-contain rounded-full"
              />
              <div>
                <div className="text-sm font-bold text-white">
                  Disha Institute
                </div>
                <div className="text-xs text-white/60">
                  of Professional Studies
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Premier Allied Healthcare & Management Institute in Mayur Vihar,
              Delhi. Shaping future healthcare professionals since 2005.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex gap-2.5 items-start">
                <Phone className="h-4 w-4 shrink-0 mt-0.5 text-sky-400" />
                <a
                  href="tel:7206755141"
                  className="text-sm hover:text-white transition-colors"
                >
                  7206755141
                </a>
              </div>
              <div className="flex gap-2.5 items-start">
                <Mail className="h-4 w-4 shrink-0 mt-0.5 text-sky-400" />
                <a
                  href="mailto:diespindia@gmail.com"
                  className="text-sm hover:text-white transition-colors break-all"
                >
                  diespindia@gmail.com
                </a>
              </div>
              <div className="flex gap-2.5 items-start">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-sky-400" />
                <p className="text-sm">
                  B-38, Pratap Nagar, Main Market Acharya Niketan, Mayur Vihar
                  Phase-1, Delhi-91
                </p>
              </div>
            </div>
          </div>

          {/* Links + Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-1.5 mb-6">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-2 justify-between text-xs text-white/50">
          <p>
            © {year} Disha Institute of Professional Studies. All rights
            reserved.
          </p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
