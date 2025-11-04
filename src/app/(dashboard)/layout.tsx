import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import getProfile from "@/helpers/getProfile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure user is authenticated
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) {
    redirect("/");
  }

  // Ensure user is admin
  const profile = await getProfile();
  if (!profile || profile?.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  return <DashboardWrapper>{children}</DashboardWrapper>;
}
