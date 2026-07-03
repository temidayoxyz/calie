import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const pathname = request.nextUrl.pathname;

      const publicRoutes = ["/", "/login", "/signup"];
      const publicPrefixes = [
        "/book",
        "/features",
        "/pricing",
        "/about",
        "/blog",
        "/contact",
        "/privacy",
        "/terms",
        "/security",
        "/status",
        "/changelog",
      ];

      const isPublicRoute =
        publicRoutes.includes(pathname) ||
        publicPrefixes.some((prefix) => pathname.startsWith(prefix));

      const isAuthRoute = pathname === "/login" || pathname === "/signup";
      const isDashboard = pathname.startsWith("/dashboard");

      if (isLoggedIn && isAuthRoute) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      if (!isLoggedIn && isDashboard) {
        const loginUrl = new URL("/login", request.nextUrl);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return Response.redirect(loginUrl);
      }

      if (!isLoggedIn && !isPublicRoute && !isDashboard) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
