import React from "react";
import * as Icons from "lucide-react";

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = "", size }: IconProps) {
  // Map strings to Lucide components
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) {
    return <Icons.HelpCircle className={className} size={size} />;
  }
  return <LucideIcon className={className} size={size} />;
}
