import { useState, useEffect } from "react"
import { createContext } from 'react';
import { getArticlesByCategory } from "@/api/joomlaApi";
import _ from 'lodash'
import dayjs from "dayjs"

export const DataContext = createContext(null);

export default function DataProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [emergencyArticle, setEmergencyArticle] = useState("");
  const [loadingEmergencyArticle, setLoadingEmergencyArticle] = useState(true);

  const getEmergencyArticles = async () => {
    setLoadingEmergencyArticle(true);
    try {
      const res = await getArticlesByCategory({ label_name: "緊急發佈訊息", limit: 1 })
      if (res?.data) {
        if (!!res?.data[0].attributes?.publish_down) {
          if (dayjs().isAfter(dayjs(res?.data[0].attributes?.publish_down, 'YYYY-MM-DD HH:mm:ss'))) {
            setEmergencyArticle(res?.data[0].attributes?.text);
          }
        } else {
          setEmergencyArticle(res?.data[0].attributes?.text);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingEmergencyArticle(false);
    }
  }

  useEffect(() => {
    getEmergencyArticles();
  }, [])

  return (
    <DataContext.Provider value={{ emergencyArticle, loadingEmergencyArticle }}>
      {children}
    </DataContext.Provider>
  );
}
