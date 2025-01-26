import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from "next/server";

const nextIntlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest): NextResponse {
  const {pathname} = req.nextUrl;
  const token = req.cookies.get('accessToken')?.value;
  if (token && pathname.includes('login')) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url)
  } else if (!token && pathname.includes('panel')) {
    const url = req.nextUrl.clone();
    if (req.nextUrl.search) {
      url.search = `?redirect=${req.nextUrl.pathname}${req.nextUrl.search}`
    } else {
      url.search = `?redirect=${req.nextUrl.pathname}`
    }
    url.pathname = `/en/login`;
    return NextResponse.redirect(url)
  }

  return nextIntlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(de|en)/:path*']
};