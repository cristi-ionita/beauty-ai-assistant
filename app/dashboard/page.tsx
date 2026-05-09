"use client";

import DashboardContent from "@/components/dashboard/DashboardContent";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const dashboard = useDashboard();

  return <DashboardContent {...dashboard} />;
}