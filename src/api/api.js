import axios from 'axios'
import _ from 'lodash'
const API_ENDPOINT = `https://webtest.tzuchi-org.tw/api`
const EBOOK_ENDPOINT = `https://webtest.tzuchi-org.tw/batch_images_upload/tzuchi_library/api/find.php`
const JINGSI_ENDPOINT = `${API_ENDPOINT}/book.php`

const addHits = async (id) => {
  try {

    let bodyFormData = new FormData();
    bodyFormData.append('id', id);
    const res = await axios.post(`${API_ENDPOINT}/hits.php`, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    console.log(`article id : ${id} hits udpated !`)
    return res?.data

  } catch (err) {
    throw err
  }
}

const addLikes = async (id) => {
  try {

    let bodyFormData = new FormData();
    bodyFormData.append('id', id);
    const res = await axios.post(`${API_ENDPOINT}/like.php`, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    console.log(`article id : ${id} likes udpated !`)
    return res?.data

  } catch (err) {
    throw err
  }
}

const addShares = async (id) => {
  try {

    let bodyFormData = new FormData();
    bodyFormData.append('id', id);
    const res = await axios.post(`${API_ENDPOINT}/share.php`, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    console.log(`article id : ${id} shares udpated !`)
    return res?.data

  } catch (err) {
    throw err
  }
}

const pushNotify = async ({articleId, reportUuid, name, honorific, title, phone, email, text}) => {
  try {
    const payload = {
      "message": `
回報者：${name}${honorific}
電話：${phone}
Email：${email}
勘誤文章名稱：${title}
勘誤意見：${text}
勘誤ID：${articleId}-${reportUuid}`,
    }
    const res = await axios.post(`${API_ENDPOINT}/notify.php`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return res?.data
  } catch (err) {
    throw err
  }
}

const getBookSuggest = async () => {
  try {

    const res = await axios.get(EBOOK_ENDPOINT + '?cat_id=5&limit=4')
    return res?.data

  } catch (err) {
    throw err
  }
}

const getWeeklyReport = async (limit = 10, offset = 0) => {
  try {

    const res = await axios.get(EBOOK_ENDPOINT + `?cat_id=4&limit=${limit}&offset=${offset}`)
    return res?.data

  } catch (err) {
    throw err
  }
}

const getBookJingsi = async () => {
  try {

    const res = await axios.get(JINGSI_ENDPOINT)
    return res?.data

  } catch (err) {
    throw err
  }
}

export {
  addHits,
  addShares,
  addLikes,
  getBookSuggest,
  getWeeklyReport,
  getBookJingsi,
  pushNotify,
}
