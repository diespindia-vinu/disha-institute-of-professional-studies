import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, CheckCircle2, Users } from "lucide-react";
import { motion } from "motion/react";
import { useGetAboutText } from "../hooks/useQueries";

const DEFAULT_ABOUT = `Disha Institute of Professional Studies (DIPS) is a premier Allied Healthcare and Management Institute located in Mayur Vihar Phase-1, Delhi. Established with the vision of producing highly skilled healthcare professionals, we have been at the forefront of healthcare education for over 15 years.

Our institute offers a range of diploma and degree programs in Allied Health Sciences and Management. We are affiliated with recognized universities and our courses are approved by the relevant regulatory authorities.

At DIPS, we believe in holistic education that combines theoretical knowledge with hands-on clinical training. Our state-of-the-art laboratories, experienced faculty, and strong industry connections ensure our students are job-ready from day one.`;

const highlights = [
  { icon: Users, label: "5000+ Alumni" },
  { icon: Award, label: "15+ Years Experience" },
  { icon: BookOpen, label: "8+ Professional Courses" },
  { icon: CheckCircle2, label: "100% Placement Support" },
];

export default function AboutSection() {
  const { data: aboutText } = useGetAboutText();
  const text = aboutText?.trim() ? aboutText : DEFAULT_ABOUT;

  return (
    <section id="about" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-3 text-primary">
            Who We Are
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">About Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {text.split("\n\n").map((para) => (
              <p
                key={para.slice(0, 30)}
                className="text-muted-foreground leading-relaxed mb-4"
              >
                {para}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-border p-5 flex flex-col items-center text-center shadow-xs hover:shadow-card transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="font-semibold text-sm text-foreground">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
