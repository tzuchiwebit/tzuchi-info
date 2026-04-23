import axios from 'axios'
import _ from 'lodash'
const API_ENDPOINT = `${process.env.NEXT_PUBLIC_CMS_URL}/api`
const EBOOK_ENDPOINT_NEW = `${process.env.NEXT_PUBLIC_CMS_URL_DEPRECATED}/batch_images_upload/tzuchi_library/api/findnew.php`
const LIBRARY_PUBLIC_API = process.env.NEXT_PUBLIC_LIBRARY_API || 'https://librarypj.tzuchi-org.tw/api/v1'

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

const pushNotify = async ({articleId, reportUuid, name, honorific, title, phone, email, text}, ariticleUrl) => {
  try {
    const payload = {
      "message": `【勘誤回報系統】
👤 回報者：${name} ${honorific}
📞 電話：${phone}
✉️ Email：${email}
📗 勘誤文章名稱：${title}
📝 勘誤意見：${text}
🆔 勘誤ID：${articleId}-${reportUuid}
🔗 勘誤連結：${ariticleUrl}`,
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/notify`, payload, {
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
    const params = {
      category_id: 1, // 書籍
      limit: 4,
      offset: 0,
    }

    const res = await axios.get(`${LIBRARY_PUBLIC_API}/books`, {
      params,
    })

    const items = res?.data?.data || res?.data?.results || []
    const mapped = items.map((item) => ({
      ...item,
      // Normalize fields for existing UI components
      cover_image: item?.thumbnail_url,
      url: item?.reader_url,
    }))
    return mapped

  } catch (err) {
    throw err
  }
}

/**
 * @deprecated use getWeeklyReportNew instead
 */
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

const getWeeklyReportNew = async ({ limit, offset, q }) => {
  try {
    // New Library API (2026): https://librarypj.tzuchi-org.tw/api/v1/docs/#/電子書
    // 1) GET /books/categories -> weekly report category id (expected: 2)
    // 2) GET /books?category_id=<id> -> list weekly report books

    const libraryBase = process.env.NEXT_PUBLIC_LIBRARY_API || LIBRARY_PUBLIC_API
    let libraryOrigin = ''
    try {
      libraryOrigin = new URL(libraryBase).origin
    } catch (err) {}

    const resolveUrl = (input) => {
      if (!input) return input
      if (typeof input !== 'string') return input
      if (input.startsWith('http://') || input.startsWith('https://')) return input
      if (input.startsWith('//')) return `https:${input}`
      if (input.startsWith('/') && libraryOrigin) return `${libraryOrigin}${input}`
      return input
    }

    let weeklyReportCategoryId = 2
    try {
      const catRes = await axios.get(`${libraryBase}/books/categories`, {
        headers: { accept: '*/*' },
      })
      const categories = catRes?.data?.data || catRes?.data?.results || catRes?.data || []
      const list = Array.isArray(categories) ? categories : []
      const getId = (c) => {
        const raw = c?.id ?? c?.category_id ?? c?.attributes?.id ?? c?.attributes?.category_id
        const n = parseInt(raw, 10)
        return Number.isFinite(n) ? n : null
      }
      const getName = (c) => c?.name || c?.title || c?.attributes?.name || c?.attributes?.title || ''

      const matched =
        list.find((c) => getId(c) === 2) ||
        list.find((c) => getName(c).includes('慈濟週報'))

      const matchedId = matched ? getId(matched) : null
      if (matchedId) weeklyReportCategoryId = matchedId
    } catch (err) {
      // fallback to known id=2
    }

    const res = await axios.get(`${libraryBase}/books`, {
      headers: { accept: '*/*' },
      params: {
        category_id: weeklyReportCategoryId,
        ...(limit ? { limit } : {}),
        ...(offset ? { offset } : {}),
        ...(q ? { q } : {}),
      },
    })

    const payload = res?.data || {}
    const items = payload?.data || payload?.results || []

    const mapped = (Array.isArray(items) ? items : []).map((item) => ({
      ...item,
      // Normalize fields for existing UI components
      bookUrl: resolveUrl(item?.reader_url || item?.bookUrl || item?.url),
      base_pdf: resolveUrl(item?.pdf_path || item?.base_pdf),
      cover_image: resolveUrl(item?.thumbnail_url || item?.cover_image),
      book_date: item?.book_date || item?.publish_date || item?.published_at || item?.created_at,
    }))

    return {
      ...payload,
      data: mapped,
    }

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
