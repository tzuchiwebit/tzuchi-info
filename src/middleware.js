import { NextResponse } from "next/server";
import { validateArticle } from "@/utils";
import { getRedirectJson } from "./api/routeApi";

export const config = {
  matcher: [
    "/article/:path*",
    "/tag/:path*",
    "/volunteer-morning"
  ],
};

const getArticleById = async (origin, id) => {
  console.log('middleware.getArticleById invoke')
  // FIXME: call cms api directly
  const res = await fetch(
    `${origin}/api/article?id=${id}`,
    {
      headers: {
      },
    }
  );
  return await res.json();
};

async function validateArticleMiddleware(origin, id) {
  let result = true;
  try {
    const article = (await getArticleById(origin, id)).data;
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
  const origin = request.nextUrl.origin;

  if (pathname.startsWith("/article")) {
    console.log("validateArticleMiddleware invoke..")
    const match = pathname.match(/\/article\/(\d+)/);
    if (!(match && (await validateArticleMiddleware(origin, match[1])))) {
      // TODO: using 404
      return Response.redirect(origin, 301);
    }
  }

  if (pathname.startsWith("/tag")) {
    const match = pathname.match(/\/tag\/(\d+)/);
    const redirectRef = await checkTagRedirect(match[1]);
    if (match && redirectRef) {
      return Response.redirect(`${origin}/${redirectRef?.redirect_link}`, redirectRef?.redirect_type);
    }
  }

  if (pathname.startsWith("/volunteer-morning")) {
    return Response.redirect(`${origin}/master-talk`, 301);
  }

  // Continue with the request
  return NextResponse.next();
}
