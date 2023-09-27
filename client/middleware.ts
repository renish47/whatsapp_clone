import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { CHECK_USER_ROUTE } from "./utils/apiRoutes";

// export {default} from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Manage route protection
    const isAuth = await getToken({ req });

    const isLoginPage = pathname.startsWith("/login");
    const isOnBoardingPage = pathname.startsWith("/onboarding");

    const sensitiveRoutes = ["/", "/onboarding"];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuth) return NextResponse.redirect(new URL("/", req.url));
      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isOnBoardingPage) {
      if (isAuth) {
        try {
          let res = await fetch(`${CHECK_USER_ROUTE}/${isAuth?.email}`);
          const result = await res.json();
          if (result.user.newUser) {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(new URL("/", req.url));
          }
        } catch (error) {
          console.log(error);
        }
      } else return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isAuth && isAccessingSensitiveRoute) {
      try {
        let res = await fetch(`${CHECK_USER_ROUTE}/${isAuth?.email}`);
        const result = await res.json();
        if (result.user.newUser) {
          return NextResponse.redirect(new URL("/onboarding", req.url));
        } else {
          return NextResponse.next();
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matchter: ["/", "/login", "/onboarding"],
};
