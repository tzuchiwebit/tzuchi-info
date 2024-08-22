import { useState, useEffect } from "react";
import { addLikes, addShares } from "@/api/api";
const { useLocalStorageState } = require('ahooks')


const useLikeAndShare = ({ id }) => {
  const LIKE_KEY = `like_${id}`;
  const SHARE_KEY = `share_${id}`;

  const [hasLike, setHasLike] = useLocalStorageState(LIKE_KEY, {
    defaultValue: false,
  });

  const [hasShare, setHasShare] = useLocalStorageState(SHARE_KEY, {
    defaultValue: false,
  });

  // console.log(`hasLike`)
  // console.log(hasLike)

  const [like, setLike] = useState(0);
  const [share, setShare] = useState(0);
  const [view, setView] = useState(0);
  const [isLikeUpdating, setIsLikeUpdating] = useState(false);
  const [isShareUpdating, setIsShareUpdating] = useState(false);

  // const handleGetRowData = async () => {
  //   const { sheet } = await spreadsheetApi.statistics();
  //   const res = await swaggerApi.getArticleById(id);
  //   const webLog = res?.result?.web_log_counts

  //   const articleRow = {
  //     "欄位": "",
  //     "文章ID": id,
  //     "分享數": webLog.share,
  //     "按讚數": webLog.like,
  //     "點閱數": webLog.browse,
  //   }

  //   setLike(articleRow["按讚數"]);
  //   setShare(articleRow["分享數"]);
  //   setView(articleRow["點閱數"]);

  //   return articleRow;
  // };

  const handleView = async () => {

    // await swaggerApi.addArticleVisitLog(id, 'browse');
    // console.log('logged browse')
    // const row = await handleGetRowData();
    // row["點閱數"] = parseInt(row["點閱數"]) + 1;
    // await row.save();
    // await handleGetRowData();
  };

  const handleLike = async (id) => {
    console.log('like.1111')
    if (hasLike) {
      return;
    }
    console.log('like.2222')
    addLikes(id);
    console.log('like.3333')
    setHasLike(true);
    console.log('like.4444')
    setLike(parseInt(like) + 1);
  };

  const handleShare = async (id) => {
    console.log('1111')
    if (hasShare) {
      return;
    }
    console.log('2222')
    addShares(id);
    console.log('3333')
    setHasShare(true);
    setShare(parseInt(share) + 1);
  };

  useEffect(() => {
    // handleGetRowData();
  }, []);

  return {
    like,
    setLike,
    share,
    setShare,
    view,
    isLikeUpdating,
    isShareUpdating,
    hasLike,
    hasShare,
    handleLike,
    handleShare,
    handleView,
  };
};

export default useLikeAndShare;
