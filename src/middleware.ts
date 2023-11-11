import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {routes} from "../config/next/routes";

// all dynamicSegment of the routes are written in lowerCase as to have consistent URLs
// but since theses segmentName are the keys of an enum to map them to the correct classes / subclasses
// we need to have them in uppercase at the component level.
// we use a middleware with .rewrite() to handle this, so the URLs are still displayed in lowerCase,
// but the components receive them in uppercase as params

export function middleware(request: NextRequest) {
  const dynamicSegment = request.nextUrl.pathname.replace(routes.class, "");
  if (dynamicSegment) {
    return NextResponse.rewrite(
      new URL(
        request.nextUrl.origin +
          `${routes.class}${dynamicSegment.toUpperCase()}`,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/classes/:class*", "/classes/:class/:subclass*"],
};
