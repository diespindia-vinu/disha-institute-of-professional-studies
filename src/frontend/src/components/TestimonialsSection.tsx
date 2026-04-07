import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { motion } from "motion/react";

const videos = [
  {
    id: "v1",
    title: "DMLT Student Success Story",
    description: "Hear from our DMLT graduate now working at Fortis Hospital.",
  },
  {
    id: "v2",
    title: "GNM Program Overview",
    description:
      "Our GNM students share their learning experience and clinical training.",
  },
  {
    id: "v3",
    title: "Campus Tour & Facilities",
    description:
      "Take a virtual tour of our state-of-the-art laboratories and classrooms.",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
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
            Student Stories
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Video Testimonials
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Watch what our students and alumni have to say about their journey
            at Disha Institute.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-xs border border-border"
            >
              {/* Placeholder thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-brand-dark/30 flex items-center justify-center group cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 text-primary ml-1" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-foreground mb-1">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
