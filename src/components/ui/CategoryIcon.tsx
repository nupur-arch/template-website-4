"use client";

import {
  Activity,
  Dumbbell,
  Shirt,
  Compass,
  Users,
  HeartPulse,
  Flame,
  Zap,
  Sparkles,
  LucideIcon,
} from "lucide-react";

interface CategoryIconProps {
  categorySlug?: string;
  category?: string;
  className?: string;
}

export function getCategoryIcon(slugOrName?: string): LucideIcon {
  const normalized = (slugOrName || "").toLowerCase().replace(/[^a-z]/g, "");

  if (normalized.includes("atividade") || normalized.includes("academia") || normalized.includes("casa")) {
    return Dumbbell;
  }
  if (normalized.includes("equipamento") || normalized.includes("vestuario") || normalized.includes("acessorio")) {
    return Shirt;
  }
  if (normalized.includes("iniciacao") || normalized.includes("planejamento") || normalized.includes("orientacao")) {
    return Compass;
  }
  if (normalized.includes("servico") || normalized.includes("profissional")) {
    return Users;
  }
  if (normalized.includes("habito") || normalized.includes("continuidade") || normalized.includes("seguranca")) {
    return HeartPulse;
  }
  return Activity;
}

export function CategoryIcon({
  categorySlug,
  category,
  className = "w-3.5 h-3.5",
}: CategoryIconProps) {
  const IconComponent = getCategoryIcon(categorySlug || category);
  return <IconComponent className={className} />;
}
