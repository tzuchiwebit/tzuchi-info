// please select category name from ../joomlaContentCategory
'use client'
import axios from 'axios'
import _ from 'lodash'
import joomlaContentCategory from './joomlaContentCategory'

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_CMS_URL}/api/index.php/v1/content`
const token = process.env.NEXT_PUBLIC_JOOMLA_API_TOKEN

const getArticleById = async (id) => {
  try {
    const res = await axios.get(`${API_ENDPOINT}/articles/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    return res?.data
  } catch (err) {
    throw err
  }
}

const getRecommandArticles = async (categoryId, limit = 3) => {
  // 推薦閱讀：抓取 相同分類、點擊最高的3篇文章
  try {
    const res = await axios.get(`${API_ENDPOINT}/articles`, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params: {
        'page[limit]': limit,
        'filter[state]': 1,
        'filter[category]': categoryId,
        'list[ordering]': 'hits',
        'list[direction]': 'desc',
      },
    })
    return res?.data
  } catch (err) {
    throw err
  }
}
const getExtendArticles = async (tags = [], limit = 3) => {
  // 抓取 相同文章標籤(or)、點擊最高的3篇文章
  try {
    const params = {
      'page[limit]': limit,
      'filter[state]': 1,
      'list[ordering]': 'hits',
      'list[direction]': 'desc',
    }
    if (tags.length) params['filter[tag]'] = tags

    const res = await axios.get(`${API_ENDPOINT}/articles`, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params,
    })
    return res?.data
  } catch (err) {
    throw err
  }
}

const getArticlesByCategory = async ({ label_name = '志工早會', limit = 10, offset = 0, state = 1, tag = '' }) => {
  const _t = label_name.split('-')[0];
  try {
    const targetCategory = _.find(joomlaContentCategory, (i) => i.label_name.indexOf(_t) > -1);
    if (!targetCategory) {
      throw new Error(`Invalid category : ${category}`);
    }

    const res = await axios.get(`${API_ENDPOINT}/articles?filter[category]=${targetCategory.id}&page[limit]=${limit}&page[offset]=${offset}&filter[state]=${state}&filter[tag]=${tag}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    // console.log(`axios res`)
    // console.log(res)
    return res?.data

  } catch (err) {
    throw err
  }
}

const getArticlesByKeyword = async ({ keyword = '', limit = 12, offset = 0, state = 1, sorting = 'desc'}) => {
  
  try {

    const params = {
      'filter[search]': `content:${keyword}`,
      'filter[state]': state,
      'list[direction]': sorting,
      'page[limit]': limit,
      'page[offset]': offset,
    }
    
    const res = await axios.get(`${API_ENDPOINT}/articles`, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      params
    })
    // console.log(`axios res`)
    // console.log(res)
    return res?.data

  } catch (err) {
    throw err
  }
}

export {
  getArticlesByCategory,
  getArticleById,
  getRecommandArticles,
  getExtendArticles,
  getArticlesByKeyword,
}
