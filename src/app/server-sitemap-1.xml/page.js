import { getServerSideSitemapLegacy } from "next-sitemap";
import { getAllArticles } from "@/api/joomlaApi";

export const getServerSideProps = async (ctx) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const res = await getAllArticles({});

  const fields = res?.data.map((item) => ({
    loc: `${process.env.SITE_URL}/article/${item.id}`,
    lastmod: item.attributes.modified,
    priority: 1,
    changefreq: "daily",
  }));

  return getServerSideSitemapLegacy(ctx, fields);
};

export default function SitemapIndex() {}
