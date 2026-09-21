import type {Metadata} from "next";
import {notFound} from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import {getPageContext} from "@/i18n/server";
import {ui} from "@/i18n/ui";
import {catalogProductMetadata} from "@/sanity/metadata";
import {getProductBySlug} from "@/sanity/products";

type ProductPageProps = {params: Promise<{lang: string; slug: string}>};

export default async function ProductPage({params}: ProductPageProps) {
  const values = await params;
  const context = await getPageContext({params: Promise.resolve({lang: values.lang})});
  const product = await getProductBySlug(context.locale, values.slug);
  if (!product) notFound();
  return <ProductDetail product={product} locale={context.locale} t={context.t} />;
}

export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
  const values = await params;
  const context = await getPageContext({params: Promise.resolve({lang: values.lang})});
  const product = await getProductBySlug(context.locale, values.slug);
  return product ? catalogProductMetadata(product, context.locale) : {title: ui[context.locale].notFound.title};
}
