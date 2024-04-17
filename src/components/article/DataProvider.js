import { useState, useEffect } from "react"
import { createContext } from 'react';
import { getArticleById, getRecommandArticles, getExtendArticles } from "@/api/joomlaApi";
import { useSearchParams, useParams } from 'next/navigation'

export const DataContext = createContext(null);

export default function DataProvider({ children }) {
  const params = useParams();

  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getArticle = async (id) => {
    setLoading(true);
    try {
      const res = []
      // 1) fetch article
      const article = (await getArticleById(id)).data
      res.push(
        {
          name: 'article',
          data: article,
        }
      )

      // 2) fetch recommand article list
      const recommandArticles = (await getRecommandArticles(article.relationships.category.data.id)).data
      res.push(
        {
          name: 'recommandArticles',
          data: recommandArticles,
        }
      )

      // 3) fetch extend article lists
      const extendArticles = (await getExtendArticles(Object.keys(article.attributes.tags))).data
      res.push(
        {
          name: 'extendArticles',
          data: extendArticles,
        }
      )
      setPageData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (params?.slug) {
      getArticle(params?.slug);
    }
  }, [params?.slug])


  return (
    <DataContext.Provider value={{pageData, loading}}>
      {children}
    </DataContext.Provider>
  );
}
