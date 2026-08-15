import type { Metadata } from "next";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
    const requestHeaders = await headers();
    const host = requestHeaders.get("host") ?? "localhost:3000";
    const protocol = host.startsWith("localhost") ? "http" : "https";
    const base = `${protocol}://${host}`;
    const title = "Lumynery Design House";
    const description =
        "Individuelle Papeterie, Markenidentitäten und digitale Lösungen mit Liebe zum Detail.";
    const image = `${base}/og.png`;

    return {
        metadataBase: new URL(base),
        title: { default: title, template: "%s | Lumynery" },
        description,
        openGraph: {
            title,
            description,
            type: "website",
            images: [{ url: image, width: 1730, height: 909, alt: "Lumynery – Creating Meaningful Experiences" }],
        },
        twitter: { card: "summary_large_image", title, description, images: [image] },
    };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="de">
            <body>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
