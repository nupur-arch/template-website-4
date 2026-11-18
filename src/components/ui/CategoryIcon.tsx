"use client";

import {
  Globe,
  Cpu,
  Coins,
  Palette,
  Leaf,
  Feather,
  Fingerprint,
  Shield,
  Compass,
  Flame,
  Radio,
  BookOpen,
  LucideIcon,
} from "lucide-react";

interface CategoryIconProps {
  categorySlug?: string;
  category?: string;
  className?: string;
}

export function getCategoryIcon(slugOrName?: string): LucideIcon {
  const normalized = (slugOrName || "").toLowerCase().replace(/[^a-z]/g, "");

  if (normalized.includes("tech") || normalized.includes("silicon") || normalized.includes("compute")) {
    return Cpu;
  }
  if (normalized.includes("market") || normalized.includes("capital") || normalized.includes("econom")) {
    return Coins;
  }
  if (normalized.includes("culture") || normalized.includes("art") || normalized.includes("architect")) {
    return Palette;
  }
  if (normalized.includes("climate") || normalized.includes("planet") || normalized.includes("earth")) {
    return Leaf;
  }
  if (normalized.includes("longview") || normalized.includes("opinion") || normalized.includes("essay")) {
    return Feather;
  }
  if (normalized.includes("investigat") || normalized.includes("dossier")) {
    return Fingerprint;
  }
  if (normalized.includes("geopolitic") || normalized.includes("defens") || normalized.includes("sovereign")) {
    return Shield;
  }
  if (normalized.includes("photo") || normalized.includes("visual")) {
    return Compass;
  }
  return Globe;
}

export function CategoryIcon({
  categorySlug,
  category,
  className = "w-3.5 h-3.5",
}: CategoryIconProps) {
  const IconComponent = getCategoryIcon(categorySlug || category);
  return <IconComponent className={className} />;
}
