import { useState, useEffect } from "react"
import { createContext } from 'react';
import { getArticlesByCategory, getUserById, getBookJingsiArticles, getArticlesByCategories } from "@/api/joomlaApi";
import { getBookSuggest, getBookJingsi, getWeeklyReport } from "@/api/api";
import _ from 'lodash'
import dayjs from "dayjs"

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
    name: '基金會公告',
    count: 3,
  },
  {
    name: '社區故事',
    count: 3,
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
  const [suggestBooks, setSuggestBooks] = useState(Array(4).fill({}));
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [jingsiBooks, setJingsiBooks] = useState(Array(4).fill({}));
  const [floatLinkArticles, setFloatLinkArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingWeeklyReports, setLoadingWeeklyReports] = useState(true);
  const [loadingJingsi, setLoadingJingsi] = useState(true);
  const [loadingFloatLinks, setLoadingFloatLinks] = useState(false)

  const getJournal = async () => {
    setLoading(true);
    try {
      const res = (await Promise.all(requiredPageData.map(async i => ({
        ...i,
        data: (await getArticlesByCategory({ label_name: i.name, limit: i.count, tag: i.tag })).data
      }))))

      res.push({
        name: '全球志業', // for homepage carousel
        count: 7,
        data: (await getArticlesByCategories({ label_names: ['全球志業', '基金會公告'], limit: 7 })).data
      })

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

  const getWeeklyReports = async () => {
    setLoadingWeeklyReports(true);
    try {
      const res = await getWeeklyReport({limit: 1});
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
      // const res = await getBookJingsi();
      const res = await getBookJingsiArticles();
      setJingsiBooks(res);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingJingsi(false);
    }
  }

  const getFloatLinkArticles = async () => {
    setLoadingFloatLinks(true);
    try {
      const res = await getArticlesByCategory({ label_name: "浮動式按鈕" })
      const result = res.data.filter(item => {
        return !item.attributes?.publish_down || dayjs().isAfter(dayjs(item.attributes?.publish_down, 'YYYY-MM-DD HH:mm:ss'))
      });
      setFloatLinkArticles(result)
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFloatLinks(false);
    }
  }

  useEffect(() => {
    getJournal();
    getBooksSuggested()
    getWeeklyReports()
    getBooksJingsi()
    getFloatLinkArticles()
  }, [])


  return (
    <DataContext.Provider value={{ pageData, loading, loadingBooks, suggestBooks, loadingJingsi, jingsiBooks, weeklyReports, loadingWeeklyReports, loadingFloatLinks, floatLinkArticles }}>
      {children}
    </DataContext.Provider>
  );
}
