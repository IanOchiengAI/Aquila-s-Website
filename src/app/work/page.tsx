import GalleryView from "@/components/GalleryView";
import { getGalleries } from "@/sanity/lib/queries";

export const metadata = {
    title: "The Repository | OYANGE",
    description: "The complete visual archive of OYANGE.",
};

export default async function WorkPage() {
    const items = await getGalleries();
    return <GalleryView items={items} category="The Repository" variant="archival" />;
}
