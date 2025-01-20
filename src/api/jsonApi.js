import axios from "axios";

const api = {
  // footer
  getFooter: () => axios.get('https://www.tzuchi.org.tw/Sheets/community2.0/footer_world/world.json'),
  getCloudTags: () => axios.get('https://raw.githubusercontent.com/KaelLim/JSONFile/main/%E8%B3%87%E8%A8%8A%E7%B6%B2/tag_color.json'),
  getFooterSocial: () => axios.get('https://www.tzuchi.org.tw/Sheets/NEWtzuchi/social/social.json'),
  getJingsiBooks: () => axios.get(`${process.env.NEXT_PUBLIC_CMS_URL}/api/jcustom/v1/jingsi.json`),
}

export default api

