import { NextResponse } from "next/server";
import { validateArticle } from "@/utils";

export const config = {
  matcher: ["/article/:path*"],
};

const getArticleById = async (id) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/article?id=${id}`,
    {
      next: { revalidate: 60 * 60 }, // reset data cache, after 1h, for server-side only
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await res.json();
};

async function articleMiddleware(id) {
  const article = (await getArticleById(id)).data;
  console.log("articleMiddleware", id);
  if (
    !validateArticle({
      state: article?.attributes?.state,
      publishUp: article?.attributes?.publish_up,
      publishDown: article?.attributes?.publish_down,
    })
  ) {
    console.log("invalidate article");
    return Response.redirect(process.env.NEXT_PUBLIC_URL, 301);
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/article")) {
    const match = pathname.match(/\/article\/(\d+)/);
    if (match) {
      const id = match[1];
      await articleMiddleware(id);
    }
  }

  // Continue with the request
  return NextResponse.next();
}
