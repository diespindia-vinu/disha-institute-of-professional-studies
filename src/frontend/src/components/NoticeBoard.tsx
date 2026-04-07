import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CalendarDays } from "lucide-react";
import { motion } from "motion/react";
import { NoticeCategory, useGetAllNotices } from "../hooks/useQueries";
import type { Notice } from "../hooks/useQueries";

function NoticeItem({ notice, index }: { notice: Notice; index: number }) {
  const date = new Date(Number(notice.date));
  return (
    <div
      data-ocid={`notices.item.${index + 1}`}
      className="flex gap-3 py-3 border-b border-border last:border-0 group"
    >
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Bell className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
          {notice.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {notice.content}
        </p>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3" />
          <span>
            {date.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function NoticeBoard() {
  const { data: notices } = useGetAllNotices();
  const allActive = (notices ?? []).filter((n) => n.isActive);
  const general = allActive.filter(
    (n) => n.category === NoticeCategory.general,
  );
  const examination = allActive.filter(
    (n) => n.category === NoticeCategory.examination,
  );
  const admission = allActive.filter(
    (n) => n.category === NoticeCategory.admission,
  );

  return (
    <section id="notices" className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-3 text-primary">
            Latest Updates
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Notice Board
          </h2>
          <p className="text-muted-foreground">
            Stay updated with the latest announcements and notifications.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="general" data-ocid="notices.tab">
            <TabsList className="w-full mb-6">
              <TabsTrigger
                value="general"
                className="flex-1"
                data-ocid="notices.tab"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="examination"
                className="flex-1"
                data-ocid="notices.tab"
              >
                Examination
              </TabsTrigger>
              <TabsTrigger
                value="admission"
                className="flex-1"
                data-ocid="notices.tab"
              >
                Admission
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="bg-white rounded-xl border border-border p-4 shadow-xs">
                {general.length === 0 ? (
                  <p
                    className="text-center text-muted-foreground py-8"
                    data-ocid="notices.empty_state"
                  >
                    No general notices.
                  </p>
                ) : (
                  general.map((n, i) => (
                    <NoticeItem key={String(n.id)} notice={n} index={i} />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="examination">
              <div className="bg-white rounded-xl border border-border p-4 shadow-xs">
                {examination.length === 0 ? (
                  <p
                    className="text-center text-muted-foreground py-8"
                    data-ocid="notices.empty_state"
                  >
                    No examination notices.
                  </p>
                ) : (
                  examination.map((n, i) => (
                    <NoticeItem key={String(n.id)} notice={n} index={i} />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="admission">
              <div className="bg-white rounded-xl border border-border p-4 shadow-xs">
                {admission.length === 0 ? (
                  <p
                    className="text-center text-muted-foreground py-8"
                    data-ocid="notices.empty_state"
                  >
                    No admission notices.
                  </p>
                ) : (
                  admission.map((n, i) => (
                    <NoticeItem key={String(n.id)} notice={n} index={i} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
