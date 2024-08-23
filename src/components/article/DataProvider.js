import { useState, useEffect } from "react"
import { createContext } from 'react';
import { getArticleById, getRecommandArticles, getExtendArticles, getUserById } from "@/api/joomlaApi";
import { useParams } from 'next/navigation'
const { useLocalStorageState } = require('ahooks')

export const DataContext = createContext(null);

export default function DataProvider({ children }) {
  const params = useParams();

  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasLikeLocal, setHasLikeLocal] = useLocalStorageState(`like_${params.slug}`, {defaultValue: false});
  const [hasShareLocal, setHasShareLocal] = useLocalStorageState(`share_${params.slug}`, {defaultValue: false});

  const getArticle = async (id) => {
    setLoading(true);
    try {
      const res = []
      const creatorPool = {}

      // 1) fetch article
      // FIXME: data fetching from "getServerSideProps"
      const article = (await getArticleById(id)).data
      const creator = (await getUserById(article?.attributes?.created_by))
      article.attributes.creator = creator
      creatorPool[article?.attributes?.created_by] = creator
      res.push(
        {
          name: 'article',
          data: article,
        }
      )

      // 2) fetch recommand article list
      const recommandArticles = (await getRecommandArticles(article.relationships.category.data.id, 4)).data
      for (let article of recommandArticles) {
        if (creatorPool[article?.attributes?.created_by]) {
          article.attributes.creator = creatorPool[article?.attributes?.created_by]
        } else {
          const creator = (await getUserById(article?.attributes?.created_by))
          creatorPool[article?.attributes?.created_by] = creator
          article.attributes.creator = creator
        }
      }
      res.push(
        {
          name: 'recommandArticles',
          data: recommandArticles,
        }
      )

      // 3) fetch extend article lists
      const extendArticles = (await getExtendArticles(Object.keys(article.attributes.tags), 4)).data
      for (let article of extendArticles) {
        if (creatorPool[article?.attributes?.created_by]) {
          article.attributes.creator = creatorPool[article?.attributes?.created_by]
        } else {
          const creator = (await getUserById(article?.attributes?.created_by))
          creatorPool[article?.attributes?.created_by] = creator
          article.attributes.creator = creator
        }
      }
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
    <DataContext.Provider value={{pageData, loading, hasLikeLocal, setHasLikeLocal, hasShareLocal, setHasShareLocal}}>
      {children}
    </DataContext.Provider>
  );
}
