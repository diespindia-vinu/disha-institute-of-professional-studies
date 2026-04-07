import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalBlob, NoticeCategory } from "../backend";
import type {
  Alumni,
  ContactInfo,
  Course,
  GalleryItem,
  Notice,
  Student,
} from "../backend";
import { useActor } from "./useActor";

export { NoticeCategory, ExternalBlob };
export type { Course, Notice, Alumni, GalleryItem, ContactInfo, Student };

const SAMPLE_COURSES: Course[] = [
  {
    id: 1n,
    name: "DMLT",
    duration: "2 Years",
    description:
      "Diploma in Medical Lab Technology. Comprehensive training in laboratory diagnostics and analysis.",
    eligibility: "10+2 with Science",
    isActive: true,
  },
  {
    id: 2n,
    name: "BMLT",
    duration: "3 Years",
    description:
      "Bachelor in Medical Lab Technology. Advanced degree in clinical laboratory sciences.",
    eligibility: "10+2 with PCB",
    isActive: true,
  },
  {
    id: 3n,
    name: "GNM",
    duration: "3.5 Years",
    description:
      "General Nursing & Midwifery. Professional nursing care with clinical training.",
    eligibility: "10+2 with Science",
    isActive: true,
  },
  {
    id: 4n,
    name: "Hotel Management",
    duration: "3 Years",
    description:
      "Comprehensive training in hospitality, food & beverage management, and hotel operations.",
    eligibility: "10+2 any stream",
    isActive: true,
  },
  {
    id: 5n,
    name: "OTT",
    duration: "2 Years",
    description:
      "Operation Theatre Technology. Specialized training for OT assistants and technicians.",
    eligibility: "10+2 with Science",
    isActive: true,
  },
  {
    id: 6n,
    name: "DOTT",
    duration: "1 Year",
    description:
      "Diploma in Operation Theatre Technology. Foundation course in OT procedures.",
    eligibility: "10+2 with Science",
    isActive: true,
  },
  {
    id: 7n,
    name: "BSc Nursing",
    duration: "4 Years",
    description:
      "Bachelor of Science in Nursing. Degree-level nursing education with extensive clinical exposure.",
    eligibility: "10+2 with PCB (min 45%)",
    isActive: true,
  },
  {
    id: 8n,
    name: "Physiotherapy",
    duration: "4.5 Years",
    description:
      "Bachelor of Physiotherapy. Physical rehabilitation and therapeutic exercise training.",
    eligibility: "10+2 with PCB",
    isActive: true,
  },
];

const SAMPLE_ALUMNI: Alumni[] = [
  {
    id: 1n,
    name: "Priya Sharma",
    course: "BMLT",
    organization: "Fortis Hospital, Noida",
    isActive: true,
  },
  {
    id: 2n,
    name: "Rahul Verma",
    course: "DMLT",
    organization: "Apollo Diagnostics, Delhi",
    isActive: true,
  },
  {
    id: 3n,
    name: "Anjali Gupta",
    course: "GNM",
    organization: "Max Healthcare, Gurgaon",
    isActive: true,
  },
  {
    id: 4n,
    name: "Sanjay Yadav",
    course: "OTT",
    organization: "Medanta Hospital, Gurgaon",
    isActive: true,
  },
  {
    id: 5n,
    name: "Neha Singh",
    course: "BSc Nursing",
    organization: "Kailash Hospital, Delhi",
    isActive: true,
  },
  {
    id: 6n,
    name: "Amit Kumar",
    course: "Physiotherapy",
    organization: "Yatharth Hospital, Noida",
    isActive: true,
  },
];

const SAMPLE_NOTICES: Notice[] = [
  {
    id: 1n,
    title: "Admissions Open for 2025-26",
    content:
      "Applications are now open for all courses for the academic year 2025-26. Limited seats available. Apply before 31st July 2025.",
    date: BigInt(Date.now()),
    category: NoticeCategory.general,
    isActive: true,
  },
  {
    id: 2n,
    title: "End Semester Examination Schedule",
    content:
      "End semester examinations for all courses will be held from 15th May to 30th May 2025. Admit cards available from the office.",
    date: BigInt(Date.now() - 86400000),
    category: NoticeCategory.examination,
    isActive: true,
  },
  {
    id: 3n,
    title: "New Batch Starting for DMLT",
    content:
      "A new batch for DMLT course is starting on 1st June 2025. Interested candidates should register immediately.",
    date: BigInt(Date.now() - 172800000),
    category: NoticeCategory.admission,
    isActive: true,
  },
];

export function useGetAllCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return SAMPLE_COURSES;
      const result = await actor.getAllCourses();
      return result.length > 0 ? result : SAMPLE_COURSES;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_COURSES,
  });
}

export function useGetAllNotices() {
  const { actor, isFetching } = useActor();
  return useQuery<Notice[]>({
    queryKey: ["notices"],
    queryFn: async () => {
      if (!actor) return SAMPLE_NOTICES;
      const result = await actor.getAllNotices();
      return result.length > 0 ? result : SAMPLE_NOTICES;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_NOTICES,
  });
}

export function useGetAllAlumni() {
  const { actor, isFetching } = useActor();
  return useQuery<Alumni[]>({
    queryKey: ["alumni"],
    queryFn: async () => {
      if (!actor) return SAMPLE_ALUMNI;
      const result = await actor.getAllAlumni();
      return result.length > 0 ? result : SAMPLE_ALUMNI;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_ALUMNI,
  });
}

export function useGetAllGalleryItems() {
  const { actor, isFetching } = useActor();
  return useQuery<GalleryItem[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGalleryItems();
    },
    enabled: !isFetching,
  });
}

export function useGetAboutText() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["aboutText"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getAboutText();
    },
    enabled: !isFetching,
  });
}

export function useGetContactInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactInfo>({
    queryKey: ["contactInfo"],
    queryFn: async () => {
      if (!actor)
        return {
          phone: "7206755141",
          email: "diespindia@gmail.com",
          address:
            "B-38, Pratap Nagar, Main Market Acharya Niketan, Mayur Vihar Phase-1, Delhi-91",
        };
      const result = await actor.getContactInfo();
      return result.phone
        ? result
        : {
            phone: "7206755141",
            email: "diespindia@gmail.com",
            address:
              "B-38, Pratap Nagar, Main Market Acharya Niketan, Mayur Vihar Phase-1, Delhi-91",
          };
    },
    enabled: !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !isFetching,
  });
}

// ---- Student Queries ----
export function useGetAllStudents() {
  const { actor, isFetching } = useActor();
  return useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudents();
    },
    enabled: !isFetching,
  });
}

export function useAddStudent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (student: Student) => actor!.addStudent(student),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useUpdateStudent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (student: Student) => actor!.updateStudent(student),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useDeleteStudent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (registrationNumber: string) =>
      actor!.deleteStudent(registrationNumber),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

// ---- Mutations ----
export function useCreateCourse() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (course: Course) => actor!.createCourse(course),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useUpdateCourse() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, course }: { id: bigint; course: Course }) =>
      actor!.updateCourse(id, course),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useDeleteCourse() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteCourse(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useCreateNotice() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notice: Notice) => actor!.createNotice(notice),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notices"] }),
  });
}

export function useUpdateNotice() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, notice }: { id: bigint; notice: Notice }) =>
      actor!.updateNotice(id, notice),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notices"] }),
  });
}

export function useDeleteNotice() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteNotice(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notices"] }),
  });
}

export function useCreateAlumni() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (alumniData: Alumni) => actor!.createAlumni(alumniData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alumni"] }),
  });
}

export function useUpdateAlumni() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, alumniData }: { id: bigint; alumniData: Alumni }) =>
      actor!.updateAlumni(id, alumniData),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alumni"] }),
  });
}

export function useDeleteAlumni() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteAlumni(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["alumni"] }),
  });
}

export function useCreateGalleryItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ title, blob }: { title: string; blob: ExternalBlob }) =>
      actor!.createGalleryItem(title, blob),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
}

export function useDeleteGalleryItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => actor!.deleteGalleryItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["gallery"] }),
  });
}

export function useUpdateAboutText() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (text: string) => actor!.updateAboutText(text),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aboutText"] }),
  });
}

export function useUpdateContactInfo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (info: ContactInfo) => actor!.updateContactInfo(info),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contactInfo"] }),
  });
}

// ---- Results ----
export interface Result {
  id: bigint;
  title: string;
  examType: string;
  date: bigint;
  pdfLink: string;
  description: string;
  isActive: boolean;
}

const SAMPLE_RESULTS: Result[] = [
  {
    id: 1n,
    title: "DMLT Semester 1 Results - 2024",
    examType: "Semester",
    date: BigInt(Date.now() - 86400000 * 10),
    pdfLink: "#",
    description:
      "Results declared for DMLT Semester 1. Students can check their scores below.",
    isActive: true,
  },
  {
    id: 2n,
    title: "BMLT Annual Exam Results - 2024",
    examType: "Annual",
    date: BigInt(Date.now() - 86400000 * 20),
    pdfLink: "#",
    description:
      "Annual examination results for BMLT batch 2024 have been published.",
    isActive: true,
  },
  {
    id: 3n,
    title: "GNM Final Year Results - 2024",
    examType: "Semester",
    date: BigInt(Date.now() - 86400000 * 5),
    pdfLink: "#",
    description: "Final year results for GNM students are now available.",
    isActive: true,
  },
];

export function useGetAllResults() {
  const { actor, isFetching } = useActor();
  return useQuery<Result[]>({
    queryKey: ["results"],
    queryFn: async () => {
      if (!actor) return SAMPLE_RESULTS;
      const result = await (actor as any).getAllResults();
      return result.length > 0 ? result : SAMPLE_RESULTS;
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_RESULTS,
  });
}

export function useCreateResult() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (result: Result) => (actor as any).createResult(result),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["results"] }),
  });
}

export function useUpdateResult() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, result }: { id: bigint; result: Result }) =>
      (actor as any).updateResult(id, result),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["results"] }),
  });
}

export function useDeleteResult() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: bigint) => (actor as any).deleteResult(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["results"] }),
  });
}
