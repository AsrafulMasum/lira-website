import { redirect } from "next/navigation";

export default function MarketplacePage() {
  // Option 1: Redirect to default tab (e.g., 'crypto')
  redirect("/crypto");
  // return <div>Loading...</div>;
}


