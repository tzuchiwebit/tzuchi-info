import { useState, useEffect } from "react"
import { createContext } from 'react';
import { getArticlesByCategory, getUserById } from "@/api/joomlaApi";
import { getBookSuggest, getBookJingsi, getWeeklyReport } from "@/api/api";
import _ from 'lodash'

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
    name: '全球志業', // for homepage carousel
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
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [jingsiBooks, setJingsiBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingWeeklyReports, setLoadingWeeklyReports] = useState(true);
  const [loadingJingsi, setLoadingJingsi] = useState(true);

  const getJournal = async () => {
    setLoading(true);
    try {
      const res = (await Promise.all(requiredPageData.map(async i => ({
        ...i,
        data: (await getArticlesByCategory({ label_name: i.name, limit: i.count, tag: i.tag })).data
      }))))

      // console.log(`res`)
      // console.log(res)

      // fetch creator info
      const creatorPool = {}

      const targetLeadings = _.find(res, { name: '專欄文章-領航慈濟' });
      const targetViews = _.find(res, { name: '專欄文章-名人視角' });

      for (let article of targetLeadings.data) {
        if (creatorPool[article?.attributes?.created_by]) {
          article.attributes.creator = creatorPool[article?.attributes?.created_by]
        } else {
          const creator = (await getUserById(article?.attributes?.created_by))
          creatorPool[article?.attributes?.created_by] = creator
          article.attributes.creator = creator
        }
      }

      for (let article of targetViews.data) {
        if (creatorPool[article?.attributes?.created_by]) {
          article.attributes.creator = creatorPool[article?.attributes?.created_by]
        } else {
          const creator = (await getUserById(article?.attributes?.created_by))
          creatorPool[article?.attributes?.created_by] = creator
        }
      }

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

  const getWeeklyReports = async () => {
    setLoadingWeeklyReports(true);
    try {
      const res = await getWeeklyReport();
      setWeeklyReports(res);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWeeklyReports(false);
    }
  }

  const getBooksJingsi = async () => {
    setLoadingJingsi(true);
    try {
      const res = await getBookJingsi();

      setJingsiBooks(res);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingJingsi(false);
    }
  }

  useEffect(() => {
    getJournal();
    getBooksSuggested()
    getWeeklyReports()
    getBooksJingsi()
  }, [])


  return (
    <DataContext.Provider value={{ pageData, loading, loadingBooks, suggestBooks, loadingJingsi, jingsiBooks, weeklyReports, loadingWeeklyReports }}>
      {children}
    </DataContext.Provider>
  );
}
