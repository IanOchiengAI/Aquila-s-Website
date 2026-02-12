export const metadata = {
    title: "OYANGE Studio — Content Manager",
    description: "Manage galleries, images, and site settings.",
    robots: { index: false, follow: false },
};

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
