import GalleryView from "@/components/GalleryView";
import galleries from "@/data/galleries.json";

export const metadata = {
    title: "The Repository | OYANGE",
    description: "The complete visual archive of OYANGE.",
};

export default function WorkPage() {
    return <GalleryView items={galleries} category="The Repository" variant="archival" />;
}
