import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeCookie, safeLocaleTarget } from "@/i18n/config";

export function GET(request: NextRequest) {
    const locale = request.nextUrl.searchParams.get("locale") || "";
    const path = request.nextUrl.searchParams.get("path") || "";
    const target = hasLocale(locale) ? safeLocaleTarget(locale, path, request.nextUrl.origin) : null;
    if (!target) return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
    const response = NextResponse.redirect(target);
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set(localeCookie, locale, { maxAge: 60 * 60 * 24 * 365, path: "/", sameSite: "lax", httpOnly: true, secure: request.nextUrl.protocol === "https:" });
    return response;
}
