import { notFound } from "next/navigation";
import GalleryView from "@/components/GalleryView";
import { getGalleries, getGalleriesByCategory } from "@/sanity/lib/queries";

export async function generateStaticParams() {
    const galleries = await getGalleries();
    const categories = Array.from(new Set(galleries.map((g) => g.category)));
    return categories.map((category) => ({
        category: category.toLowerCase(),
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    // Handle case-insensitivity: URL is lowercase, data is uppercase
    const decodedCategory = decodeURIComponent(category).toUpperCase();

    // Filter items using Sanity
    const items = await getGalleriesByCategory(decodedCategory);

    // Determine Layout Variant
    let variant: "editorial" | "archival" | "cinema" | "monolithic" = "editorial";
    if (["WEDDING", "DOCUMENTARY"].includes(decodedCategory)) variant = "archival";
    if (["WILDLIFE", "LANDSCAPE", "STREET"].includes(decodedCategory)) variant = "cinema";
    if (["ARCHITECTURAL", "COMMERCIAL"].includes(decodedCategory)) variant = "monolithic";

    if (!items || items.length === 0) {
        return notFound();
    }

    return <GalleryView items={items} category={decodedCategory} variant={variant} />;
}
