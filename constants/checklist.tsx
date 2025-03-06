import { Blocks, DollarSign, FileText, MonitorPlay, Target, Upload, UserPlus } from 'lucide-react';

export interface ChecklistItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  primaryButton: string;
  secondaryButton?: string;
  completed: boolean;
  status: "Incomplete" | "Completed";
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    title: "Learn How to Use TCSG Academy",
    icon: <MonitorPlay className="h-12 w-12" />,
    description:
      "Watch this quick tutorial to unlock the full benefits of TCSG Academy!",
    primaryButton: "Watch Now",
    completed: false,
    status: "Incomplete",
  },
  {
    title: "Personal Information",
    icon: <UserPlus className="h-12 w-12" />,
    description:
      "Your profile is complete! TCSG Academy will auto-fill your dispute letters with the correct details, making the process seamless.",
    primaryButton: "Update Info",
    secondaryButton: "Tutorial",
    completed: false,
    status: "Incomplete",
  },
  {
    title: "Upload Credit Report",
    icon: <Upload className="h-12 w-12" />,
    description:
      "TCSG Academy AI has analyzed your report and generated insights. Check out your personalized Credit Analysis Report for next steps.",
    primaryButton: "Update Report",
    secondaryButton: "Tutorial",
    completed: false,
    status: "Incomplete",
  },
  {
    title: "Set Your Credit Score Goals",
    icon: <Target className="h-12 w-12" />,
    description:
      "We've customized your experience based on your goals. Update them anytime to stay on track with your credit journey.",
    primaryButton: "Update Goals",
    completed: false,
    status: "Incomplete",
  },
  {
    title: "Digital Signature",
    icon: <FileText className="h-12 w-12" />,
    description:
      "Your signature secures your disputes and ensures your Declaration of Self-Representation is legally recognized, preventing stall tactics from creditors.",
    primaryButton: "View Signature",
    completed: false,
    status: "Incomplete",
  },
  {
    title: "Become a TCSG Academy Affiliate",
    icon: <DollarSign className="h-12 w-12" />,
    description:
      "Share TCSG Academy with your network and earn 30% of every friend's subscription. Help people while making extra cash!",
    primaryButton: "Start Earning",
    completed: false,
    status: "Incomplete",
  },
  {
    title: "Build Your Credit Profile",
    icon: <Blocks className="h-12 w-12" />,
    description:
      "Credit builder programs help you establish or rebuild credit with small, manageable steps. Start building your profile today.",
    primaryButton: "Start Building Credit",
    completed: false,
    status: "Incomplete",
  },
  // {
  //   title: 'Become An Authorize User',
  //   icon: <UserCheck className="h-12 w-12" />,
  //   description:
  //     'Get added as an authorized user on a trusted credit card to boost your credit age and lower utilization—without extra spending.',
  //   primaryButton: 'Become An Authorized User',
  //   completed: false,
  //   status: 'Incomplete',
  // },
];