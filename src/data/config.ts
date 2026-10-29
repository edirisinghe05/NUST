// ═══════════════════════════════════════════════════════════════
//  ★★★  CUSTOMIZE YOUR SITE HERE  ★★★
//  This is the ONLY file you need to edit.
//
//  1. Replace each `url` below with YOUR Google Drive link.
//  2. Change the label / description / icon to whatever you like.
//  3. Add a new block to add a button, delete a block to remove one.
//     The page updates automatically — no other changes needed.
//
//  Available icons: "video" | "notes" | "papers" | "folder"
//                   "book" | "photos" | "form" | "sheet"
// ═══════════════════════════════════════════════════════════════

export const site = {
  teamName: "NUST Criminology",
  batch: "11th Batch",
  semester: "V & VI Degree",
  caseNo: "CASE FILE NC-11",
  tagline: "Semester V & VI Degree. Seek truth from evidence.",
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  OFFICIAL PORTALS  ★★★
//  The 2 big buttons shown above the Evidence Locker.
// ═══════════════════════════════════════════════════════════════

export const portalLinks = [
  {
    label: "Eurasian Campus Sri Lanka",
    description: "Official campus website",
    url: "https://eurasiancampus.edu.lk/",
  },
  {
    label: "Student Portal Login",
    description: "Sign in to your student account",
    url: "https://studentportal.eurasiancampus.edu.lk/",
  },
];

export type DriveIcon =
  | "video"
  | "notes"
  | "papers"
  | "folder"
  | "book"
  | "photos"
  | "form"
  | "sheet";

export interface DriveLink {
  label: string;
  description: string;
  url: string; // ← paste your Google Drive link between the quotes
  icon: DriveIcon;
  /** Set to true to make this button open the per-module files instead of a link */
  openModuleFiles?: boolean;
  /** Set to true to make this button open the recording folders */
  openRecordings?: boolean;
  /** Set to true to make this button open the per-module assignment folders */
  openAssignments?: boolean;
}

export const driveLinks: DriveLink[] = [
  {
    label: "Lecture Recordings",
    description: "Recorded sessions for V & VI Degree.",
    url: "https://drive.google.com/", // ← fallback only; the 2 folders are set below
    icon: "video",
    openRecordings: true, // ← this button opens the 2 recording folders
  },
  {
    label: "Lecture Notes & Slides",
    description: "Slide decks and handouts for every V & VI Degree module.",
    url: "https://drive.google.com/", // ← used as fallback if a module below has no link
    icon: "notes",
    openModuleFiles: true, // ← this button opens the module files
  },
  {
    label: "Past Papers",
    description: "Previous exam papers and marking schemes for revision.",
    url: "https://drive.google.com/", // ← PASTE YOUR LINK HERE
    icon: "papers",
  },
  {
    label: "Assignments",
    description: "Assignment folders for every V & VI Degree module.",
    url: "https://drive.google.com/", // ← used as fallback if a module below has no link
    icon: "folder",
    openAssignments: true, // ← this button opens the assignment folders
  },
  {
    label: "Research Library",
    description: "Journals, articles and reference material for research work.",
    url: "https://drive.google.com/drive/folders/1JYJswkt2_yrfoEWAEbhxRzet7cd_5Qws?usp=sharing",
    icon: "book",
  },
  {
    label: "Batch Gallery",
    description: "Photos from batch events, field visits and celebrations.",
    url: "https://drive.google.com/", // ← PASTE YOUR LINK HERE
    icon: "photos",
  },
];

// ═══════════════════════════════════════════════════════════════
//  ★★★  LECTURE RECORDING FOLDERS  ★★★
//  These appear as buttons inside "Lecture Recordings".
// ═══════════════════════════════════════════════════════════════

export const recordingLinks = [
  {
    label: "V & VI Degree",
    description: "Recorded sessions for every V & VI Degree module.",
    url: "https://drive.google.com/", // ← PASTE YOUR LINK HERE
  },
];

// ═══════════════════════════════════════════════════════════════
//  ★★★  MODULE DRIVE LINKS — one Google Drive folder per module  ★★★
//  Paste the Drive folder link for each module between the quotes.
//  These appear as buttons inside "Lecture Notes & Slides".
// ═══════════════════════════════════════════════════════════════

export const moduleDriveLinks: Record<string, string> = {
  // ── V & VI Degree ──────────────────────────────────────────
  "BCJ 2101.03": "https://drive.google.com/drive/folders/1YISsh6qcLfkQ-V4MEEP0sPzeEgnQuVtH?usp=drive_link", // Advanced Criminology
  "BCJ 2104.03": "https://drive.google.com/drive/folders/16HIi2_7KNFY-TyLcIGvEpVhLWLr5xWm4", // Criminal Justice
  "BCJ 2102.03": "https://drive.google.com/", // Law Enforcement Agencies
  "BCJ 2205.03": "https://drive.google.com/", // Physical Security Management
  "BCJ 2105.03": "https://drive.google.com/", // Criminal Statistic
  "BCJ 2201.03": "https://drive.google.com/drive/folders/1TR0XpSn2Uo82ErIPICvNr7cbwSYDPnLO?usp=drive_link", // Comparative Criminal Justice Systems
  "BCJ 2202.03": "https://drive.google.com/drive/folders/1Mw1nUsU5AZzwxqqaTqdM7t1Bk68rEV46?usp=drive_link", // Correction and Rehabilitation
  "BCJ 2103.03": "https://drive.google.com/", // Criminal Law II
  "BCJ 2204.03": "https://drive.google.com/drive/folders/1ePt7tpQ_8A674fXPPr05KAZTHGYH8qdg?usp=drive_link", // Disaster Management
  "BCJ 2203.03": "https://drive.google.com/", // Academic Writing
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  ASSIGNMENT DRIVE LINKS — one folder per module  ★★★
//  Paste the assignment Drive folder link for each module.
//  These appear as buttons inside "Assignments".
// ═══════════════════════════════════════════════════════════════

export const assignmentDriveLinks: Record<string, string> = {
  // ── V & VI Degree ──────────────────────────────────────────
  "BCJ 2101.03": "https://drive.google.com/", // Advanced Criminology
  "BCJ 2104.03": "https://drive.google.com/", // Criminal Justice
  "BCJ 2102.03": "https://drive.google.com/", // Law Enforcement Agencies
  "BCJ 2205.03": "https://drive.google.com/", // Physical Security Management
  "BCJ 2105.03": "https://drive.google.com/", // Criminal Statistic
  "BCJ 2201.03": "https://drive.google.com/file/d/1vk0H-zJWtU16PSmnFYJGM23KA9p0syiU/view?usp=drive_link", // Comparative Criminal Justice Systems
  "BCJ 2202.03": "https://drive.google.com/file/d/1cqTuPgUPY5c1nYTXNcnyp1qdye_OP1IA/view?usp=drive_link", // Correction and Rehabilitation
  "BCJ 2103.03": "https://drive.google.com/", // Criminal Law II
  "BCJ 2204.03": "https://drive.google.com/", // Disaster Management
  "BCJ 2203.03": "https://drive.google.com/", // Academic Writing
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  ASSIGNMENT SUBMISSION DEADLINES  ★★★
//  Format: "MM-DD"  (e.g. "08-23" = 23 August)
//  Shown in the Assignments drawer and as a warning panel in the
//  briefing (hero) section. Delete a line to remove a deadline.
// ═══════════════════════════════════════════════════════════════

export const assignmentDueDates: Record<string, string> = {
  "BCJ 2201.03": "11-20", // Comparative Criminal Justice Systems
  "BCJ 2202.03": "11-24", // Correction and Rehabilitation
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  ASSIGNMENT SUBMISSION LINKS  ★★★
//  Where students SUBMIT each assignment (form / upload folder).
//  Shown as mini "SUBMIT" buttons in the Assignments drawer.
//  Red = no link yet, Gold = linked.
// ═══════════════════════════════════════════════════════════════

export const assignmentSubmissionLinks: Record<string, string> = {
  // ── V & VI Degree ──────────────────────────────────────────
  "BCJ 2101.03": "https://drive.google.com/", // Advanced Criminology
  "BCJ 2104.03": "https://drive.google.com/", // Criminal Justice
  "BCJ 2102.03": "https://drive.google.com/", // Law Enforcement Agencies
  "BCJ 2205.03": "https://drive.google.com/", // Physical Security Management
  "BCJ 2105.03": "https://drive.google.com/", // Criminal Statistic
  "BCJ 2201.03": "https://drive.google.com/", // Comparative Criminal Justice Systems
  "BCJ 2202.03": "https://forms.gle/6TnECzopnST1ujfi8", // Correction and Rehabilitation
  "BCJ 2103.03": "https://drive.google.com/", // Criminal Law II
  "BCJ 2204.03": "https://drive.google.com/", // Disaster Management
  "BCJ 2203.03": "https://drive.google.com/", // Academic Writing
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  EXTRA MINI BUTTONS ON MODULE ROWS (Lecture Notes)  ★★★
//  Adds a small side button next to a module's button inside the
//  Lecture Notes & Slides drawer. Key = subject code.
//  Add more entries the same way to get extra buttons anywhere.
// ═══════════════════════════════════════════════════════════════

export const moduleSideLinks: Record<string, { label: string; url: string }> = {
  // Add entries here to show mini side buttons on module rows, e.g.:
  // "BCJ 2101.03": { label: "Extra", url: "https://..." },
};

// ═══════════════════════════════════════════════════════════
//  ★★★  SUB-FOLDER PANELS  ★★★
//  When a module listed below is clicked inside Lecture Notes &
//  Slides, a panel opens with THESE buttons instead of a link.
//  Key = subject code. Add / edit / remove entries freely.
// ═══════════════════════════════════════════════════════════

export const moduleSubFolders: Record<string, { label: string; url: string }[]> = {
  // Add entries here if a module should open several folders instead of one link.
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  MODULES WITH NO ASSIGNMENT  ★★★
//  These modules show in ASH grey inside the Assignments drawer
//  (no assignment exists for them, so no link is needed).
// ═══════════════════════════════════════════════════════════════

export const noAssignmentModules: string[] = [
  "BCJ 2104.03", // Criminal Justice
  "BCJ 2102.03", // Law Enforcement Agencies
];
