import Image from "next/image";
import Link from "next/link";
import type {Locale} from "@/i18n/config";
import type {Translate} from "@/i18n/server";
import type {CatalogProduct} from "@/sanity/types";

export default function ProductDetail({product, locale, t}: {product: CatalogProduct; locale: Locale; t: Translate}) {
  return <div className="product-detail-page inner-page">
    <section className="product-detail-hero">
      <Image src={product.coverImage.url} alt={product.coverImage.alt} width={product.coverImage.width} height={product.coverImage.height} priority />
      <div>
        <h1>{product.title}</h1>
        {(product.shortDescription || product.description) && <p>{product.shortDescription || product.description}</p>}
        <p>{product.displayPrice}</p>
        <Link href={`/${locale}/kontakt`} className="button button--rose">{t("Jetzt anfragen")}</Link>
        {product.features.length > 0 && <ul className="product-features">
          {product.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
        </ul>}
      </div>
    </section>

    {product.gallery.length > 0 && <div className="product-gallery" aria-label={t("Produktansichten")}>
      {product.gallery.map((item, index) => <figure key={`${item.url}-${index}`}>
        <Image src={item.url} alt={item.alt} width={item.width} height={item.height} />
        {item.caption && <figcaption>{item.caption}</figcaption>}
      </figure>)}
    </div>}

    {(product.description || product.included.length > 0) && <section className="product-inclusions product-inclusions--managed page-shell section-pad">
      <div>
        <h2>{product.title}</h2>
        {product.description && <p>{product.description}</p>}
      </div>
      {product.included.length > 0 && <div className="included-card">
        <h2>{t("Das ist inklusive")}</h2>
        <ul>{product.included.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>}
    </section>}

    <section className="product-final-cta">
      <p>{t("Gemeinsam gestalten wir eure perfekte Papeterie.")}</p>
      <Link href={`/${locale}/kontakt`} className="button button--muted">{t("Jetzt anfragen")}</Link>
    </section>
  </div>;
}
