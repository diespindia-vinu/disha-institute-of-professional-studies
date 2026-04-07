import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search, UserX } from "lucide-react";
import { useState } from "react";
import type { Student } from "../backend";
import { useActor } from "../hooks/useActor";

function ResultStatusBadge({ status }: { status: string }) {
  if (status === "Pass") {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border border-green-300">
        ✓ Pass
      </Badge>
    );
  }
  if (status === "Fail") {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border border-red-300">
        ✗ Fail
      </Badge>
    );
  }
  return (
    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border border-yellow-300">
      ⏳ Pending
    </Badge>
  );
}

export default function StudentSearch() {
  const { actor } = useActor();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    try {
      const result = actor ? await actor.getStudent(query.trim()) : null;
      setStudent(result);
    } catch {
      setStudent(null);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  }

  return (
    <section className="py-12 bg-gray-50" id="student-search">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2
            className="text-2xl font-bold mb-1"
            style={{ color: "oklch(0.35 0.12 145)" }}
          >
            Student Details Search
          </h2>
          <p className="text-gray-500 text-sm">
            Registration Number se apni details dekhen
          </p>
          <div
            className="h-1 w-16 mx-auto mt-3 rounded-full"
            style={{ background: "oklch(0.55 0.14 145)" }}
          />
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Registration Number daalen (e.g. DIES/0279/18-19)"
            className="flex-1"
            data-ocid="student.search_input"
          />
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            style={{ background: "oklch(0.50 0.14 145)" }}
            className="text-white hover:opacity-90"
            data-ocid="student.primary_button"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            <span className="ml-1 hidden sm:inline">Search</span>
          </Button>
        </form>

        {loading && (
          <div
            className="flex items-center justify-center py-10 text-gray-400"
            data-ocid="student.loading_state"
          >
            <Loader2 className="h-6 w-6 animate-spin mr-2" /> Searching...
          </div>
        )}

        {!loading && searched && !student && (
          <div
            className="flex flex-col items-center py-10 text-gray-400"
            data-ocid="student.error_state"
          >
            <UserX className="h-12 w-12 mb-3 opacity-40" />
            <p className="text-base font-medium">
              Koi student nahi mila is registration number se
            </p>
            <p className="text-sm mt-1 opacity-70">
              Please registration number check karke dobara try karein
            </p>
          </div>
        )}

        {!loading && searched && student && (
          <Card
            className="border-2 shadow-md"
            style={{ borderColor: "oklch(0.75 0.12 145)" }}
            data-ocid="student.card"
          >
            <div
              className="px-5 py-3 rounded-t-lg flex items-center justify-between"
              style={{ background: "oklch(0.50 0.14 145)" }}
            >
              <div>
                <h3 className="text-white font-bold text-lg">{student.name}</h3>
                <p className="text-white/75 text-sm">
                  {student.registrationNumber}
                </p>
              </div>
              <ResultStatusBadge status={student.resultStatus} />
            </div>
            <CardContent className="pt-5 pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                <DetailRow label="Father's Name" value={student.fatherName} />
                <DetailRow label="Course" value={student.course} />
                <DetailRow label="Batch" value={student.batch} />
                <DetailRow label="Phone" value={student.phone} />
                <DetailRow label="Address" value={student.address} fullWidth />
                {student.remarks && (
                  <DetailRow
                    label="Remarks"
                    value={student.remarks}
                    fullWidth
                  />
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

function DetailRow({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
        {label}
      </p>
      <p className="text-gray-800 font-medium">{value || "—"}</p>
    </div>
  );
}
