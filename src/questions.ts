// questions.ts
export type Industry = "Boutique" | "Coffee Shop" | "Legal" | "Dental" | "Art Gallery";

export type Question = {
  id: string;
  label: string;
  type?: "boolean" | "choice";
  weight?: number; // default 1; use 2 for high-impact items (e.g., POS↔Shopify)
  choices?: { value: string; label: string }[];
};

const base: Question[] = [
  { id: "ai_agent", label: "Do you want an AI assistant on your website?" },
  { id: "booking", label: "Do you need online booking or intake forms?" },
  { id: "email_automation", label: "Should follow-up emails/texts be automated?" },
  { id: "urgency", label: "How urgent is your need?", type: "choice",
    choices: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ]
  },
];

const boutiquePlus: Question[] = [
  { id: "pos_sync", label: "Do you need Shopify ↔ POS inventory sync?", weight: 2 },
  { id: "qr_products", label: "Use QR codes for products/promos?" },
];

const coffeePlus: Question[] = [
  { id: "loyalty", label: "Set up loyalty or punch-card automations?" },
  { id: "pos_sync", label: "Do you need Shopify ↔ POS menu/inventory sync?", weight: 2 },
];

const legalPlus: Question[] = [
  { id: "intake", label: "Automate client intake & document collection?" },
  { id: "crm", label: "Track cases in a simple CRM dashboard?" },
];

const dentalPlus: Question[] = [
  { id: "reminders", label: "Appointment reminders & recall automation?" },
  { id: "forms", label: "HIPAA-friendly intake & consent forms?" },
];

const galleryPlus: Question[] = [
  { id: "catalog", label: "Online catalog with inquiry automations?" },
  { id: "events", label: "RSVP/guest-list flows for openings?" },
];

export const QUESTIONS: Record<Industry, Question[]> = {
  "Boutique": [...base, ...boutiquePlus],
  "Coffee Shop": [...base, ...coffeePlus],
  "Legal": [...base, ...legalPlus],
  "Dental": [...base, ...dentalPlus],
  "Art Gallery": [...base, ...galleryPlus],
};
