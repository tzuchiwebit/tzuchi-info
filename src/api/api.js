import axios from 'axios'
import _ from 'lodash'

const API_ENDPOINT = `https://webtest.tzuchi-org.tw/api`

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

const getBookSuggest = async () => {
  try {

    const res = await axios.get(`${API_ENDPOINT}/book.php`)
    // console.log(`res`)
    // console.log(res)
    return res?.data

  } catch (err) {
    throw err
  }
}

export {
  addHits,
  addShares,
  addLikes,
  getBookSuggest
}
