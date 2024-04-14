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

const getRecommandArticles = async (categoryId) => {
  // 推薦閱讀：抓取 相同分類、點擊最高的3篇文章
  try {
    const res = await axios.get(`${API_ENDPOINT}/articles`, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        params: {
          'page[limit]': 3,
          'filter[state]': 1,
          'filter[category]': categoryId,
          'list[fullordering]': 'a.hits DESC',
        },
    })
    return res?.data
  } catch (err) {
    throw err
  }
}
const getExtendArticles = async (tags = []) => {
  // 抓取 相同文章標籤、點擊最高的3篇文章
  try {
    const params = {
      'page[limit]': 3,
      'filter[state]': 1,
      'list[fullordering]': 'a.hits DESC',
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

const getArticlesByCategory = async (category = '志工早會', limit = 10, offset = 0, state = 1) => {
    try {
        const targetCategory = _.find(joomlaContentCategory, (i) => i.name === category);
        if (!targetCategory) {
            throw new Error(`Invalid category : ${category}`);
        }

        const res = await axios.get(`${API_ENDPOINT}/articles?filter[category]=${targetCategory.id}&page[limit]=${limit}&page[offset]=${offset}&filter[state]=${state}`, {
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

export {
    getArticlesByCategory,
    getArticleById,
    getRecommandArticles,
    getExtendArticles,
}
