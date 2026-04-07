import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Clock, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { useGetAllCourses } from "../hooks/useQueries";

export default function CoursesSection() {
  const { data: courses, isLoading } = useGetAllCourses();

  return (
    <section id="courses" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-3 text-primary">
            Our Programs
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Courses We Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of healthcare and management courses
            designed to prepare you for a successful career.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            data-ocid="courses.loading_state"
          >
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((k) => (
              <Skeleton key={k} className="h-52 rounded-xl" />
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            data-ocid="courses.list"
          >
            {(courses ?? [])
              .filter((c) => c.isActive)
              .map((course, index) => (
                <motion.div
                  key={String(course.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  data-ocid={`courses.item.${index + 1}`}
                >
                  <Card className="h-full hover:shadow-card transition-shadow duration-200 hover:-translate-y-0.5 border-border">
                    <CardHeader className="pb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base font-bold text-foreground">
                        {course.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5" />
                        <span className="truncate">{course.eligibility}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
