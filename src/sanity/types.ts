import type {Locale} from "@/i18n/config";

export type LocalizedValue = Partial<Record<Locale, string>>;

export type CatalogImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type CatalogCategory = {
  id: string;
  slug: string;
  title: string;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  displayPrice: string;
  price: number;
  categories: CatalogCategory[];
  coverImage: CatalogImage;
  gallery: CatalogImage[];
  features: string[];
  included: string[];
  featured: boolean;
  href: string;
  seoTitle?: string;
  seoDescription?: string;
  managed: boolean;
};
