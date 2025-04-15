import React from "react";
import { Sparkles, RefreshCw, Flame, Tag } from "lucide-react";

const buttons = [
  { icon: Sparkles, label: "New" },
  { icon: RefreshCw, label: "Random" },
  { icon: Flame, label: "Hot" },
  { icon: Tag, label: "Tags" },
];

const CustomButton: React.FC = () => (
  <div className="flex justify-center gap-4 mb-6">
    {buttons.map((btn, index) => (
      <button
        key={index}
        className="border-line flex items-center space-x-2 rounded-md border px-6 py-3 bg-button-primary transform transition-transform duration-300 hover:scale-105"
      >
        <btn.icon size={20} />
        <span>{btn.label}</span>
      </button>
    ))}
  </div>
);

export default CustomButton;
