import { Badge } from "@/components/ui/badge";
import { Image } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useGetAllGalleryItems } from "../hooks/useQueries";
import type { GalleryItem } from "../hooks/useQueries";

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    (async () => {
      try {
        const directUrl = item.blob.getDirectURL();
        setUrl(directUrl);
      } catch {
        try {
          const bytes = await item.blob.getBytes();
          objectUrl = URL.createObjectURL(new Blob([bytes]));
          setUrl(objectUrl);
        } catch {
          setUrl(null);
        }
      }
    })();
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [item.blob]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      data-ocid={`gallery.item.${index + 1}`}
      className="relative group overflow-hidden rounded-xl bg-muted aspect-square"
    >
      {url ? (
        <img
          src={url}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-secondary">
          <Image className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-300 flex items-end">
        <div className="w-full px-3 pb-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm font-medium truncate">
            {item.title}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const { data: gallery } = useGetAllGalleryItems();
  const activeItems = (gallery ?? []).filter((g) => g.isActive);

  return (
    <section
      id="gallery"
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
            Campus Life
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-3">Gallery</h2>
          <p className="text-muted-foreground">
            Glimpses of campus life, events, and achievements.
          </p>
        </motion.div>

        {activeItems.length === 0 ? (
          <div className="text-center py-16" data-ocid="gallery.empty_state">
            <Image className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              Gallery coming soon. Admin can upload images from the admin panel.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            data-ocid="gallery.list"
          >
            {activeItems.map((item, index) => (
              <GalleryCard key={String(item.id)} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
