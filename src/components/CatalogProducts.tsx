"use client";

import Image from "next/image";
import Link from "next/link";
import {useMemo, useState} from "react";
import type {CatalogCategory, CatalogProduct} from "@/sanity/types";

type Copy = {all: string; categoryLabel: string; sortLabel: string; sortDefault: string; price: string; name: string; learnMore: string; empty: string};

export default function CatalogProducts({products, categories, copy}: {products: CatalogProduct[]; categories: CatalogCategory[]; copy: Copy}) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const visible = useMemo(() => {
    const filtered = category === "all" ? products : products.filter((product) => product.categories.some((item) => item.slug === category));
    return [...filtered].sort((a, b) => sort === "price" ? a.price - b.price : sort === "name" ? a.title.localeCompare(b.title) : Number(b.featured) - Number(a.featured));
  }, [category, products, sort]);

  return <>
    <div className="category-nav" aria-label={copy.categoryLabel}>
      <button type="button" className={category === "all" ? "active" : ""} aria-pressed={category === "all"} onClick={() => setCategory("all")}>{copy.all}</button>
      {categories.map((item) => <button type="button" key={item.id} className={category === item.slug ? "active" : ""} aria-pressed={category === item.slug} onClick={() => setCategory(item.slug)}>{item.title}</button>)}
      <select aria-label={copy.sortLabel} value={sort} onChange={(event) => setSort(event.target.value)}>
        <option value="featured">{copy.sortDefault}</option>
        <option value="price">{copy.price}</option>
        <option value="name">{copy.name}</option>
      </select>
    </div>
    <div id="products" className="product-grid" aria-live="polite">
      {visible.map((product) => <article className="product-card" key={product.id}>
        <Image src={product.coverImage.url} alt={product.coverImage.alt} width={product.coverImage.width} height={product.coverImage.height} />
        <h2>{product.title}</h2>
        {product.shortDescription && <small>{product.shortDescription}</small>}
        <p>{product.displayPrice}</p>
        <Link href={product.href}>{copy.learnMore}</Link>
      </article>)}
      {!visible.length && <p className="catalog-products__empty">{copy.empty}</p>}
    </div>
  </>;
}
