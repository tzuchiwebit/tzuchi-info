import { NextResponse } from "next/server";
import { validateArticle } from "@/utils";
import { getRedirectJson } from "./api/routeApi";

export const config = {
  matcher: [
    "/article/:path*",
    "/tag/:path*"
  ],
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

async function checkTagRedirect(id) {
  let result = false;
  try {
    const redirectList = await getRedirectJson();
    const targetTag = redirectList.find(i => i.tag_link === `tag/${id}`);
    if (targetTag) {
      result = targetTag;
    }
  } catch (err) {
    console.error(err);
  } finally {
    return result;
  }
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // if (pathname.startsWith("/article")) {
  //   const match = pathname.match(/\/article\/(\d+)/);
  //   if (!(match && (await validateArticleMiddleware(match[1])))) {
  //     // FIXME: using 404
  //     return Response.redirect(process.env.NEXT_PUBLIC_URL, 301);
  //   }
  // }
  if (pathname.startsWith("/tag")) {
    const match = pathname.match(/\/tag\/(\d+)/);
    const redirectRef = await checkTagRedirect(match[1]);
    if (match && redirectRef) {
      // FIXME: using 404
      return Response.redirect(`${process.env.NEXT_PUBLIC_URL}/${redirectRef?.redirect_link}`, redirectRef?.redirect_type);
    }
  }

  // Continue with the request
  return NextResponse.next();
}
