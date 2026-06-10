import React from "react";
import { 
  HeartPulse, 
  Car, 
  ShieldCheck, 
  TrendingUp, 
  NotebookPen, 
  Users, 
  Plane, 
  Ship 
} from "lucide-react";
import { ProductGroup } from "../types";

interface SidebarProductsProps {
  onSelectCategory: (id: string, name: string) => void;
  activeCategory: string;
}

export const productCategories: ProductGroup[] = [
  {
    id: "health_insurance",
    name: "Health Insurance",
    description: "Compare CSR and networks from top general insurers.",
    icon: "HeartPulse"
  },
  {
    id: "motor_insurance",
    name: "Motor Insurance",
    description: "Direct zero-commission and quick video inspection covers.",
    icon: "Car"
  },
  {
    id: "life_insurance",
    name: "Life Insurance",
    description: "Guaranteed savings with HDFC Life Sanchay Plus.",
    icon: "ShieldCheck"
  },
  {
    id: "mutual_funds",
    name: "Mutual Funds",
    description: "Curated portfolios categorized by risk & Section 80C.",
    icon: "TrendingUp"
  },
  {
    id: "tradinguru_course",
    name: "Tradinguru Course",
    description: "Master chart logic and our proprietary Fake-out setups.",
    icon: "NotebookPen"
  },
  {
    id: "demat_accounts",
    name: "Demat Accounts",
    description: "Multi-asset digital account system via Wealthy.",
    icon: "Users"
  },
  {
    id: "travel_insurance",
    name: "Travel Insurance",
    description: "Global protection for students and corporate teams.",
    icon: "Plane"
  },
  {
    id: "marine_insurance",
    name: "Marine Insurance",
    description: "Commercial shipping cargo transit protections.",
    icon: "Ship"
  }
];

const iconMap: Record<string, React.ComponentType<any>> = {
  HeartPulse,
  Car,
  ShieldCheck,
  TrendingUp,
  NotebookPen,
  Users,
  Plane,
  Ship,
};

export default function SidebarProducts({ onSelectCategory, activeCategory }: SidebarProductsProps) {
  return (
    <div className="flex flex-col gap-3" id="sidebar-products">
      <div className="pb-2 border-b border-gray-100">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Happequity Offerings
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Click any product to explore details & talk with Riya
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
        {productCategories.map((prod) => {
          const IconComponent = iconMap[prod.icon] || ShieldCheck;
          const isActive = activeCategory === prod.id;

          return (
            <button
              key={prod.id}
              id={`prod-btn-${prod.id}`}
              onClick={() => onSelectCategory(prod.id, prod.name)}
              className={`flex items-start text-left gap-3 p-3 rounded-xl transition-all duration-300 border ${
                isActive
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700 shadow-xs"
                  : "bg-white hover:bg-slate-50/80 border-slate-100/80 text-slate-700 hover:text-slate-900"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors ${
                  isActive ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-500 group-hover:bg-slate-100"
                }`}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm leading-tight truncate">
                  {prod.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1 leading-snug">
                  {prod.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
