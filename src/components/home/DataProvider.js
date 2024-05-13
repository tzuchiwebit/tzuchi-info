import { useState, useEffect } from "react"
import { createContext } from 'react';
import { getArticlesByCategory } from "@/api/joomlaApi";
import { getBookSuggest } from "@/api/api";

export const DataContext = createContext(null);


const requiredPageData = [
  {
    name: '志工早會',
    count: 1,
  },
  {
    name: '熱門活動',
    count: 3,
  },
  {
    name: '證嚴上人每日一叮嚀',
    count: 1,
  },
  {
    name: '各據點消息', // for homepage carousel
    count: 7,
  },
  {
    name: '基金會公告',
    count: 3,
  },
  {
    name: '社區故事',
    count: 3,
  },
  {
    name: '好書推薦',
    count: 4,
  },
  {
    name: '專欄文章-領航慈濟',
    count: 2,
    tag: 1486,
  },
  {
    name: '專欄文章-名人視角',
    count: 2,
    tag: 1487,
  },
]
export default function DataProvider({ children }) {


  const [pageData, setPageData] = useState([]);
  const [suggestBooks, setSuggestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);

  const getJournal = async () => {
    setLoading(true);
    try {
      const res = (await Promise.all(requiredPageData.map(async i => ({
        ...i,
        data: (await getArticlesByCategory({ label_name: i.name, limit: i.count, tag: i.tag })).data
      }))))

      // console.log(`res`)
      // console.log(res)

      setPageData(res);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const getBooksSuggested = async () => {
    setLoadingBooks(true);
    try {
      const res = await getBookSuggest();

      setSuggestBooks(res);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBooks(false);
    }
  }

  useEffect(() => {
    getJournal();
    getBooksSuggested()
  }, [])


  return (
    <DataContext.Provider value={{ pageData, loading, loadingBooks, suggestBooks }}>
      {children}
    </DataContext.Provider>
  );
}
