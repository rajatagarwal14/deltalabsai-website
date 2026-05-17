import { redirect } from "next/navigation";

// /smilecrm redirects to the canonical SmileCRM landing page
export default function SmileCRMIndexPage() {
  redirect("/dental");
}
