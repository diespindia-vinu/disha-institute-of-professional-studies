import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface Student {
    resultStatus: string;
    name: string;
    registrationNumber: string;
    fatherName: string;
    address: string;
    batch: string;
    phone: string;
    course: string;
    remarks: string;
}
export interface Alumni {
    id: bigint;
    name: string;
    isActive: boolean;
    organization: string;
    course: string;
}
export interface Course {
    id: bigint;
    duration: string;
    name: string;
    description: string;
    isActive: boolean;
    eligibility: string;
}
export interface Result {
    id: bigint;
    title: string;
    pdfLink: string;
    date: bigint;
    description: string;
    isActive: boolean;
    examType: string;
}
export interface Notice {
    id: bigint;
    title: string;
    content: string;
    date: bigint;
    isActive: boolean;
    category: NoticeCategory;
}
export interface GalleryItem {
    id: bigint;
    title: string;
    blob: ExternalBlob;
    isActive: boolean;
}
export interface ContactInfo {
    email: string;
    address: string;
    phone: string;
}
export enum NoticeCategory {
    examination = "examination",
    admission = "admission",
    general = "general"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addStudent(student: Student): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAlumni(alumniData: Alumni): Promise<bigint>;
    createCourse(course: Course): Promise<bigint>;
    createGalleryItem(title: string, blob: ExternalBlob): Promise<bigint>;
    createNotice(notice: Notice): Promise<bigint>;
    createResult(result: Result): Promise<bigint>;
    deleteAlumni(id: bigint): Promise<void>;
    deleteCourse(id: bigint): Promise<void>;
    deleteGalleryItem(id: bigint): Promise<void>;
    deleteNotice(id: bigint): Promise<void>;
    deleteResult(id: bigint): Promise<void>;
    deleteStudent(registrationNumber: string): Promise<void>;
    getAboutText(): Promise<string>;
    getAllAlumni(): Promise<Array<Alumni>>;
    getAllCourses(): Promise<Array<Course>>;
    getAllGalleryItems(): Promise<Array<GalleryItem>>;
    getAllNotices(): Promise<Array<Notice>>;
    getAllResults(): Promise<Array<Result>>;
    getAllStudents(): Promise<Array<Student>>;
    getAlumni(id: bigint): Promise<Alumni | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<ContactInfo>;
    getCourse(id: bigint): Promise<Course | null>;
    getGalleryItem(id: bigint): Promise<GalleryItem | null>;
    getNotice(id: bigint): Promise<Notice | null>;
    getResult(id: bigint): Promise<Result | null>;
    getStudent(registrationNumber: string): Promise<Student | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAboutText(aboutText: string): Promise<void>;
    updateAlumni(id: bigint, alumniData: Alumni): Promise<void>;
    updateContactInfo(contactInfo: ContactInfo): Promise<void>;
    updateCourse(id: bigint, course: Course): Promise<void>;
    updateGalleryItem(id: bigint, title: string): Promise<void>;
    updateNotice(id: bigint, notice: Notice): Promise<void>;
    updateResult(id: bigint, result: Result): Promise<void>;
    updateStudent(student: Student): Promise<void>;
}
