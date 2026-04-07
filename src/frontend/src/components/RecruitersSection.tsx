import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { motion } from "motion/react";

const recruiters = [
  "Fortis Hospital",
  "Apollo Diagnostics",
  "Max Healthcare",
  "Medanta",
  "Lal Path Lab",
  "SRL Diagnostics",
  "Yatharth Hospital",
  "Kailash Hospital",
  "Safdarjung Hospital",
  "AIIMS Delhi",
  "GTB Hospital",
  "BLK Hospital",
];

export default function RecruitersSection() {
  return (
    <section id="recruiters" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-3 text-primary">
            Placement Partners
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Our Recruiters
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our graduates are placed at top healthcare organizations across
            Delhi NCR and beyond.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {recruiters.map((name, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground shadow-xs hover:shadow-card hover:border-primary/30 hover:text-primary transition-all duration-200">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                {name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
