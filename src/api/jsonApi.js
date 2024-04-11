import axios from "axios";

const api = {
  // footer
  getFooter: () => axios.get('https://www.tzuchi.org.tw/Sheets/community2.0/footer_world/world.json'),
}

export default api

