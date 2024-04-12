// please select category name from ../joomlaContentCategory
'use client'
import axios from 'axios'
import _ from 'lodash'
import joomlaContentCategory from './joomlaContentCategory'

const API_ENDPOINT = `https://webtest.tzuchi-org.tw/api/index.php/v1/content`
const token = process.env.NEXT_PUBLIC_JOOMLA_API_TOKEN

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
    getArticlesByCategory
}