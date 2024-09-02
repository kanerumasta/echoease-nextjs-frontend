import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { ROUTES } from "./conf";

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("access")?.value;
  if (!token && !pathName.startsWith("/auth")) {
    return NextResponse.redirect(new URL(ROUTES.auth.login, request.nextUrl));
  }

  if (token && pathName.startsWith("/auth")) {
    return NextResponse.redirect(new URL(ROUTES.home, request.nextUrl));
  }

  if (pathName.startsWith("/echoverse")) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/users/me/is-artist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }
  }

  // console.log("PATH IS", pathName);
  // if (pathName === "/become-an-echoee") {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_HOST}/api/profile/is-complete`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       return NextResponse.redirect(new URL("/profile-setup", request.url));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/echoverse/:path*",
    "/echo-hunt/:path*",
    "/chat/:path*",
    "/become-an-echoee",
  ],
};
