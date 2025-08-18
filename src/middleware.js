import { NextResponse } from "next/server";
import middlewareAuth from "utils/middlewareAuth";


export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;

  const user = await middlewareAuth(req);
  console.log("Middleware User:", user);

  if (pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
    if (user) {
      console.log("Redirecting to Home as user exists.");
      return NextResponse.redirect(new URL('/', url));
    }
  }

  if (pathname.startsWith('/profile')) {
    if (!user) {
      console.log("Redirecting to Signin as user does not exist.");
      return NextResponse.redirect(new URL('/signin', url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/profile/:path*',
    '/signin',
    '/signup',
  ],
};



// export async function middleware(req) {

//   const pathname = req.nextUrl.pathname;
//   // console.log({ pathname });

//   if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
//     const user = await middlewareAuth(req);
//     if (user) {
//       const homeUrl = new URL(`/`, req.url);
//       return NextResponse.redirect(homeUrl);
//     }
//   }


//   if (pathname.startsWith("/profile")) {
//     const user = await middlewareAuth(req);
//     if (!user) {
//       const signinUrl = new URL(`/signin?redirect=${pathname}`, req.url);
//       return NextResponse.redirect(signinUrl);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile/:path*", "/signin", "/signup"],
// };

