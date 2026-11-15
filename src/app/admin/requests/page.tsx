import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/actions";
import { RequestsList } from "./requests-list";

export default async function AdminRequestsPage() {
  const authenticated = await isAdmin();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return <RequestsList />;
}
