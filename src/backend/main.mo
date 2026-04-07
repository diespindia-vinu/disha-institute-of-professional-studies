import Map "mo:core/Map";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";


import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

// Use migration to convert previous actor's state on upgrade

actor {
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Persistent Data Structures
  let notices = Map.empty<Nat, Notice>();
  let courses = Map.empty<Nat, Course>();
  let alumni = Map.empty<Nat, Alumni>();
  let galleryItems = Map.empty<Nat, GalleryItem>();
  let results = Map.empty<Nat, Result>();
  let students = Map.empty<Text, Student>(); // Use registrationNumber as key
  var nextNoticeId = 1;
  var nextCourseId = 1;
  var nextAlumniId = 1;
  var nextGalleryId = 1;
  var nextResultId = 1;

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Static Data
  public type Student = {
    registrationNumber : Text;
    name : Text;
    fatherName : Text;
    course : Text;
    batch : Text;
    phone : Text;
    address : Text;
    resultStatus : Text;
    remarks : Text;
  };

  public type NoticeCategory = {
    #general;
    #examination;
    #admission;
  };

  public type Course = {
    id : Nat;
    name : Text;
    duration : Text;
    description : Text;
    eligibility : Text;
    isActive : Bool;
  };

  public type Alumni = {
    id : Nat;
    name : Text;
    course : Text;
    organization : Text;
    isActive : Bool;
  };

  public type GalleryItem = {
    id : Nat;
    title : Text;
    blob : Storage.ExternalBlob;
    isActive : Bool;
  };

  public type ContactInfo = {
    address : Text;
    phone : Text;
    email : Text;
  };

  public type SiteSettings = {
    contactInfo : ContactInfo;
    aboutText : Text;
  };

  public type Notice = {
    id : Nat;
    title : Text;
    content : Text;
    category : NoticeCategory;
    date : Int;
    isActive : Bool;
  };

  public type Result = {
    id : Nat;
    title : Text;
    examType : Text;
    date : Int;
    pdfLink : Text;
    description : Text;
    isActive : Bool;
  };

  module Notice {
    public func compare(notice1 : Notice, notice2 : Notice) : Order.Order {
      Int.compare(notice2.date, notice1.date);
    };
  };

  module Result {
    public func compare(r1 : Result, r2 : Result) : Order.Order {
      Int.compare(r2.date, r1.date);
    };
  };

  var siteSettings = {
    contactInfo = {
      address = "B-38, Pratap Nagar, Main Market Acharya Niketan, Mayur Vihar Phase-1, Delhi-91";
      phone = "7206755141";
      email = "diespindia@gmail.com";
    };
    aboutText = "Disha Institute of Professional Studies is a leading educational institution...";
  };

  // Sample student records
  let sampleStudents : [(Text, Student)] = [
    (
      "DIES/0279/18-19",
      {
        registrationNumber = "DIES/0279/18-19";
        name = "Mithlesh Sharma";
        fatherName = "Sanjay Sharma";
        course = "DMLT";
        batch = "2018-19";
        phone = "8178360729";
        address = "3/7 Rajendra Park, Nangloi, Delhi-41";
        resultStatus = "Pass";
        remarks = "First Divison";
      },
    ),
    (
      "DIES/0166/18-19",
      {
        registrationNumber = "DIES/0166/18-19";
        name = "Rahul Kumar";
        fatherName = "Krishan Kumar";
        course = "DLMT";
        batch = "2018-19";
        phone = "9136035613";
        address = "G-2, Mohan Garden, Uttam Nagar, Delhi-59";
        resultStatus = "Pass";
        remarks = "Second Division";
      },
    ),
  ];

  // Seed sample students
  do {
    for ((key, student) in sampleStudents.vals()) {
      students.add(key, student);
    };
  };

  // Seed sample results
  do {
    let sampleResults : [(Nat, Result)] = [
      (1, { id = 1; title = "DMLT 1st Year Annual Exam 2024"; examType = "Annual"; date = 1711929600000000000; pdfLink = "#"; description = "Result declared for DMLT 1st Year students. All students can check their marks below."; isActive = true }),
      (2, { id = 2; title = "GNM 2nd Year Semester Exam 2024"; examType = "Semester"; date = 1714608000000000000; pdfLink = "#"; description = "GNM 2nd Year Semester results are now available. Contact office for marksheet."; isActive = true }),
      (3, { id = 3; title = "BMLT Final Year Exam 2024"; examType = "Annual"; date = 1717200000000000000; pdfLink = "#"; description = "BMLT Final Year exam results declared. Congratulations to all passed students!"; isActive = true }),
    ];
    for ((id, r) in sampleResults.vals()) {
      results.add(id, r);
    };
    nextResultId := 4;
  };

  // Seed sample notices
  do {
    let sampleNotices : [(Nat, Notice)] = [
      (1, { id = 1; title = "Admission Open 2024-25"; content = "Admissions are open for all courses for the academic year 2024-25. Apply now and secure your future!"; category = #admission; date = 1706745600000000000; isActive = true }),
      (2, { id = 2; title = "Examination Schedule Released"; content = "The examination schedule for all courses has been released. Students are advised to check the timetable and prepare accordingly."; category = #examination; date = 1709424000000000000; isActive = true }),
      (3, { id = 3; title = "Campus Holiday Notice"; content = "The institute will remain closed on account of national holidays. Students are advised to plan accordingly."; category = #general; date = 1712016000000000000; isActive = true }),
    ];
    for ((id, n) in sampleNotices.vals()) {
      notices.add(id, n);
    };
    nextNoticeId := 4;
  };

  // Notices
  public shared func createNotice(notice : Notice) : async Nat {
    let newNotice = {
      notice with
      id = nextNoticeId;
      date = Time.now();
    };
    notices.add(nextNoticeId, newNotice);
    nextNoticeId += 1;
    newNotice.id;
  };

  public shared func updateNotice(id : Nat, notice : Notice) : async () {
    if (not notices.containsKey(id)) { Runtime.trap("Notice not found") };
    let updatedNotice = {
      notice with
      id;
      date = Time.now();
    };
    notices.add(id, updatedNotice);
  };

  public shared func deleteNotice(id : Nat) : async () {
    if (not notices.containsKey(id)) { Runtime.trap("Notice not found") };
    notices.remove(id);
  };

  public query func getNotice(id : Nat) : async ?Notice {
    notices.get(id);
  };

  public query func getAllNotices() : async [Notice] {
    notices.values().toArray().sort();
  };

  // Courses
  public shared func createCourse(course : Course) : async Nat {
    let newCourse = {
      course with
      id = nextCourseId;
    };
    courses.add(nextCourseId, newCourse);
    nextCourseId += 1;
    newCourse.id;
  };

  public shared func updateCourse(id : Nat, course : Course) : async () {
    if (not courses.containsKey(id)) { Runtime.trap("Course not found") };
    let updatedCourse = {
      course with
      id;
    };
    courses.add(id, updatedCourse);
  };

  public shared func deleteCourse(id : Nat) : async () {
    if (not courses.containsKey(id)) { Runtime.trap("Course not found") };
    courses.remove(id);
  };

  public query func getCourse(id : Nat) : async ?Course {
    courses.get(id);
  };

  public query func getAllCourses() : async [Course] {
    courses.values().toArray();
  };

  // Alumni
  public shared func createAlumni(alumniData : Alumni) : async Nat {
    let newAlumni = {
      alumniData with
      id = nextAlumniId;
    };
    alumni.add(nextAlumniId, newAlumni);
    nextAlumniId += 1;
    newAlumni.id;
  };

  public shared func updateAlumni(id : Nat, alumniData : Alumni) : async () {
    if (not alumni.containsKey(id)) { Runtime.trap("Alumni not found") };
    let updatedAlumni = {
      alumniData with
      id;
    };
    alumni.add(id, updatedAlumni);
  };

  public shared func deleteAlumni(id : Nat) : async () {
    if (not alumni.containsKey(id)) { Runtime.trap("Alumni not found") };
    alumni.remove(id);
  };

  public query func getAlumni(id : Nat) : async ?Alumni {
    alumni.get(id);
  };

  public query func getAllAlumni() : async [Alumni] {
    alumni.values().toArray();
  };

  // Gallery Items
  public shared func createGalleryItem(title : Text, blob : Storage.ExternalBlob) : async Nat {
    let newItem = {
      id = nextGalleryId;
      title;
      blob;
      isActive = true;
    };
    galleryItems.add(nextGalleryId, newItem);
    nextGalleryId += 1;
    newItem.id;
  };

  public shared func updateGalleryItem(id : Nat, title : Text) : async () {
    switch (galleryItems.get(id)) {
      case (null) { Runtime.trap("Gallery item not found") };
      case (?item) {
        let updatedItem = {
          item with
          title;
        };
        galleryItems.add(id, updatedItem);
      };
    };
  };

  public shared func deleteGalleryItem(id : Nat) : async () {
    if (not galleryItems.containsKey(id)) { Runtime.trap("Gallery item not found") };
    galleryItems.remove(id);
  };

  public query func getGalleryItem(id : Nat) : async ?GalleryItem {
    galleryItems.get(id);
  };

  public query func getAllGalleryItems() : async [GalleryItem] {
    galleryItems.values().toArray();
  };

  // Results
  public shared func createResult(result : Result) : async Nat {
    let newResult = {
      result with
      id = nextResultId;
      date = Time.now();
    };
    results.add(nextResultId, newResult);
    nextResultId += 1;
    newResult.id;
  };

  public shared func updateResult(id : Nat, result : Result) : async () {
    if (not results.containsKey(id)) { Runtime.trap("Result not found") };
    let updatedResult = {
      result with
      id;
    };
    results.add(id, updatedResult);
  };

  public shared func deleteResult(id : Nat) : async () {
    if (not results.containsKey(id)) { Runtime.trap("Result not found") };
    results.remove(id);
  };

  public query func getResult(id : Nat) : async ?Result {
    results.get(id);
  };

  public query func getAllResults() : async [Result] {
    results.values().toArray().sort();
  };

  // Site Settings
  public shared func updateContactInfo(contactInfo : ContactInfo) : async () {
    siteSettings := {
      siteSettings with
      contactInfo;
    };
  };

  public shared func updateAboutText(aboutText : Text) : async () {
    siteSettings := {
      siteSettings with
      aboutText;
    };
  };

  public query func getContactInfo() : async ContactInfo {
    siteSettings.contactInfo;
  };

  public query func getAboutText() : async Text {
    siteSettings.aboutText;
  };

  // Student Management Functions

  public shared func addStudent(student : Student) : async () {
    if (students.containsKey(student.registrationNumber)) {
      Runtime.trap("Student with this registration number already exists");
    };
    students.add(student.registrationNumber, student);
  };

  public shared func updateStudent(student : Student) : async () {
    if (not students.containsKey(student.registrationNumber)) {
      Runtime.trap("Student not found");
    };
    students.add(student.registrationNumber, student);
  };

  public shared func deleteStudent(registrationNumber : Text) : async () {
    if (not students.containsKey(registrationNumber)) {
      Runtime.trap("Student not found");
    };
    students.remove(registrationNumber);
  };

  public query func getStudent(registrationNumber : Text) : async ?Student {
    students.get(registrationNumber);
  };

  public query func getAllStudents() : async [Student] {
    students.values().toArray();
  };

};
