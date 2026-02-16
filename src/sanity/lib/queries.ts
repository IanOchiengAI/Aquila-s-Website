import { client } from "./client";
import galleriesJson from "@/data/galleries.json";

/**
 * Fetches galleries from Sanity CMS.
 * Falls back to local galleries.json if Sanity is not configured.
 * This ensures the site always works, even without a CMS.
 */
export interface GalleryItem {
    id: string;
    title: string;
    category: string;
    subtitle: string;
    cover: string;
    date?: string;
    location?: string;
    services?: string | string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description?: any;
    content?: string[];
    wide?: boolean;
}

/**
 * Fetches galleries from Sanity CMS.
 * Falls back to local galleries.json if Sanity is not configured.
 * This ensures the site always works, even without a CMS.
 */
export async function getGalleries(): Promise<GalleryItem[]> {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return galleriesJson as GalleryItem[];
    }

    try {
        const galleries = await client.fetch(`
      *[_type == "gallery"] | order(date desc) {
        "id": slug.current,
        title,
        "category": upper(category),
        subtitle,
        "cover": cover.asset->url,
        date,
        location,
        services,
        description,
        "content": images[].asset->url,
        wide
      }
    `);

        return galleries.length > 0 ? galleries : galleriesJson as GalleryItem[];
    } catch {
        // If Sanity fetch fails, fall back to local JSON
        return galleriesJson as GalleryItem[];
    }
}

/**
 * Fetches galleries for a specific category.
 */
export async function getGalleriesByCategory(category: string) {
    const all = await getGalleries();
    return all.filter(
        (g: GalleryItem) => g.category?.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Fetches site settings from Sanity.
 * Returns sensible defaults if not configured.
 */
export async function getSiteSettings() {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
        return {
            studioName: "OYANGE",
            tagline: "Visual Alchemy",
            email: "martinaquila5@gmail.com",
            phone: "+254 717 393 576",
            location: "Westlands, Nairobi",
        };
    }

    try {
        const settings = await client.fetch(
            `*[_type == "siteSettings"][0]`
        );
        return settings || {};
    } catch {
        return {};
    }
}
