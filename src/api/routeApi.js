export const getArticleById = async (id) => {
  console.log('SITE_URL', process.env.SITE_URL)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  const res = await fetch(`${process.env.SITE_URL}/api/article?id=${id}`, {
    headers: {
      'Content-Type': 'application/json',
      // cache: 'no-store', // disable data cache
      // next: { revalidate: 2 }, // reset data cache
    },
  })
  return await res.json()
}
