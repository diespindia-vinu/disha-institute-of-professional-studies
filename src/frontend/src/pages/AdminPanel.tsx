import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  BookOpen,
  FileText,
  GraduationCap,
  Image,
  Loader2,
  LogOut,
  Pencil,
  Phone,
  Plus,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import type { Student } from "../backend";
import {
  useAddStudent,
  useCreateAlumni,
  useCreateCourse,
  useCreateGalleryItem,
  useCreateNotice,
  useCreateResult,
  useDeleteAlumni,
  useDeleteCourse,
  useDeleteGalleryItem,
  useDeleteNotice,
  useDeleteResult,
  useDeleteStudent,
  useGetAboutText,
  useGetAllAlumni,
  useGetAllCourses,
  useGetAllGalleryItems,
  useGetAllNotices,
  useGetAllResults,
  useGetAllStudents,
  useGetContactInfo,
  useUpdateAboutText,
  useUpdateAlumni,
  useUpdateContactInfo,
  useUpdateCourse,
  useUpdateNotice,
  useUpdateResult,
  useUpdateStudent,
} from "../hooks/useQueries";
import type {
  Alumni,
  ContactInfo,
  Course,
  Notice,
  Result,
} from "../hooks/useQueries";
import { NoticeCategory } from "../hooks/useQueries";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "disha@2024";

// ---------- Login ----------
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(0.975 0.005 240)" }}
    >
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <img
            src="/assets/generated/disha-logo-transparent.dim_120x120.png"
            alt="Logo"
            className="h-16 w-16 mx-auto mb-2 rounded-full"
          />
          <CardTitle>Admin Login</CardTitle>
          <p className="text-sm text-muted-foreground">
            Disha Institute of Professional Studies
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                data-ocid="admin.username_input"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                data-ocid="admin.password_input"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              className="w-full"
              data-ocid="admin.primary_button"
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full"
              asChild
              data-ocid="admin.secondary_button"
            >
              <a href="/">← Back to Website</a>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ---------- Students Tab ----------
function StudentsTab() {
  const { data: students, isLoading } = useGetAllStudents();
  const addStudent = useAddStudent();
  const updateStudent = useUpdateStudent();
  const deleteStudent = useDeleteStudent();
  const [open, setOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editing, setEditing] = useState<Student | null>(null);
  const emptyForm: Student = {
    registrationNumber: "",
    name: "",
    fatherName: "",
    course: "",
    batch: "",
    phone: "",
    address: "",
    resultStatus: "Pending",
    remarks: "",
  };
  const [form, setForm] = useState<Student>(emptyForm);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(s: Student) {
    setEditing(s);
    setForm({ ...s });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.registrationNumber || !form.name) {
      toast.error("Registration number and name are required");
      return;
    }
    try {
      if (editing) {
        await updateStudent.mutateAsync(form);
        toast.success("Student updated");
      } else {
        await addStudent.mutateAsync(form);
        toast.success("Student added");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save student");
    }
  }

  async function handleDelete(regNo: string) {
    try {
      await deleteStudent.mutateAsync(regNo);
      toast.success("Student deleted");
      setDeleteConfirm(null);
    } catch {
      toast.error("Failed to delete student");
    }
  }

  function statusColor(status: string) {
    if (status === "Pass")
      return "bg-green-100 text-green-800 border-green-300";
    if (status === "Fail") return "bg-red-100 text-red-800 border-red-300";
    return "bg-yellow-100 text-yellow-800 border-yellow-300";
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-foreground">Manage Students</h3>
        <Button
          size="sm"
          onClick={openCreate}
          data-ocid="students.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Student
        </Button>
      </div>

      {isLoading ? (
        <div
          className="flex justify-center py-12"
          data-ocid="students.loading_state"
        >
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (students ?? []).length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="students.empty_state"
        >
          No students added yet. Click "Add Student" to get started.
        </div>
      ) : (
        <div
          className="bg-white rounded-xl border border-border overflow-hidden"
          data-ocid="students.table"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reg. Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Result</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(students ?? []).map((s, i) => (
                <TableRow
                  key={s.registrationNumber}
                  data-ocid={`students.row.${i + 1}`}
                >
                  <TableCell className="font-mono text-xs">
                    {s.registrationNumber}
                  </TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.course}</TableCell>
                  <TableCell>{s.batch}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${statusColor(
                        s.resultStatus,
                      )}`}
                    >
                      {s.resultStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => openEdit(s)}
                        data-ocid={`students.edit_button.${i + 1}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        onClick={() => setDeleteConfirm(s.registrationNumber)}
                        data-ocid={`students.delete_button.${i + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg" data-ocid="students.dialog">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Student" : "Add Student"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>Registration Number *</Label>
              <Input
                value={form.registrationNumber}
                onChange={(e) =>
                  setForm((p) => ({ ...p, registrationNumber: e.target.value }))
                }
                placeholder="e.g. DIES/0001/24-25"
                disabled={!!editing}
                data-ocid="students.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Student Name *</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="students.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Father's Name</Label>
              <Input
                value={form.fatherName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fatherName: e.target.value }))
                }
                data-ocid="students.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Course</Label>
              <Input
                value={form.course}
                onChange={(e) =>
                  setForm((p) => ({ ...p, course: e.target.value }))
                }
                placeholder="e.g. DMLT"
                data-ocid="students.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Batch</Label>
              <Input
                value={form.batch}
                onChange={(e) =>
                  setForm((p) => ({ ...p, batch: e.target.value }))
                }
                placeholder="e.g. 2022-24"
                data-ocid="students.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                data-ocid="students.input"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) =>
                  setForm((p) => ({ ...p, address: e.target.value }))
                }
                data-ocid="students.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Result Status</Label>
              <Select
                value={form.resultStatus}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, resultStatus: v }))
                }
              >
                <SelectTrigger data-ocid="students.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pass">Pass</SelectItem>
                  <SelectItem value="Fail">Fail</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Remarks</Label>
              <Input
                value={form.remarks}
                onChange={(e) =>
                  setForm((p) => ({ ...p, remarks: e.target.value }))
                }
                placeholder="Optional notes"
                data-ocid="students.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="students.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={addStudent.isPending || updateStudent.isPending}
              data-ocid="students.confirm_button"
            >
              {addStudent.isPending || updateStudent.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <DialogContent data-ocid="students.modal">
          <DialogHeader>
            <DialogTitle>Delete Student?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Kya aap sure hain? Is action ko undo nahi kiya ja sakta.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              data-ocid="students.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={deleteStudent.isPending}
              data-ocid="students.confirm_button"
            >
              {deleteStudent.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Courses Tab ----------
function CoursesTab() {
  const { data: courses } = useGetAllCourses();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState<Omit<Course, "id">>({
    name: "",
    duration: "",
    description: "",
    eligibility: "",
    isActive: true,
  });

  function openCreate() {
    setEditing(null);
    setForm({
      name: "",
      duration: "",
      description: "",
      eligibility: "",
      isActive: true,
    });
    setOpen(true);
  }

  function openEdit(c: Course) {
    setEditing(c);
    setForm({
      name: c.name,
      duration: c.duration,
      description: c.description,
      eligibility: c.eligibility,
      isActive: c.isActive,
    });
    setOpen(true);
  }

  async function handleSave() {
    try {
      if (editing) {
        await updateCourse.mutateAsync({
          id: editing.id,
          course: { ...form, id: editing.id },
        });
        toast.success("Course updated");
      } else {
        await createCourse.mutateAsync({ ...form, id: 0n });
        toast.success("Course created");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save course");
    }
  }

  async function handleDelete(id: bigint) {
    try {
      await deleteCourse.mutateAsync(id);
      toast.success("Course deleted");
    } catch {
      toast.error("Failed to delete course");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-foreground">Manage Courses</h3>
        <Button
          size="sm"
          onClick={openCreate}
          data-ocid="courses.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Course
        </Button>
      </div>
      <div
        className="bg-white rounded-xl border border-border overflow-hidden"
        data-ocid="courses.table"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Eligibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(courses ?? []).map((c, i) => (
              <TableRow key={String(c.id)} data-ocid={`courses.row.${i + 1}`}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>{c.duration}</TableCell>
                <TableCell>{c.eligibility}</TableCell>
                <TableCell>
                  <Badge variant={c.isActive ? "default" : "secondary"}>
                    {c.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => openEdit(c)}
                      data-ocid={`courses.edit_button.${i + 1}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(c.id)}
                      data-ocid={`courses.delete_button.${i + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="courses.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Course" : "Add Course"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Course Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="courses.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Duration</Label>
              <Input
                value={form.duration}
                onChange={(e) =>
                  setForm((p) => ({ ...p, duration: e.target.value }))
                }
                placeholder="e.g. 2 Years"
                data-ocid="courses.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Eligibility</Label>
              <Input
                value={form.eligibility}
                onChange={(e) =>
                  setForm((p) => ({ ...p, eligibility: e.target.value }))
                }
                placeholder="e.g. 10+2 with Science"
                data-ocid="courses.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="courses.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="courses.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={createCourse.isPending || updateCourse.isPending}
              data-ocid="courses.confirm_button"
            >
              {createCourse.isPending || updateCourse.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Notices Tab ----------
function NoticesTab() {
  const { data: notices } = useGetAllNotices();
  const createNotice = useCreateNotice();
  const updateNotice = useUpdateNotice();
  const deleteNotice = useDeleteNotice();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Notice | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: NoticeCategory.general as NoticeCategory,
    isActive: true,
  });

  function openCreate() {
    setEditing(null);
    setForm({
      title: "",
      content: "",
      category: NoticeCategory.general,
      isActive: true,
    });
    setOpen(true);
  }

  function openEdit(n: Notice) {
    setEditing(n);
    setForm({
      title: n.title,
      content: n.content,
      category: n.category,
      isActive: n.isActive,
    });
    setOpen(true);
  }

  async function handleSave() {
    try {
      if (editing) {
        await updateNotice.mutateAsync({
          id: editing.id,
          notice: { ...form, id: editing.id, date: editing.date },
        });
        toast.success("Notice updated");
      } else {
        await createNotice.mutateAsync({
          ...form,
          id: 0n,
          date: BigInt(Date.now()),
        });
        toast.success("Notice created");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save notice");
    }
  }

  async function handleDelete(id: bigint) {
    try {
      await deleteNotice.mutateAsync(id);
      toast.success("Notice deleted");
    } catch {
      toast.error("Failed to delete notice");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-foreground">Manage Notices</h3>
        <Button
          size="sm"
          onClick={openCreate}
          data-ocid="notices.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Notice
        </Button>
      </div>
      <div
        className="bg-white rounded-xl border border-border overflow-hidden"
        data-ocid="notices.table"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(notices ?? []).map((n, i) => (
              <TableRow key={String(n.id)} data-ocid={`notices.row.${i + 1}`}>
                <TableCell className="font-medium max-w-xs truncate">
                  {n.title}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{n.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={n.isActive ? "default" : "secondary"}>
                    {n.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => openEdit(n)}
                      data-ocid={`notices.edit_button.${i + 1}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(n.id)}
                      data-ocid={`notices.delete_button.${i + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="notices.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Notice" : "Add Notice"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="notices.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, category: v as NoticeCategory }))
                }
              >
                <SelectTrigger data-ocid="notices.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NoticeCategory.general}>
                    General
                  </SelectItem>
                  <SelectItem value={NoticeCategory.examination}>
                    Examination
                  </SelectItem>
                  <SelectItem value={NoticeCategory.admission}>
                    Admission
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Content</Label>
              <Textarea
                rows={4}
                value={form.content}
                onChange={(e) =>
                  setForm((p) => ({ ...p, content: e.target.value }))
                }
                data-ocid="notices.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="notices.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={createNotice.isPending || updateNotice.isPending}
              data-ocid="notices.confirm_button"
            >
              {createNotice.isPending || updateNotice.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Alumni Tab ----------
function AlumniTab() {
  const { data: alumni } = useGetAllAlumni();
  const createAlumni = useCreateAlumni();
  const updateAlumni = useUpdateAlumni();
  const deleteAlumni = useDeleteAlumni();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Alumni | null>(null);
  const [form, setForm] = useState({
    name: "",
    course: "",
    organization: "",
    isActive: true,
  });

  function openCreate() {
    setEditing(null);
    setForm({ name: "", course: "", organization: "", isActive: true });
    setOpen(true);
  }

  function openEdit(a: Alumni) {
    setEditing(a);
    setForm({
      name: a.name,
      course: a.course,
      organization: a.organization,
      isActive: a.isActive,
    });
    setOpen(true);
  }

  async function handleSave() {
    try {
      if (editing) {
        await updateAlumni.mutateAsync({
          id: editing.id,
          alumniData: { ...form, id: editing.id },
        });
        toast.success("Alumni updated");
      } else {
        await createAlumni.mutateAsync({ ...form, id: 0n });
        toast.success("Alumni added");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save");
    }
  }

  async function handleDelete(id: bigint) {
    try {
      await deleteAlumni.mutateAsync(id);
      toast.success("Alumni deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-foreground">Manage Alumni</h3>
        <Button
          size="sm"
          onClick={openCreate}
          data-ocid="alumni.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Alumni
        </Button>
      </div>
      <div
        className="bg-white rounded-xl border border-border overflow-hidden"
        data-ocid="alumni.table"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(alumni ?? []).map((a, i) => (
              <TableRow key={String(a.id)} data-ocid={`alumni.row.${i + 1}`}>
                <TableCell className="font-medium">{a.name}</TableCell>
                <TableCell>{a.course}</TableCell>
                <TableCell>{a.organization}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => openEdit(a)}
                      data-ocid={`alumni.edit_button.${i + 1}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(a.id)}
                      data-ocid={`alumni.delete_button.${i + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="alumni.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Alumni" : "Add Alumni"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="alumni.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Course</Label>
              <Input
                value={form.course}
                onChange={(e) =>
                  setForm((p) => ({ ...p, course: e.target.value }))
                }
                data-ocid="alumni.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Organization</Label>
              <Input
                value={form.organization}
                onChange={(e) =>
                  setForm((p) => ({ ...p, organization: e.target.value }))
                }
                data-ocid="alumni.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="alumni.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={createAlumni.isPending || updateAlumni.isPending}
              data-ocid="alumni.confirm_button"
            >
              {createAlumni.isPending || updateAlumni.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Gallery Tab ----------
function GalleryTab() {
  const { data: gallery } = useGetAllGalleryItems();
  const createGallery = useCreateGalleryItem();
  const deleteGallery = useDeleteGalleryItem();
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  async function handleUpload() {
    if (!file || !title) {
      toast.error("Please provide title and image");
      return;
    }
    setUploading(true);
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob =
        ExternalBlob.fromBytes(bytes).withUploadProgress(setProgress);
      await createGallery.mutateAsync({ title, blob });
      toast.success("Image uploaded");
      setTitle("");
      setFile(null);
      setProgress(0);
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <h3 className="font-semibold text-foreground mb-4">Manage Gallery</h3>
      <div className="bg-white rounded-xl border border-border p-4 mb-6">
        <h4 className="text-sm font-medium mb-3">Upload New Image</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            placeholder="Image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            data-ocid="gallery.input"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            data-ocid="gallery.upload_button"
          />
          <Button
            onClick={handleUpload}
            disabled={uploading || !file || !title}
            data-ocid="gallery.primary_button"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {progress}%
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </div>
      {(gallery ?? []).length === 0 ? (
        <p
          className="text-center text-muted-foreground py-8"
          data-ocid="gallery.empty_state"
        >
          No gallery items yet.
        </p>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          data-ocid="gallery.list"
        >
          {(gallery ?? []).map((item, i) => (
            <div
              key={String(item.id)}
              className="relative group rounded-lg overflow-hidden bg-muted aspect-square"
              data-ocid={`gallery.item.${i + 1}`}
            >
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={() => deleteGallery.mutateAsync(item.id)}
                  data-ocid={`gallery.delete_button.${i + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                <p className="text-white text-xs truncate">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- About Tab ----------
function AboutTab() {
  const { data: aboutText } = useGetAboutText();
  const updateAbout = useUpdateAboutText();
  const [text, setText] = useState("");
  const currentText = aboutText ?? "";
  const [initialized, setInitialized] = useState(false);
  if (!initialized && currentText) {
    setText(currentText);
    setInitialized(true);
  }

  async function handleSave() {
    try {
      await updateAbout.mutateAsync(text);
      toast.success("About text updated");
    } catch {
      toast.error("Failed to save");
    }
  }

  return (
    <div>
      <h3 className="font-semibold text-foreground mb-4">Edit About Us</h3>
      <div className="bg-white rounded-xl border border-border p-4 space-y-3">
        <Label>About Text</Label>
        <Textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter about us content..."
          data-ocid="about.textarea"
        />
        <Button
          onClick={handleSave}
          disabled={updateAbout.isPending}
          data-ocid="about.save_button"
        >
          {updateAbout.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

// ---------- Results Tab ----------
function ResultsTab() {
  const { data: results } = useGetAllResults();
  const createResult = useCreateResult();
  const updateResult = useUpdateResult();
  const deleteResult = useDeleteResult();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Result | null>(null);
  const [form, setForm] = useState({
    title: "",
    examType: "Semester",
    pdfLink: "",
    description: "",
    isActive: true,
  });

  function openCreate() {
    setEditing(null);
    setForm({
      title: "",
      examType: "Semester",
      pdfLink: "",
      description: "",
      isActive: true,
    });
    setOpen(true);
  }

  function openEdit(r: Result) {
    setEditing(r);
    setForm({
      title: r.title,
      examType: r.examType,
      pdfLink: r.pdfLink,
      description: r.description,
      isActive: r.isActive,
    });
    setOpen(true);
  }

  async function handleSave() {
    try {
      if (editing) {
        await updateResult.mutateAsync({
          id: editing.id,
          result: { ...form, id: editing.id, date: editing.date },
        });
        toast.success("Result updated");
      } else {
        await createResult.mutateAsync({
          ...form,
          id: 0n,
          date: BigInt(Date.now()),
        });
        toast.success("Result created");
      }
      setOpen(false);
    } catch {
      toast.error("Failed to save result");
    }
  }

  async function handleDelete(id: bigint) {
    try {
      await deleteResult.mutateAsync(id);
      toast.success("Result deleted");
    } catch {
      toast.error("Failed to delete result");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-foreground">Manage Results</h3>
        <Button
          size="sm"
          onClick={openCreate}
          data-ocid="results.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Result
        </Button>
      </div>
      <div
        className="bg-white rounded-xl border border-border overflow-hidden"
        data-ocid="results.table"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(results ?? []).map((r, i) => (
              <TableRow key={String(r.id)} data-ocid={`results.row.${i + 1}`}>
                <TableCell className="font-medium max-w-xs truncate">
                  {r.title}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{r.examType}</Badge>
                </TableCell>
                <TableCell>
                  {new Date(Number(r.date)).toLocaleDateString("en-IN")}
                </TableCell>
                <TableCell>
                  <Badge variant={r.isActive ? "default" : "secondary"}>
                    {r.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => openEdit(r)}
                      data-ocid={`results.edit_button.${i + 1}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDelete(r.id)}
                      data-ocid={`results.delete_button.${i + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-ocid="results.dialog">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Result" : "Add Result"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="results.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Exam Type</Label>
              <Select
                value={form.examType}
                onValueChange={(v) => setForm((p) => ({ ...p, examType: v }))}
              >
                <SelectTrigger data-ocid="results.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semester">Semester</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                  <SelectItem value="Entrance">Entrance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>PDF Link (optional)</Label>
              <Input
                value={form.pdfLink}
                onChange={(e) =>
                  setForm((p) => ({ ...p, pdfLink: e.target.value }))
                }
                placeholder="https://..."
                data-ocid="results.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                data-ocid="results.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((p) => ({ ...p, isActive: e.target.checked }))
                }
                id="result-active"
                data-ocid="results.checkbox"
              />
              <Label htmlFor="result-active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              data-ocid="results.cancel_button"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} data-ocid="results.save_button">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Contact Tab ----------
function ContactTab() {
  const { data: contactInfo } = useGetContactInfo();
  const updateContact = useUpdateContactInfo();
  const [form, setForm] = useState<ContactInfo>({
    phone: "7206755141",
    email: "diespindia@gmail.com",
    address: "B-38, Pratap Nagar, Mayur Vihar Phase-1, Delhi-91",
  });
  const [initialized, setInitialized] = useState(false);
  if (!initialized && contactInfo?.phone) {
    setForm(contactInfo);
    setInitialized(true);
  }

  async function handleSave() {
    try {
      await updateContact.mutateAsync(form);
      toast.success("Contact info updated");
    } catch {
      toast.error("Failed to save");
    }
  }

  return (
    <div>
      <h3 className="font-semibold text-foreground mb-4">Edit Contact Info</h3>
      <div className="bg-white rounded-xl border border-border p-4 space-y-3 max-w-lg">
        <div className="space-y-1">
          <Label>Phone</Label>
          <Input
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            data-ocid="contact.input"
          />
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            data-ocid="contact.input"
          />
        </div>
        <div className="space-y-1">
          <Label>Address</Label>
          <Textarea
            rows={3}
            value={form.address}
            onChange={(e) =>
              setForm((p) => ({ ...p, address: e.target.value }))
            }
            data-ocid="contact.textarea"
          />
        </div>
        <Button
          onClick={handleSave}
          disabled={updateContact.isPending}
          data-ocid="contact.save_button"
        >
          {updateContact.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Save Changes
        </Button>
      </div>
    </div>
  );
}

// ---------- Main Admin Panel ----------
export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.975 0.005 240)" }}
    >
      <header
        style={{ background: "oklch(0.22 0.06 240)" }}
        className="text-white px-6 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/disha-logo-transparent.dim_120x120.png"
            alt="Logo"
            className="h-8 w-8 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">Admin Panel</p>
            <p className="text-xs text-white/60">
              Disha Institute of Professional Studies
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
            asChild
          >
            <a href="/">View Site</a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
            onClick={() => setIsLoggedIn(false)}
            data-ocid="admin.secondary_button"
          >
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="courses">
          <TabsList className="mb-6 flex flex-wrap gap-1 h-auto">
            <TabsTrigger
              value="courses"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <GraduationCap className="h-4 w-4" /> Courses
            </TabsTrigger>
            <TabsTrigger
              value="notices"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <Bell className="h-4 w-4" /> Notices
            </TabsTrigger>
            <TabsTrigger
              value="alumni"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <Users className="h-4 w-4" /> Alumni
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <UserCheck className="h-4 w-4" /> Students
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <Image className="h-4 w-4" /> Gallery
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <BookOpen className="h-4 w-4" /> About
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <Phone className="h-4 w-4" /> Contact
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="gap-1.5"
              data-ocid="admin.tab"
            >
              <FileText className="h-4 w-4" /> Results
            </TabsTrigger>
          </TabsList>
          <TabsContent value="courses">
            <CoursesTab />
          </TabsContent>
          <TabsContent value="notices">
            <NoticesTab />
          </TabsContent>
          <TabsContent value="alumni">
            <AlumniTab />
          </TabsContent>
          <TabsContent value="students">
            <StudentsTab />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryTab />
          </TabsContent>
          <TabsContent value="about">
            <AboutTab />
          </TabsContent>
          <TabsContent value="contact">
            <ContactTab />
          </TabsContent>
          <TabsContent value="results">
            <ResultsTab />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}
