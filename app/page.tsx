import { getAppSettings } from "@/lib/settings";
import { EcommerceHome } from "@/components/EcommerceHome";
import { InformationalHome } from "@/components/InformationalHome";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const settings = await getAppSettings();
  const isInformational = settings.homePageMode === "informational";

  if (isInformational) {
    return <InformationalHome />;
  }

  return <EcommerceHome />;
}
