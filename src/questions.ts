export interface Question {
  id: string
  text: string
  description?: string
  weight?: number // Default is 1, but some questions can be worth 2 points
}

export const questions: Record<string, Question[]> = {
  "Boutique": [
    {
      id: "boutique-inventory",
      text: "Do you manually track inventory across multiple locations?",
      description: "Managing stock levels, transfers, and reorders manually",
      weight: 2
    },
    {
      id: "boutique-customer-data",
      text: "Do you struggle to keep track of customer preferences and purchase history?",
      description: "Difficulty personalizing service and recommendations"
    },
    {
      id: "boutique-social-media",
      text: "Do you spend hours each week posting on social media?",
      description: "Manual posting, responding to comments, and content creation"
    },
    {
      id: "boutique-appointments",
      text: "Do customers often call to check availability or book appointments?",
      description: "Phone-based scheduling that interrupts other work"
    },
    {
      id: "boutique-suppliers",
      text: "Do you manually contact suppliers for reorders and price updates?",
      description: "Email chains and phone calls for procurement"
    },
    {
      id: "boutique-analytics",
      text: "Do you wish you had better insights into your best-selling items and trends?",
      description: "Difficulty identifying patterns in sales data"
    }
  ],
  
  "Coffee Shop": [
    {
      id: "coffee-orders",
      text: "Do you take orders manually during busy periods?",
      description: "Handwritten orders or basic POS without automation",
      weight: 2
    },
    {
      id: "coffee-inventory",
      text: "Do you manually track coffee bean inventory and supplies?",
      description: "Checking stock levels and reordering supplies manually"
    },
    {
      id: "coffee-loyalty",
      text: "Do you use punch cards or manual systems for customer loyalty?",
      description: "Paper-based or manual tracking of repeat customers"
    },
    {
      id: "coffee-scheduling",
      text: "Do you manually create staff schedules each week?",
      description: "Time-consuming scheduling without considering peak hours"
    },
    {
      id: "coffee-social",
      text: "Do you struggle to maintain consistent social media presence?",
      description: "Irregular posting about daily specials and events"
    },
    {
      id: "coffee-feedback",
      text: "Do you want better ways to collect and respond to customer feedback?",
      description: "Limited insight into customer satisfaction"
    },
    {
      id: "coffee-promotions",
      text: "Do you manually manage daily specials and promotions?",
      description: "Updating prices and promotions across multiple platforms"
    }
  ],
  
  "Legal": [
    {
      id: "legal-documents",
      text: "Do you spend significant time on repetitive document creation?",
      description: "Contracts, letters, and forms that follow similar patterns",
      weight: 2
    },
    {
      id: "legal-scheduling",
      text: "Do clients frequently call to schedule or reschedule appointments?",
      description: "Phone tag and manual calendar management"
    },
    {
      id: "legal-billing",
      text: "Do you manually track billable hours and create invoices?",
      description: "Time tracking and invoice generation taking significant effort"
    },
    {
      id: "legal-client-intake",
      text: "Do you collect client information through paper forms or lengthy calls?",
      description: "Manual data entry and information gathering"
    },
    {
      id: "legal-case-updates",
      text: "Do clients frequently call asking for case status updates?",
      description: "Repetitive status inquiries interrupting focused work"
    },
    {
      id: "legal-research",
      text: "Do you spend hours on routine legal research tasks?",
      description: "Repetitive research that could be streamlined"
    }
  ],
  
  "Dental": [
    {
      id: "dental-appointments",
      text: "Do patients frequently call to schedule, cancel, or reschedule appointments?",
      description: "High volume of scheduling calls disrupting patient care",
      weight: 2
    },
    {
      id: "dental-reminders",
      text: "Do you manually send appointment reminders to patients?",
      description: "Phone calls or manual messages for upcoming appointments"
    },
    {
      id: "dental-insurance",
      text: "Do you spend significant time verifying insurance benefits?",
      description: "Manual insurance verification and pre-authorization processes"
    },
    {
      id: "dental-follow-up",
      text: "Do you struggle to consistently follow up with patients after procedures?",
      description: "Post-treatment care instructions and check-ins"
    },
    {
      id: "dental-recalls",
      text: "Do you manually track and contact patients for routine cleanings?",
      description: "6-month recall systems managed manually"
    },
    {
      id: "dental-forms",
      text: "Do patients fill out paper forms in your waiting room?",
      description: "Manual data entry from paper intake forms"
    },
    {
      id: "dental-billing",
      text: "Do you manually process insurance claims and patient billing?",
      description: "Time-consuming billing and claims management"
    }
  ],
  
  "Art Gallery": [
    {
      id: "gallery-inventory",
      text: "Do you manually track artwork locations, sales, and availability?",
      description: "Spreadsheets or paper records for piece management",
      weight: 2
    },
    {
      id: "gallery-events",
      text: "Do you manually manage event RSVPs and guest communications?",
      description: "Email lists and manual event coordination"
    },
    {
      id: "gallery-artist-relations",
      text: "Do you struggle to keep artists updated on their piece performance?",
      description: "Manual reporting to artists about sales and interest"
    },
    {
      id: "gallery-pricing",
      text: "Do you manually update pricing across your website and materials?",
      description: "Multiple platforms requiring individual price updates"
    },
    {
      id: "gallery-collectors",
      text: "Do you want better ways to match collectors with relevant new pieces?",
      description: "Manual outreach based on collector preferences"
    },
    {
      id: "gallery-social",
      text: "Do you spend significant time posting artwork and updates on social media?",
      description: "Manual content creation and posting across platforms"
    }
  ]
}