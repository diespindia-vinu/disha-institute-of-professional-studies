import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetContactInfo } from "../hooks/useQueries";

const DEFAULT_CONTACT = {
  phone: "7206755141",
  email: "diespindia@gmail.com",
  address:
    "B-38, Pratap Nagar, Main Market Acharya Niketan, Mayur Vihar Phase-1, Delhi-91. Near Jeevan Anmol Hospital.",
};

export default function ContactSection() {
  const { data: contactInfo } = useGetContactInfo();
  const contact = contactInfo?.phone ? contactInfo : DEFAULT_CONTACT;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    course: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Thank you! We will contact you shortly.");
    setForm({ name: "", phone: "", email: "", message: "", course: "" });
  }

  return (
    <section
      id="contact"
      className="py-16"
      style={{ background: "oklch(0.93 0.05 230)" }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-3 text-primary">
            Get In Touch
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Contact Us
          </h2>
          <p className="text-muted-foreground">
            Have questions? We're here to help you make the right career choice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="bg-white rounded-xl p-5 border border-border shadow-xs flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Phone</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {contact.phone}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-border shadow-xs flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-border shadow-xs flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">Address</p>
                <p className="text-muted-foreground">{contact.address}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-border shadow-xs flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  Office Hours
                </p>
                <p className="text-muted-foreground">
                  Mon – Sat: 9:00 AM – 5:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl p-6 border border-border shadow-xs space-y-4"
              data-ocid="contact.modal"
            >
              <h3 className="font-bold text-lg text-foreground">
                Enquiry Form
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    required
                    data-ocid="contact.input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    data-ocid="contact.input"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  data-ocid="contact.input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="course">Course Interested In</Label>
                <Input
                  id="course"
                  placeholder="e.g. DMLT, GNM, Hotel Management"
                  value={form.course}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, course: e.target.value }))
                  }
                  data-ocid="contact.input"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Any questions or details..."
                  rows={3}
                  value={form.message}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, message: e.target.value }))
                  }
                  data-ocid="contact.textarea"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                data-ocid="contact.submit_button"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Enquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
