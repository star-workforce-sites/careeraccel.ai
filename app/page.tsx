import { redirect } from "next/navigation";

// Root path isn't a campaign landing page in this project — every ad points
// straight at a feature route (e.g. /ai-recruiter). Send stray root traffic
// to the main app rather than rendering a generic homepage here.
export default function RootPage() {
  redirect("https://starworkforcesolutions.com");
}
