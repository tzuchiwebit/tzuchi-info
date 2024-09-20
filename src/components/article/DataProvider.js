import { useState, useEffect } from "react"
import { createContext } from 'react';
import { getArticleById, getRecommandArticles, getExtendArticles, getTags4All } from "@/api/joomlaApi";
import { useParams } from 'next/navigation'
const { useLocalStorageState } = require('ahooks')

export const DataContext = createContext(null);

export default function DataProvider({ children, hasAudio }) {
  const params = useParams();

  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasLikeLocal, setHasLikeLocal] = useLocalStorageState(`like_${params.slug}`, {defaultValue: false});
  const [hasShareLocal, setHasShareLocal] = useLocalStorageState(`share_${params.slug}`, {defaultValue: false});

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

      let tags4All = []
      if (article.attributes['readmore-tags']) {
        tags4All = await getTags4All(article.attributes['readmore-tags'])
        // 2) fetch recommand article list
        res.push({
          name: 'recommandArticles',
          data: tags4All?.recommend,
        })

        // 3) fetch extend article lists
        res.push({
          name: 'extendArticles',
          data: tags4All?.readmore,
        })
      }

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
    <DataContext.Provider value={{ pageData, loading, hasLikeLocal, setHasLikeLocal, hasShareLocal, setHasShareLocal, hasAudio }}>
      {children}
    </DataContext.Provider>
  );
}
