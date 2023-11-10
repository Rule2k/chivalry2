import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {routes} from "@/config/routes";

// all segmentName of the routes are written in lowerCase as to have consistent URLs
// but since theses segmentName are the keys of an enum to fetch the correct class / subclass
// we need to have them in uppercase at the component level.
// we use a middleware with .rewrite() to handle this, so the URLs are still displayed in lowerCase,
// but the components receive them in uppercase as params

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname.replace(routes.class, "");
  if (pathName === pathName.toLowerCase()) {
    return NextResponse.rewrite(
      new URL(
        request.nextUrl.origin + `${routes.class}${pathName.toUpperCase()}`,
      ),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/class/:class*", "/class/:class/:subclass*"],
};
