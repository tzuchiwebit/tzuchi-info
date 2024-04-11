import { useState, useEffect } from "react"
import { createContext } from 'react';
import { getArticlesByCategory } from "@/api/joomlaApi";


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

]
export default function DataProvider({ children }) {


  const [pageData, setPageData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJournal = async () => {
    setLoading(true);
    try {
      const res = (await Promise.all(requiredPageData.map(async i => ({
        ...i,
        data: (await getArticlesByCategory(i.name, i.count)).data
      }))))
      // console.log(`res`);
      // console.log(res);

      setPageData(res);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getJournal();
  }, [])


  return (
    <DataContext.Provider value={{pageData, loading}}>
      {children}
    </DataContext.Provider>
  );
}
