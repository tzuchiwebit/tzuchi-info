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

async function validateArticleMiddleware(id) {
  let result = true;
  try {
    const article = (await getArticleById(id)).data;
    if (
      !validateArticle({
        state: article?.attributes?.state,
        publishUp: article?.attributes?.publish_up,
        publishDown: article?.attributes?.publish_down,
      })
    ) {
      console.log("invalidate article", id);
      result = false;
    }
  } catch (err) {
    console.error(err);
  } finally {
    return result;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/article")) {
    const match = pathname.match(/\/article\/(\d+)/);
    if (!(match && (await validateArticleMiddleware(match[1])))) {
      // FIXME: using 404
      return Response.redirect(process.env.NEXT_PUBLIC_URL, 301);
    }
  }

  // Continue with the request
  return NextResponse.next();
}
