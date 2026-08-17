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
  caseNo: "CASE FILE NC-11",
  tagline: "Seek truth from evidence.",
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
  /** Set to true to make this button open the 19 per-module files instead of a link */
  openModuleFiles?: boolean;
  /** Set to true to make this button open the 2 recording folders (Diploma / Degree) */
  openRecordings?: boolean;
  /** Set to true to make this button open the 19 per-module assignment folders */
  openAssignments?: boolean;
}

export const driveLinks: DriveLink[] = [
  {
    label: "Lecture Recordings",
    description: "Recorded sessions — split into Diploma and Degree folders.",
    url: "https://drive.google.com/", // ← fallback only; the 2 folders are set below
    icon: "video",
    openRecordings: true, // ← this button opens the 2 recording folders
  },
  {
    label: "Lecture Notes & Slides",
    description: "Slide decks and handouts for all 19 modules — one folder each.",
    url: "https://drive.google.com/", // ← used as fallback if a module below has no link
    icon: "notes",
    openModuleFiles: true, // ← this button opens the 19 module files
  },
  {
    label: "Past Papers",
    description: "Previous exam papers and marking schemes for revision.",
    url: "https://drive.google.com/", // ← PASTE YOUR LINK HERE
    icon: "papers",
  },
  {
    label: "Assignments",
    description: "Assignment folders for all 19 modules — one folder each.",
    url: "https://drive.google.com/", // ← used as fallback if a module below has no link
    icon: "folder",
    openAssignments: true, // ← this button opens the 19 assignment folders
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
//  These appear as 2 buttons inside "Lecture Recordings".
// ═══════════════════════════════════════════════════════════════

export const recordingLinks = [
  {
    label: "Diploma (I / II)",
    description: "Recorded sessions for every I & II Diploma module.",
    url: "https://drive.google.com/drive/folders/1nFEim-ZGFanTz-QwfHcsd4kFqslmcNm5?usp=drive_link",
  },
  {
    label: "Degree (III / IV)",
    description: "Recorded sessions for every III & IV Degree module.",
    url: "https://drive.google.com/drive/folders/1Fhen_PE_-CHxuqWoB6u5AJzF381dYyzY?usp=drive_link",
  },
];

// ═══════════════════════════════════════════════════════════════
//  ★★★  MODULE DRIVE LINKS — one Google Drive folder per module  ★★★
//  Paste the Drive folder link for each module between the quotes.
//  These appear as 19 buttons inside "Lecture Notes & Slides".
// ═══════════════════════════════════════════════════════════════

export const moduleDriveLinks: Record<string, string> = {
  // ── III & IV Degree ──────────────────────────────────────────
  "BCJ 2204.3": "https://drive.google.com/", // Cultural Criminology
  "BCJ 2103.3": "https://drive.google.com/", // Peace Conflict Studies
  "BCJ 2205.3": "https://drive.google.com/drive/folders/1cpmMaHoLiIPVf_ZT7jIcWZ21tBuUds4o", // Criminal Procedure
  "BCJ 2104.3": "https://drive.google.com/", // International Security Studies
  "BCJ 2105.3": "https://drive.google.com/", // Community Policing
  "BCJ 2201.3": "https://drive.google.com/drive/folders/1ZuorPLNZb8jrvNowJkKJiV0VKkl-bX56", // Juvenile Delinquency
  "BCJ 2102.3": "https://drive.google.com/drive/folders/13Xri4X3HuHRPH6ZLDmL7z0OkHtoBzlwf", // Modern Themes of Crime
  "BCJ 2203.3": "https://drive.google.com/", // International Terrorism
  "BCJ 2202.3": "https://drive.google.com/drive/u/2/folders/190VbcjQ8n-8-iuKdFXhrW0baooVQ69te?usp=drive_link", // Drug Abuse
  "BCJ 2101.3": "https://drive.google.com/", // Crime Mapping & Spatial Analysis (GIS)

  // ── I & II Diploma ───────────────────────────────────────────
  "DCRIM 1101.03": "https://drive.google.com/drive/folders/1rZV4X6B8lEAufJBqGF5_P2W-F_gNBkOC", // Forensic Science
  "DCRIM 1102.03": "https://drive.google.com/drive/folders/1FJW6wRujcnkRjRljq4Nq3lQPL7VO6YlP", // Criminal Justice & Victim Protection
  "DCRIM 1103.03": "https://drive.google.com/drive/folders/1iFzm0i54tqsQSo-XZbacMpyDdoYtk5dD", // SOCO Investigation
  "DCRIM 1104.03": "https://drive.google.com/", // Criminal Psychology
  "DCRIM 1105.03": "https://drive.google.com/drive/folders/1hLiUC2ItjKVWATm0yq7tLkOoZfbhEcBU", // Scope of Criminology
  "DCRIM 1201.03": "https://drive.google.com/drive/folders/1IusqZ857ikWV4nSpPVJ3RgfBdgdk4XJM", // Crime and Addiction
  "DCRIM 1202.03": "https://drive.google.com/", // Child, Women Abuse and Crime
  "DCRIM 1203.03": "https://drive.google.com/", // Criminal Law
  "DCRIM 1204.03": "https://drive.google.com/drive/folders/15BnOiSmHtxOWlK9qFNdsLLw8xGSc4-vQ", // Research Methodology I
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  ASSIGNMENT DRIVE LINKS — one folder per module  ★★★
//  Paste the assignment Drive folder link for each module.
//  These appear as 19 buttons inside "Assignments".
// ═══════════════════════════════════════════════════════════════

export const assignmentDriveLinks: Record<string, string> = {
  // ── III & IV Degree ──────────────────────────────────────────
  "BCJ 2204.3": "https://drive.google.com/file/d/1nQqSdM2fpvdxGul6_kvQH2raj4NWgku5/view?usp=sharing", // Cultural Criminology
  "BCJ 2103.3": "https://drive.google.com/file/d/1GLiHEVHT8D3HfduCFgMKPDoZ-Kugp8Y7/view?usp=sharing", // Peace Conflict Studies
  "BCJ 2205.3": "https://drive.google.com/", // Criminal Procedure
  "BCJ 2104.3": "https://drive.google.com/", // International Security Studies
  "BCJ 2105.3": "https://drive.google.com/file/d/1O_fOe7qKSdrybS5AlXfNsmyuJ8m0131m/view?usp=sharing", // Community Policing
  "BCJ 2201.3": "https://drive.google.com/file/d/1rRYJRO5pmcuU1_IHjfBqCrdpWbcOnUqS/view?usp=sharing", // Juvenile Delinquency
  "BCJ 2102.3": "https://drive.google.com/file/d/1GW05RXe_GuX-l2ESoqOxdZWJerJmtLyE/view?usp=sharing", // Modern Themes of Crime
  "BCJ 2203.3": "https://drive.google.com/file/d/1BAzKh1Bzl9fMFVNjPX053FelNAQL3Xay/view?usp=sharing", // International Terrorism
  "BCJ 2202.3": "https://drive.google.com/", // Drug Abuse
  "BCJ 2101.3": "https://drive.google.com/", // Crime Mapping & Spatial Analysis (GIS)

  // ── I & II Diploma ───────────────────────────────────────────
  "DCRIM 1101.03": "https://drive.google.com/", // Forensic Science
  "DCRIM 1102.03": "https://drive.google.com/file/d/1QWUrRWqaIw6__vmd5HZ54JXbgP9XLQij/view?usp=sharing", // Criminal Justice & Victim Protection
  "DCRIM 1103.03": "https://drive.google.com/", // SOCO Investigation
  "DCRIM 1104.03": "https://drive.google.com/file/d/1Yhnl8E8q_cfd_0GgU76KfpVKLnqzSGIZ/view?usp=sharing", // Criminal Psychology
  "DCRIM 1105.03": "https://drive.google.com/file/d/1dKt54--tr03M1f81sADZFrqEQUY9aWGc/view?usp=sharing", // Scope of Criminology
  "DCRIM 1201.03": "https://drive.google.com/file/d/1hwln6nmLwWdNV7C6Y0qESKhUG-7s4sS7/view?usp=drive_link", // Crime and Addiction
  "DCRIM 1202.03": "https://drive.google.com/", // Child, Women Abuse and Crime
  "DCRIM 1203.03": "https://drive.google.com/file/d/1Pc87ZAguuqN8Y_Q_YLi_0nVSX8htqcm5/view?usp=sharing", // Criminal Law
  "DCRIM 1204.03": "https://drive.google.com/file/d/1gqf7kcuCzatpW0bf9HnE3a0SyYA6YMbk/view?usp=drive_link", // Research Methodology I
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  ASSIGNMENT SUBMISSION DEADLINES  ★★★
//  Format: "MM-DD"  (e.g. "08-23" = 23 August)
//  Shown in the Assignments drawer and as a warning panel in the
//  briefing (hero) section. Delete a line to remove a deadline.
// ═══════════════════════════════════════════════════════════════

export const assignmentDueDates: Record<string, string> = {
  "DCRIM 1201.03": "07-26", // Crime and Addiction
  "BCJ 2204.3": "08-29", // Cultural Criminology
  "BCJ 2103.3": "08-29", // Peace Conflict Studies
  "BCJ 2102.3": "08-23", // Modern Themes of Crime
  "DCRIM 1102.03": "08-24", // Criminal Justice & Victim Protection
  "DCRIM 1105.03": "08-25", // Scope of Criminology
  "BCJ 2105.3": "09-01", // Community Policing
  "DCRIM 1204.03": "09-01", // Research Methodology I
  "DCRIM 1104.03": "09-01", // Criminal Psychology
  "BCJ 2201.3": "09-01", // Juvenile Delinquency
  "BCJ 2203.3": "09-01", // International Terrorism
  "DCRIM 1203.03": "09-01", // Criminal Law
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  ASSIGNMENT SUBMISSION LINKS  ★★★
//  Where students SUBMIT each assignment (form / upload folder).
//  Shown as mini "SUBMIT" buttons in the Assignments drawer.
//  Red = no link yet, Gold = linked.
// ═══════════════════════════════════════════════════════════════

export const assignmentSubmissionLinks: Record<string, string> = {
  // ── III & IV Degree ──────────────────────────────────────────
  "BCJ 2204.3": "https://drive.google.com/", // Cultural Criminology
  "BCJ 2103.3": "https://drive.google.com/", // Peace Conflict Studies
  "BCJ 2205.3": "https://drive.google.com/", // Criminal Procedure
  "BCJ 2104.3": "https://drive.google.com/", // International Security Studies
  "BCJ 2105.3": "https://drive.google.com/", // Community Policing
  "BCJ 2201.3": "https://drive.google.com/", // Juvenile Delinquency
  "BCJ 2102.3": "https://drive.google.com/", // Modern Themes of Crime
  "BCJ 2203.3": "https://drive.google.com/", // International Terrorism
  "BCJ 2202.3": "https://drive.google.com/", // Drug Abuse
  "BCJ 2101.3": "https://drive.google.com/", // Crime Mapping & Spatial Analysis (GIS)

  // ── I & II Diploma ───────────────────────────────────────────
  "DCRIM 1101.03": "https://drive.google.com/", // Forensic Science
  "DCRIM 1102.03": "https://forms.gle/ay8mysRid6ZDYdci6", // Criminal Justice & Victim Protection
  "DCRIM 1103.03": "https://drive.google.com/", // SOCO Investigation
  "DCRIM 1104.03": "https://drive.google.com/", // Criminal Psychology
  "DCRIM 1105.03": "https://drive.google.com/", // Scope of Criminology
  "DCRIM 1201.03": "https://drive.google.com/", // Crime and Addiction
  "DCRIM 1202.03": "https://drive.google.com/", // Child, Women Abuse and Crime
  "DCRIM 1203.03": "https://drive.google.com/", // Criminal Law
  "DCRIM 1204.03": "https://drive.google.com/", // Research Methodology I
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  EXTRA MINI BUTTONS ON MODULE ROWS (Lecture Notes)  ★★★
//  Adds a small side button next to a module's button inside the
//  Lecture Notes & Slides drawer. Key = subject code.
//  Add more entries the same way to get extra buttons anywhere.
// ═══════════════════════════════════════════════════════════════

export const moduleSideLinks: Record<string, { label: string; url: string }> = {
  // Add entries here to show mini side buttons on module rows, e.g.:
  // "BCJ 2101.3": { label: "ArcGIS", url: "https://..." },
};

// ═══════════════════════════════════════════════════════════
//  ★★★  SUB-FOLDER PANELS  ★★★
//  When a module listed below is clicked inside Lecture Notes &
//  Slides, a panel opens with THESE buttons instead of a link.
//  Key = subject code. Add / edit / remove entries freely.
// ═══════════════════════════════════════════════════════════

export const moduleSubFolders: Record<string, { label: string; url: string }[]> = {
  "BCJ 2101.3": [
    // Crime Mapping & Spatial Analysis (GIS)
    { label: "Notes", url: "https://drive.google.com/drive/folders/1COL_oXK2g_Gu7m1DeyP8XBLwHeSsDU5g" },
    { label: "ArcGIS", url: "https://drive.google.com/drive/folders/1L034T6DgALXzjkjda7l7XARjxw5bzEhM" },
    { label: "Practical Day 1", url: "https://drive.google.com/drive/folders/1itHbcUFAFl10qDYwzBhUVWglZZAQYdJM" },
    { label: "Practical Day 2", url: "https://drive.google.com/drive/folders/10Pur3I8Es-lGGIWolW3MPKuIb2NCGE_9" },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  ★★★  MODULES WITH NO ASSIGNMENT  ★★★
//  These modules show in ASH grey inside the Assignments drawer
//  (no assignment exists for them, so no link is needed).
// ═══════════════════════════════════════════════════════════════

export const noAssignmentModules: string[] = [
  "BCJ 2205.3", // Criminal Procedure
  "DCRIM 1101.03", // Forensic Science
  "DCRIM 1103.03", // SOCO Investigation
];
