import "server-only";
import type {Locale} from "@/i18n/config";
import {localePath} from "@/i18n/config";
import {getTranslator} from "@/i18n/server";
import {sanityClient} from "./client";
import type {CatalogCategory, CatalogImage, CatalogProduct, LocalizedValue} from "./types";

type RawImage = {
  url?: string;
  width?: number;
  height?: number;
  alt?: LocalizedValue;
  caption?: LocalizedValue;
};

type RawCategory = {_id: string; slug?: string; title?: LocalizedValue};
type RawProduct = {
  _id: string;
  slug?: string;
  title?: LocalizedValue;
  shortDescription?: LocalizedValue;
  description?: LocalizedValue;
  price?: number;
  startingAt?: boolean;
  priceUnit?: "piece" | "set" | "project";
  featured?: boolean;
  categories?: RawCategory[];
  coverImage?: RawImage;
  gallery?: RawImage[];
  features?: LocalizedValue[];
  included?: LocalizedValue[];
  seoTitle?: LocalizedValue;
  seoDescription?: LocalizedValue;
};

const catalogQuery = `{
  "products": *[_type == "product" && active == true && defined(slug.current)] | order(coalesce(order, 100) asc, title.de asc) {
    _id, "slug": slug.current, title, shortDescription, description, price, startingAt, priceUnit, featured,
    "categories": categories[]->{_id, "slug": slug.current, title},
    "coverImage": {"url": coverImage.image.asset->url, "width": coverImage.image.asset->metadata.dimensions.width, "height": coverImage.image.asset->metadata.dimensions.height, "alt": coverImage.alt, "caption": coverImage.caption},
    "gallery": gallery[]{"url": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, alt, caption},
    features, included, seoTitle, seoDescription
  },
  "categories": *[_type == "category" && defined(slug.current)] | order(coalesce(order, 100) asc, title.de asc) {_id, "slug": slug.current, title}
}`;

const productQuery = `*[_type == "product" && active == true && slug.current == $slug][0] {
  _id, "slug": slug.current, title, shortDescription, description, price, startingAt, priceUnit, featured,
  "categories": categories[]->{_id, "slug": slug.current, title},
  "coverImage": {"url": coverImage.image.asset->url, "width": coverImage.image.asset->metadata.dimensions.width, "height": coverImage.image.asset->metadata.dimensions.height, "alt": coverImage.alt, "caption": coverImage.caption},
  "gallery": gallery[]{"url": image.asset->url, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, alt, caption},
  features, included, seoTitle, seoDescription
}`;

function localized(value: LocalizedValue | undefined, locale: Locale) {
  return value?.[locale]?.trim() || value?.de?.trim() || "";
}

function image(value: RawImage | undefined, locale: Locale, fallbackAlt: string): CatalogImage | null {
  if (!value?.url) return null;
  return {
    url: value.url,
    width: Math.max(1, Math.round(value.width || 1200)),
    height: Math.max(1, Math.round(value.height || 800)),
    alt: localized(value.alt, locale) || fallbackAlt,
    caption: localized(value.caption, locale) || undefined,
  };
}

function formatPrice(product: RawProduct, locale: Locale) {
  if (typeof product.price !== "number") return "";
  const language = locale === "bg" ? "bg-BG" : locale === "en" ? "en-IE" : "de-DE";
  const amount = new Intl.NumberFormat(language, {style: "currency", currency: "EUR"}).format(product.price);
  const prefix = product.startingAt ? ({de: "ab", en: "from", bg: "от"} as const)[locale] + " " : "";
  const units = {
    piece: {de: "pro Stück", en: "each", bg: "за брой"},
    set: {de: "pro Set", en: "per set", bg: "за комплект"},
    project: {de: "pro Projekt", en: "per project", bg: "за проект"},
  } as const;
  return `${prefix}${amount} ${units[product.priceUnit || "piece"][locale]}`;
}

function normalizeCategory(category: RawCategory, locale: Locale): CatalogCategory | null {
  if (!category?._id || !category.slug) return null;
  return {id: category._id, slug: category.slug, title: localized(category.title, locale) || category.slug};
}

function normalizeProduct(product: RawProduct, locale: Locale): CatalogProduct | null {
  if (!product?._id || !product.slug) return null;
  const title = localized(product.title, locale) || product.slug;
  const coverImage = image(product.coverImage, locale, title);
  if (!coverImage) return null;
  return {
    id: product._id,
    slug: product.slug,
    title,
    shortDescription: localized(product.shortDescription, locale),
    description: localized(product.description, locale),
    displayPrice: formatPrice(product, locale),
    price: typeof product.price === "number" ? product.price : 0,
    categories: (product.categories || []).map((item) => normalizeCategory(item, locale)).filter((item): item is CatalogCategory => Boolean(item)),
    coverImage,
    gallery: (product.gallery || []).map((item) => image(item, locale, title)).filter((item): item is CatalogImage => Boolean(item)),
    features: (product.features || []).map((item) => localized(item, locale)).filter(Boolean),
    included: (product.included || []).map((item) => localized(item, locale)).filter(Boolean),
    featured: Boolean(product.featured),
    href: localePath(locale, `/katalog/${product.slug}`),
    seoTitle: localized(product.seoTitle, locale) || undefined,
    seoDescription: localized(product.seoDescription, locale) || undefined,
    managed: true,
  };
}

function fallbackContent(locale: Locale): {products: CatalogProduct[]; categories: CatalogCategory[]} {
  const t = getTranslator(locale);
  const categoryValues = [
    {id: "fallback-wedding", slug: "hochzeit", title: t("Hochzeit")},
    {id: "fallback-birth", slug: "geburt-taufe", title: t("Geburt + Taufe")},
    {id: "fallback-invitations", slug: "einladungen", title: t("Einladungen")},
    {id: "fallback-gifts", slug: "geschenksets", title: t("Geschenksets")},
  ];
  const products = [
    {id: "menu", slug: "menuekarten", categorySlugs: ["hochzeit"], image: "/lumynery/product-menu.jpg", title: t("Menü – individuell"), price: t("ab 6,99€ pro Stück"), value: 6.99, href: localePath(locale, "/katalog/menuekarten")},
    {id: "invite", slug: "einladungen", categorySlugs: ["hochzeit", "geburt-taufe", "einladungen"], image: "/lumynery/product-invite.jpg", title: t("Einladungen"), price: t("3,50€ pro Stück"), value: 3.5, href: localePath(locale, "/kontakt")},
    {id: "table", slug: "tischdeko", categorySlugs: ["hochzeit"], image: "/lumynery/product-table.jpg", title: t("Tischdeko"), price: t("3,50€ pro Stück"), value: 3.5, href: localePath(locale, "/kontakt")},
  ];
  return {categories: categoryValues, products: products.map((product) => ({
    id: product.id, slug: product.slug, title: product.title, shortDescription: "", description: "", displayPrice: product.price, price: product.value,
    categories: categoryValues.filter((category) => product.categorySlugs.includes(category.slug)), coverImage: {url: product.image, width: 600, height: 470, alt: product.title}, gallery: [], features: [], included: [], featured: false,
    href: product.href, managed: false,
  }))};
}

export async function getCatalogContent(locale: Locale): Promise<{products: CatalogProduct[]; categories: CatalogCategory[]; managed: boolean}> {
  const fallback = fallbackContent(locale);
  if (!sanityClient) return {...fallback, managed: false};
  try {
    const result = await sanityClient.fetch<{products: RawProduct[]; categories: RawCategory[]}>(catalogQuery, {}, {cache: "no-store"});
    const products = (result.products || []).map((item) => normalizeProduct(item, locale)).filter((item): item is CatalogProduct => Boolean(item));
    if (!products.length) return {...fallback, managed: false};
    const categories = (result.categories || []).map((item) => normalizeCategory(item, locale)).filter((item): item is CatalogCategory => Boolean(item));
    return {products, categories, managed: true};
  } catch (error) {
    console.error("Lumynery catalog could not be loaded from Sanity.", {category: error instanceof Error ? error.name : "unknown"});
    return {...fallback, managed: false};
  }
}

export async function getProductBySlug(locale: Locale, slug: string): Promise<CatalogProduct | null> {
  if (!sanityClient || !/^[a-z0-9-]{1,96}$/i.test(slug)) return null;
  try {
    const product = await sanityClient.fetch<RawProduct | null>(productQuery, {slug}, {cache: "no-store"});
    return product ? normalizeProduct(product, locale) : null;
  } catch (error) {
    console.error("Lumynery product could not be loaded from Sanity.", {category: error instanceof Error ? error.name : "unknown"});
    return null;
  }
}
