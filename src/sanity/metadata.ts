import type {Metadata} from "next";
import {getSiteUrl} from "@/config/site";
import {defaultLocale, locales, localePath, type Locale} from "@/i18n/config";
import type {CatalogProduct} from "./types";

export function catalogProductMetadata(product: CatalogProduct, locale: Locale): Metadata {
  const path = `/katalog/${product.slug}`;
  const title = product.seoTitle || product.title;
  const description = product.seoDescription || product.shortDescription || product.description;
  const image = product.coverImage.url;
  return {
    metadataBase: getSiteUrl(),
    title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: {...Object.fromEntries(locales.map((lang) => [lang, localePath(lang, path)])), "x-default": localePath(defaultLocale, path)},
    },
    openGraph: {title, description, type: "website", locale, url: localePath(locale, path), images: [{url: image, alt: product.coverImage.alt}]},
    twitter: {card: "summary_large_image", title, description, images: [image]},
  };
}
