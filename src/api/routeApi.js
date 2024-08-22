export const getArticleById = async (id) => {
  const res = await fetch(`${process.env.SITE_URL}/api/article?id=${id}`, {
    headers: {
      'Content-Type': 'application/json',
      // cache: 'no-store', // disable data cache
      // next: { revalidate: 2 }, // reset data cache
    },
  })
  return await res.json()
}


// const getArticleById = async (id) => {
//   try {
//     const res = await axios.get(`${API_ENDPOINT}/content/articles/${id}`, {
//       headers: {
//         'Authorization': 'Bearer ' + token
//       }
//     })
//     return res?.data
//   } catch (err) {
//     throw err
//   }
// }
