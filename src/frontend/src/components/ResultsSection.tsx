import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Download, FileText } from "lucide-react";
import { useGetAllResults } from "../hooks/useQueries";

export default function ResultsSection() {
  const { data: results } = useGetAllResults();
  const activeResults = (results ?? []).filter((r) => r.isActive);

  function formatDate(ts: bigint) {
    return new Date(Number(ts)).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function examTypeBadgeColor(type: string) {
    switch (type.toLowerCase()) {
      case "semester":
        return "bg-blue-100 text-blue-700";
      case "annual":
        return "bg-purple-100 text-purple-700";
      case "entrance":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <section className="py-14 bg-gray-50" id="results">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FileText
              className="h-6 w-6"
              style={{ color: "oklch(0.45 0.15 145)" }}
            />
            <h2
              className="text-3xl font-bold"
              style={{ color: "oklch(0.45 0.15 145)" }}
            >
              Exam Results
            </h2>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Latest examination results from Disha Institute
          </p>
          <div
            className="w-16 h-1 rounded-full mx-auto mt-3"
            style={{ background: "oklch(0.45 0.15 145)" }}
          />
        </div>

        {activeResults.length === 0 ? (
          <div
            className="text-center text-gray-400 py-12"
            data-ocid="results.empty_state"
          >
            No results published yet.
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="results.list"
          >
            {activeResults.map((result, i) => (
              <Card
                key={String(result.id)}
                className="border border-green-100 shadow-sm hover:shadow-md transition-shadow"
                data-ocid={`results.item.${i + 1}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-gray-800 text-sm leading-snug flex-1">
                      {result.title}
                    </h3>
                    <Badge
                      className={`text-xs font-medium shrink-0 border-0 ${examTypeBadgeColor(
                        result.examType,
                      )}`}
                    >
                      {result.examType}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(result.date)}</span>
                  </div>
                  {result.description && (
                    <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                      {result.description}
                    </p>
                  )}
                  {result.pdfLink && result.pdfLink !== "#" && (
                    <Button
                      size="sm"
                      asChild
                      className="w-full text-xs gap-1.5"
                      style={{ background: "oklch(0.45 0.15 145)" }}
                      data-ocid={`results.button.${i + 1}`}
                    >
                      <a
                        href={result.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="h-3.5 w-3.5" /> Download / View
                        Result
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
