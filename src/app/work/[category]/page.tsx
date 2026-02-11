import { notFound } from "next/navigation";
import galleries from "@/data/galleries.json";
import GalleryView from "@/components/GalleryView";

export function generateStaticParams() {
    const categories = Array.from(new Set(galleries.map((g) => g.category)));
    return categories.map((category) => ({
        category: category.toLowerCase(),
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    // Handle case-insensitivity: URL is lowercase, data is uppercase
    const decodedCategory = decodeURIComponent(category).toUpperCase();

    // Filter items
    const items = galleries.filter(g => g.category === decodedCategory);

    if (items.length === 0) {
        return notFound();
    }

    return <GalleryView items={items} category={decodedCategory} />;
}
