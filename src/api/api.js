import axios from 'axios'
import _ from 'lodash'

const API_ENDPOINT = `https://webtest.tzuchi-org.tw/api`

const addHits = async (id) => {
  try {

    const res = await axios.post(`${API_ENDPOINT}/hits.php`, {
      id: parseInt(id)
    })
    return res?.data

  } catch (err) {
    throw err
  }
}
export {
  addHits,
}
