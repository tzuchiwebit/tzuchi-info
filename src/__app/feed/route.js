import { Feed } from 'feed';

const posts = [
  {
    title: '1224花蓮蔬食嘉年華 歡迎闔家蒞臨靜思堂體驗',
    id: 'https://tw.tzuchi.org/about-us/%E9%97%9C%E6%96%BC%E6%85%88%E6%BF%9F%E5%9F%BA%E9%87%91%E6%9C%83/%E6%9C%80%E6%96%B0%E5%85%AC%E5%91%8A/%E5%85%AC%E5%91%8A%E4%BA%8B%E9%A0%85/item/28511-1224%E8%8A%B1%E8%93%AE%E8%94%AC%E9%A3%9F%E5%98%89%E5%B9%B4%E8%8F%AF-%E6%AD%A1%E8%BF%8E%E9%97%94%E5%AE%B6%E8%92%9E%E8%87%A8%E9%9D%9C%E6%80%9D%E5%A0%82%E9%AB%94%E9%A9%97',
    link: 'https://tw.tzuchi.org/about-us/%E9%97%9C%E6%96%BC%E6%85%88%E6%BF%9F%E5%9F%BA%E9%87%91%E6%9C%83/%E6%9C%80%E6%96%B0%E5%85%AC%E5%91%8A/%E5%85%AC%E5%91%8A%E4%BA%8B%E9%A0%85/item/28511-1224%E8%8A%B1%E8%93%AE%E8%94%AC%E9%A3%9F%E5%98%89%E5%B9%B4%E8%8F%AF-%E6%AD%A1%E8%BF%8E%E9%97%94%E5%AE%B6%E8%92%9E%E8%87%A8%E9%9D%9C%E6%80%9D%E5%A0%82%E9%AB%94%E9%A9%97',
    url: 'https://tw.tzuchi.org/about-us/%E9%97%9C%E6%96%BC%E6%85%88%E6%BF%9F%E5%9F%BA%E9%87%91%E6%9C%83/%E6%9C%80%E6%96%B0%E5%85%AC%E5%91%8A/%E5%85%AC%E5%91%8A%E4%BA%8B%E9%A0%85/item/28511-1224%E8%8A%B1%E8%93%AE%E8%94%AC%E9%A3%9F%E5%98%89%E5%B9%B4%E8%8F%AF-%E6%AD%A1%E8%BF%8E%E9%97%94%E5%AE%B6%E8%92%9E%E8%87%A8%E9%9D%9C%E6%80%9D%E5%A0%82%E9%AB%94%E9%A9%97',
    description: `<div class="K2FeedIntroText"><img alt="" src="https://tw.tzuchi.org/images/stories2/world/taiwan/06/209.jpg" />慈濟12月24日10-16點在花蓮靜思堂舉辦一場心靈紓壓、健康蔬食、環境舒適的歲末祝福暨嘉年華活動，上午為每年一度的歲末祝福感恩祈福會，中午後的蔬食嘉年華除了有在地店家的蔬食攤商，還有按摩小站、露天電影院、熱舞區、野餐區、防災體驗、周邊血幹細胞建檔招募等，另外還有靜思茶道、靜思花道體驗，歡迎民眾闔家蒞臨。</div>`,
    author: [`(陳誼謙)`],
    category: '公告',
    date: new Date(),
  },
  {
    title: '阿富汗農業碩士淪難民　美國慈濟志工雪中送炭',
    id: 'https://tw.tzuchi.org/%E5%85%A8%E7%90%83%E5%BF%97%E6%A5%AD/%E7%BE%8E%E6%B4%B2/item/28510-%E9%98%BF%E5%AF%8C%E6%B1%97%E8%BE%B2%E6%A5%AD%E7%A2%A9%E5%A3%AB%E6%B7%AA%E9%9B%A3%E6%B0%91-%E7%BE%8E%E5%9C%8B%E6%85%88%E6%BF%9F%E5%BF%97%E5%B7%A5%E9%9B%AA%E4%B8%AD%E9%80%81%E7%82%AD',
    link: 'https://tw.tzuchi.org/%E5%85%A8%E7%90%83%E5%BF%97%E6%A5%AD/%E7%BE%8E%E6%B4%B2/item/28510-%E9%98%BF%E5%AF%8C%E6%B1%97%E8%BE%B2%E6%A5%AD%E7%A2%A9%E5%A3%AB%E6%B7%AA%E9%9B%A3%E6%B0%91-%E7%BE%8E%E5%9C%8B%E6%85%88%E6%BF%9F%E5%BF%97%E5%B7%A5%E9%9B%AA%E4%B8%AD%E9%80%81%E7%82%AD',
    url: 'https://tw.tzuchi.org/%E5%85%A8%E7%90%83%E5%BF%97%E6%A5%AD/%E7%BE%8E%E6%B4%B2/item/28510-%E9%98%BF%E5%AF%8C%E6%B1%97%E8%BE%B2%E6%A5%AD%E7%A2%A9%E5%A3%AB%E6%B7%AA%E9%9B%A3%E6%B0%91-%E7%BE%8E%E5%9C%8B%E6%85%88%E6%BF%9F%E5%BF%97%E5%B7%A5%E9%9B%AA%E4%B8%AD%E9%80%81%E7%82%AD',
    description: `<div class="K2FeedIntroText"><img alt="" src="https://tw.tzuchi.org/images/stories2/world/americas/01/763.jpg" title="慈濟志工持續關懷協助安德森夫妻（右二起）和兩位幼兒的生活。（攝影：劉倢筠）" />美國北加州佛瑞斯諾慈濟志工長期關懷入境美國的阿富汗難民，協助他們安身及找工作。自2021年8月，美國從阿富汗撤軍，近8萬阿富汗難民來到美國，他們雖遠離了動盪的家園，卻要面臨一無所有的處境。&nbsp;<br />
        阿富汗難民安德森（化名）告訴慈濟志工：「我常常半夜驚醒，不知道自己身在何處？我真的很焦慮，因為沒有錢，沒有工作，沒有住的地方，慈濟給我的援助，幫了我很大的忙。」<br />
        &nbsp;<br />
        <strong>搭機逃難 噩夢揮之不去 </strong><br />
        &nbsp;<br />
        安德森和妻子絲華在阿富汗都擁有農業碩士學位。他們在阿富汗國家陷入動盪時，倉皇搭機出逃。絲華回憶當時的情形表示：「在機場等待的那兩天兩夜的每一秒都很難熬，看到有些人幾乎都快搭上飛機了，卻因叛軍的連續轟炸而喪命。心中對未來的不確定，加上機場外面炮火隆隆，讓我們曾經一度想放棄出走。」夫妻倆人帶著當初才六個月大的女兒，逃難生活更是處處不易，所幸安德森和絲華咬緊牙關堅持下來，才輾轉來到美國。<br />
        &nbsp;<br />
        剛到美國時，住在亞利桑那州。由於夫妻倆在阿富汗都擁有農業碩士學位，安德森在圖森拿到害蟲防治技術員證照，並工作了六個月。但由於當時居住的社區條件差，於是轉往到加州中谷地區農業發展的重鎮佛瑞斯諾尋找機會。<br />
        <br />
        &nbsp;<img alt="" src="https://tw.tzuchi.org/images/stories2/world/americas/01/764.jpg" title="慈濟志工與安德森分享證嚴上人的法語。（攝影：張願鈴）" /><br />
        <br />
        <strong>美國居大不易 慈濟人雪中送炭 </strong><br />
        &nbsp;<br />
        2023年2月，安德森帶著僅有的兩千美元現金，開著一部二手車，載著懷有第二胎身孕的妻子和剛滿一歲的女兒，以及幾件簡單的行李，來到佛瑞斯諾。沒想到原本允諾一起租屋的朋友臨時退租，無力負擔全部租金的安德森一家人，頓時不知所措。還好慈濟志工正上門要來關懷那位退租的阿富汗朋友，才因此得知安德森一家人的處境，進而趕緊幫助他們找到臨時公寓，解決住處問題。<br />
        &nbsp;<br />
        安德森一家人搬進公寓時，志工幫忙送上床組、家具及小孩的衣服，申請水電費低收入家庭折扣，協助早日適應當地的生活。安德森則是積極尋找工作，為了生活，他當過推銷員，經過幾個月的努力，他在專長農業領域找到工作，在一家實驗室擔任實驗分析員。<br />
        &nbsp;<img alt="" src="https://tw.tzuchi.org/images/stories2/world/americas/01/765.jpg" title="安德森家的小寶寶安穩地坐在嬰兒小床裡和大家一起合影。（攝影：劉倢筠）" /><br />
        感恩節前，慈濟志工再度探訪安德森家，見到小寶寶已平安出生，大家都感到無限歡喜。安德森表示，目前雖然工作壓力很大，但為了家人會努力克服，他由衷感恩慈濟志工們為他們一家人雪中送炭。<br />
        &nbsp;<br />
        （文：張願鈴、劉倢筠，2023/12/15，美國報導）（文史處：楊雅穎編輯）</div>`,
    author: `(張願鈴、劉倢筠)`,
    category: '美洲',
    date: new Date(),
  },
]

export async function GET() {

  const feed = new Feed({
    title: `慈濟全球資訊網`,
    description: `慈濟,證嚴上人,慈濟人,慈善,醫療,教育,人文,尼泊爾,慈濟尼泊爾地震救災,慈濟基金會,救災,地震,慈濟醫療,慈濟賑災,義診,慈濟技術學院,慈濟大學,精舍,靜思堂,祈福`,
    id: `https://info.tzuchi-org.tw/`,
    link: `https://info.tzuchi-org.tw/`,
    // image: `${`https://info.tzuchi-org.tw/`}/image.png`,
    language: 'zh-tw',
    favicon: `https://info.tzuchi-org.tw/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} 慈濟全球資訊網 . All rights reserved.`,
    feedLinks: {
      atom: `https://info.tzuchi-org.tw/atom.xml`,
    },
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      author: post.author,
      date: post.date,
      // image: post.image
    });
  });

  const invalidCharInXMLSpecRegexp =
    // eslint-disable-next-line no-control-regex
    /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/atom+xml charset=utf-8'
    }
  })
}