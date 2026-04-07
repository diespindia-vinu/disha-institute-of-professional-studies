import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { motion } from "motion/react";
import { useGetAllAlumni } from "../hooks/useQueries";

export default function AlumniSection() {
  const { data: alumni } = useGetAllAlumni();
  const activeAlumni = (alumni ?? []).filter((a) => a.isActive);

  return (
    <section
      id="alumni"
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
            Our Achievers
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Alumni Showcase
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our graduates are working at top healthcare institutions across
            India.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          data-ocid="alumni.list"
        >
          {activeAlumni.map((alum, index) => (
            <motion.div
              key={String(alum.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              data-ocid={`alumni.item.${index + 1}`}
              className="bg-white rounded-xl p-4 text-center shadow-xs hover:shadow-card transition-shadow"
            >
              <Avatar className="h-14 w-14 mx-auto mb-3">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                  {alum.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <p className="font-semibold text-sm text-foreground leading-tight">
                {alum.name}
              </p>
              <Badge variant="secondary" className="text-xs mt-1 text-primary">
                {alum.course}
              </Badge>
              <div className="flex items-center gap-1 justify-center mt-2 text-xs text-muted-foreground">
                <Building2 className="h-3 w-3 shrink-0" />
                <span className="truncate">{alum.organization}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
