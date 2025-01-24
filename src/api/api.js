import axios from 'axios'
import _ from 'lodash'
const API_ENDPOINT = `${process.env.NEXT_PUBLIC_CMS_URL}/api`
const EBOOK_ENDPOINT_NEW = `${process.env.NEXT_PUBLIC_CMS_URL_DEPRECATED}/batch_images_upload/tzuchi_library/api/findnew.php`

const addHits = async (id) => {
  try {

    let bodyFormData = new FormData();
    bodyFormData.append('id', id);
    const res = await axios.post(`${API_ENDPOINT}/hits.php`, bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
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
    const res = await axios.get(EBOOK_ENDPOINT_NEW + '?cat_id=5&limit=4&ebook=Y')
    return res?.data?.results

  } catch (err) {
    throw err
  }
}

const getWeeklyReport = async ({limit, offset}) => {
  try {
    let params = '?cat_id=4'
    if (limit) params = params + `&limit=${limit}`
    if (offset) params = params + `&offset=${offset}`
    const res = await axios.get(EBOOK_ENDPOINT_NEW + params)
    return res?.data?.results

  } catch (err) {
    throw err
  }
}

const getWeeklyReportNew = async ({limit, offset}) => {
  try {
    let params = '?cat_id=4'
    if (limit) params = params + `&limit=${limit}`
    if (offset) params = params + `&offset=${offset}`
    const res = await axios.get(EBOOK_ENDPOINT_NEW + params)
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
  getWeeklyReportNew,
  pushNotify,
}
