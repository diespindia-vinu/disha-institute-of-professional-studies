# Disha Institute of Professional Studies

## Current State
Draft expired. Full rebuild required from scratch based on conversation history and project context.

## Requested Changes (Diff)

### Add
- Full institute website matching dipsindia.co.in layout and structure
- Light green color scheme with bold red institute name in header
- Green top bar with contact info (Phone: 7206755141, Email: diespindia@gmail.com)
- Sticky header with navigation: Student Corner, Online Admission, Our Branches
- Hero banner with "Online Admission Form" button
- Courses section: DMLT, BMLT, GNM, Hotel Management, OTT, BSc Nursing, Physiotherapy
- Alumni showcase: Fortis, Apollo, Max Healthcare, Medanta, etc.
- Notice board with General, Examination, Admission tabs
- Gallery section
- Video testimonials section
- Partner recruiters section (12 hospitals/labs)
- About Us section with stats
- Contact section
- Exam Results section on homepage (title, type, date, PDF link) - 3 sample results pre-loaded
- Student search section: search by registration number to view student details
- Admin panel at /admin with username/password login (admin / disha@2024)
- Admin panel tabs: Results, Students, Notice Board, Gallery management
- Student management: add/edit/delete students with registration number, name, father name, course, marks
- Results management: add/edit/delete exam results with title, type, date, PDF link
- 2 sample students: DIES/0279/18-19, DIES/0166/18-19

### Modify
- N/A (fresh rebuild)

### Remove
- N/A (fresh rebuild)

## Implementation Plan
1. Backend: Store results, students, notices in stable vars; CRUD operations; simple admin auth (admin/disha@2024)
2. Frontend: Full homepage with all sections; Admin panel at /admin; Student search; Results display
3. Admin panel: Tabs for Results, Students, Notices with add/edit/delete functionality
4. Pre-seed 3 sample results and 2 sample students
