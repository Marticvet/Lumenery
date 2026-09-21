"use client";

import Link from "next/link";
import {useState} from "react";
import type {Locale} from "@/i18n/config";

const minimumQuantity = 1;
const maximumQuantity = 9999;

export default function ProductEnquiry({
  locale,
  productTitle,
  quantityLabel,
  actionLabel,
}: {
  locale: Locale;
  productTitle: string;
  quantityLabel: string;
  actionLabel: string;
}) {
  const [quantity, setQuantity] = useState(minimumQuantity);
  const enquiryHref = `/${locale}/kontakt?product=${encodeURIComponent(productTitle)}&quantity=${quantity}`;

  return <div className="product-enquiry">
    <label htmlFor="product-quantity">{quantityLabel}</label>
    <div className="product-enquiry__controls">
      <input
        id="product-quantity"
        type="number"
        min={minimumQuantity}
        max={maximumQuantity}
        step={1}
        inputMode="numeric"
        value={quantity}
        onChange={(event) => {
          const next = event.currentTarget.valueAsNumber;
          if (Number.isFinite(next)) setQuantity(Math.min(maximumQuantity, Math.max(minimumQuantity, Math.trunc(next))));
        }}
      />
      <Link href={enquiryHref} className="button button--rose">{actionLabel}</Link>
    </div>
  </div>;
}
