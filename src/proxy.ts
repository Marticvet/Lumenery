import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, localeCookie } from "@/i18n/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (hasLocale(pathname.split("/")[1])) return NextResponse.next();
    const saved = request.cookies.get(localeCookie)?.value;
    const locale = saved && hasLocale(saved) ? saved : defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
}

export const config = { matcher: ["/((?!api(?:/|$)|lmx(?:/|$)|_next|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"] };
